import { Component, ElementRef, ViewChild, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authFeature } from '../../../store/auth';
import { GeminiService, ChatMessage } from '../../services/gemini.service';
import { MarkdownPipe } from '../../../blog/markdown.pipe';

@Component({
  selector: 'app-gemini-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, MarkdownPipe],
  templateUrl: './gemini-chat.component.html',
  styleUrls: ['./gemini-chat.component.scss'],
})
export class GeminiChatComponent {
  public geminiService = inject(GeminiService);
  private store = inject(Store);
  private router = inject(Router);

  // Lắng nghe trạng thái đăng nhập từ NgRx Store
  public isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);

  @ViewChild('chatMessagesContainer') private messagesContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('chatInput') private chatInputRef?: ElementRef<HTMLTextAreaElement>;

  public isOpen = signal<boolean>(false);
  public isExpanded = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public inputMessage = signal<string>('');

  // Quản lý API Key cấu hình trực tiếp từ giao diện
  public showKeyConfig = signal<boolean>(false);
  public tempApiKey = signal<string>('');

  public toggleKeyConfig() {
    this.showKeyConfig.update(v => !v);
  }

  public saveCustomKey() {
    const val = this.tempApiKey().trim();
    if (val) {
      this.geminiService.setApiKey(val);
      this.showKeyConfig.set(false);
      this.tempApiKey.set('');
      this.messages.update(prev => [
        ...prev,
        {
          id: `sys_${Date.now()}`,
          role: 'model',
          text: '✅ Đã lưu cấu hình GEMINI_API_KEY thành công! Bạn có thể bắt đầu trò chuyện ngay bây giờ.',
          timestamp: new Date(),
          status: 'success'
        }
      ]);
    }
  }

  // Danh sách tin nhắn chat
  public messages = signal<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: 'Xin chào! 👋 Tôi là **Gemini AI Assistant** của Dev Blog 2.0. Tôi có thể hỗ trợ bạn tìm hiểu về Angular 22, Ionic, TypeScript, kiến trúc app hoặc giải thích bất kỳ đoạn mã nào.',
      timestamp: new Date(),
      status: 'success'
    }
  ]);

  // Các gợi ý câu hỏi nhanh (Prompt Suggestions)
  public suggestions = [
    '💡 Signal vs LinkedSignal trong Angular 22?',
    '🚀 Tối ưu hiệu năng Web & Mobile App',
    '📱 Điểm khác biệt giữa Capacitor và React Native?',
    '🛡️ Hướng dẫn bảo mật OAuth2 với PKCE'
  ];

  constructor() {
    // Đóng chat window ngay khi user đăng xuất
    effect(() => {
      if (!this.isAuthenticated()) {
        this.isOpen.set(false);
      }
    });

    // Tự động cuộn xuống cuối khi có tin nhắn mới hoặc trạng thái loading thay đổi
    effect(() => {
      this.messages();
      this.isLoading();
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  public toggleChat() {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    this.isOpen.update(v => !v);
    if (this.isOpen()) {
      setTimeout(() => this.scrollToBottom(), 150);
    }
  }

  public closeChat() {
    this.isOpen.set(false);
  }

  public toggleExpand() {
    this.isExpanded.update(v => !v);
  }

  public clearChat() {
    this.messages.set([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'Cuộc trò chuyện đã được làm mới. Hãy nhập câu hỏi bạn quan tâm nhé! ✨',
        timestamp: new Date(),
        status: 'success'
      }
    ]);
  }

  public selectSuggestion(prompt: string) {
    this.sendPrompt(prompt);
  }

  public onKeyDown(event: KeyboardEvent, inputEl?: HTMLTextAreaElement) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      this.sendPrompt();
      if (inputEl) {
        inputEl.value = '';
      }
    }
  }

  public sendPrompt(customText?: string) {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    const rawVal = this.chatInputRef?.nativeElement?.value;
    const text = (customText ?? (rawVal !== undefined && rawVal !== '' ? rawVal : this.inputMessage())).trim();
    if (!text || this.isLoading()) {
      return;
    }

    // Clear input ngay lập tức trên cả Signal lẫn DOM textarea
    this.inputMessage.set('');
    if (this.chatInputRef?.nativeElement) {
      this.chatInputRef.nativeElement.value = '';
      // Tự động focus lại để tiện gõ tiếp
      this.chatInputRef.nativeElement.focus();
    }

    const userMessageId = `usr_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text,
      timestamp: new Date(),
      status: 'success'
    };

    // Lấy lịch sử chat trước đó (loại bỏ tin nhắn welcome đầu tiên nếu muốn hoặc giữ nguyên)
    const historyPayload = this.messages()
      .filter(m => m.id !== 'welcome-msg')
      .map(m => ({ role: m.role, text: m.text }));

    // Cập nhật tin nhắn của người dùng vào state
    this.messages.update(prev => [...prev, userMsg]);
    this.isLoading.set(true);

    // Gửi sang Gemini Service
    this.geminiService.sendChatMessage(text, historyPayload).subscribe({
      next: (reply) => {
        const botMsg: ChatMessage = {
          id: `bot_${Date.now()}`,
          role: 'model',
          text: reply,
          timestamp: new Date(),
          status: 'success'
        };
        this.messages.update(prev => [...prev, botMsg]);
        this.isLoading.set(false);
      },
      error: (err) => {
        const errorMsg: ChatMessage = {
          id: `err_${Date.now()}`,
          role: 'model',
          text: `⚠️ **Lỗi**: ${err.message || 'Không thể kết nối đến Gemini AI. Vui lòng thử lại sau.'}`,
          timestamp: new Date(),
          status: 'error'
        };
        this.messages.update(prev => [...prev, errorMsg]);
        this.isLoading.set(false);
      }
    });
  }

  private scrollToBottom() {
    if (this.messagesContainer?.nativeElement) {
      const el = this.messagesContainer.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }
}

