import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  status?: 'sending' | 'success' | 'error';
}

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  role: 'user' | 'model';
  parts: GeminiPart[];
}

interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
      role?: string;
    };
    finishReason?: string;
  }>;
  error?: {
    code: number;
    message: string;
    status: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private http = inject(HttpClient);

  // Model Gemini 2.5 Flash mới nhất của Google
  private readonly modelName = 'gemini-2.5-flash';
  private readonly baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';

  private get apiKey(): string {
    return (
      localStorage.getItem('gemini_api_key') ||
      (environment as any).geminiApiKey ||
      (typeof process !== 'undefined' && ((process as any)?.env?.['GEMINI_API_KEY'] || (process as any)?.env?.['NG_APP_GEMINI_API_KEY'])) ||
      ''
    );
  }

  public hasApiKey(): boolean {
    return !!this.apiKey.trim();
  }

  public setApiKey(key: string): void {
    if (key && key.trim()) {
      localStorage.setItem('gemini_api_key', key.trim());
    }
  }

  /**
   * Gửi tin nhắn trò chuyện với ngữ cảnh lịch sử chat (Multi-turn Conversation)
   */
  sendChatMessage(
    message: string,
    history: Array<{ role: 'user' | 'model'; text: string }> = []
  ): Observable<string> {
    const key = this.apiKey;
    if (!key) {
      return throwError(
        () => new Error('Chưa cấu hình GEMINI_API_KEY trong environment / process.env hoặc localStorage!')
      );
    }
    const url = `${this.baseUrl}/${this.modelName}:generateContent?key=${key}`;

    // Chuẩn bị payload theo đúng format của Gemini API
    const contents: GeminiContent[] = history.map(item => ({
      role: item.role,
      parts: [{ text: item.text }]
    }));

    // Thêm câu hỏi mới của người dùng
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const body = {
      systemInstruction: {
        parts: [
          {
            text: `Bạn là Dev Blog AI Assistant - trợ lý công nghệ thông minh, thân thiện của ứng dụng Dev Blog 2.0.
Nhiệm vụ của bạn:
1. Hỗ trợ lập trình viên về Angular 22, Ionic, TypeScript, React Native, Mobile, Web Development, Firebase, Docker, CI/CD, Kiến trúc phần mềm và Clean Code.
2. Trả lời súc tích, chính xác bằng tiếng Việt.
3. Khi đưa ra code, hãy sử dụng định dạng Markdown có chỉ định tên ngôn ngữ rõ ràng (ví dụ: \`\`\`typescript, \`\`\`html, \`\`\`bash).
4. Thân thiện, tôn trọng và sẵn sàng giải thích cặn kẽ.`
          }
        ]
      },
      contents,
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048
      }
    };

    return this.http.post<GeminiApiResponse>(url, body).pipe(
      map(res => {
        if (res.error) {
          throw new Error(res.error.message || 'Lỗi kết nối tới Gemini API');
        }
        const text = res.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
          throw new Error('Gemini không phản hồi nội dung văn bản.');
        }
        return text;
      }),
      catchError(err => {
        console.error('Gemini API Error:', err);
        const errMsg = err?.error?.error?.message || err?.message || 'Có lỗi xảy ra khi kết nối tới AI!';
        return throwError(() => new Error(errMsg));
      })
    );
  }

  /**
   * Tóm tắt bài viết thành các gạch đầu dòng
   */
  summarizeArticle(title: string, content: string): Observable<string> {
    const prompt = `Hãy tóm tắt bài viết sau thành 3 đến 5 ý chính nổi bật dạng bullet points:\n\nTiêu đề: ${title}\nNội dung: ${content}`;
    return this.sendChatMessage(prompt);
  }
}

