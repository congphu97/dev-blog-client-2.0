import { Component, ElementRef, inject, Input, OnInit, OnDestroy, signal, effect, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonContent } from '@ionic/angular/standalone';
import { 
  NgcAvatarModule
} from 'ngc-library';
import { BlogPost } from '../blog.models';
import { BlogService } from '../blog.service';
import { ModalController } from '@ionic/angular/standalone';
import { MarkdownPipe } from '../markdown.pipe';
import mermaid from 'mermaid';

export interface MarkdownChunk {
  index: number;
  title: string;
  content: string;
}

/**
 * Kiểm tra xem vị trí cắt có nằm trong khối code (```) hay không
 */
function isInsideCodeBlock(text: string, index: number): boolean {
  const preceding = text.slice(0, index);
  const matches = preceding.match(/```/g) || [];
  return (matches.length % 2) !== 0; // Số lẻ fence nghĩa là đang nằm bên trong code block
}

function extractChunkTitle(chunkText: string, index: number): string {
  const lines = chunkText.trim().split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('#')) {
      return trimmed.replace(/^#+\s*/, '').replace(/[*_`]/g, '').trim();
    }
  }
  return `Phần ${index + 1}`;
}

/**
 * Chia nhỏ nội dung Markdown siêu dài thành các đoạn an toàn (~13.000 ký tự)
 * Bẻ gãy chính xác tại tiêu đề (#, ##, ###) và không bao giờ cắt vụn code block
 */
export function chunkMarkdownSafe(text: string, chunkSize = 13000): MarkdownChunk[] {
  if (!text || text.length <= chunkSize * 1.3) {
    return [{ index: 1, title: 'Toàn bộ bài viết', content: text || '' }];
  }
  const chunks: MarkdownChunk[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    if (cursor + chunkSize >= text.length) {
      const remainingText = text.slice(cursor);
      chunks.push({
        index: chunks.length + 1,
        title: extractChunkTitle(remainingText, chunks.length),
        content: remainingText
      });
      break;
    }

    let splitPoint = -1;
    const searchRange = text.slice(cursor + chunkSize);

    // Ưu tiên ngắt tại tiêu đề (#, ##, ###)
    const headingRegex = /\n(?=#{1,3}\s+)/g;
    let m: RegExpExecArray | null;
    while ((m = headingRegex.exec(searchRange)) !== null) {
      const candidate = cursor + chunkSize + m.index + 1;
      if (!isInsideCodeBlock(text, candidate)) {
        splitPoint = candidate;
        break;
      }
    }

    // Nếu không có tiêu đề, tìm ngắt đoạn dòng đôi (\n\n)
    if (splitPoint === -1) {
      const nnRegex = /\n\n/g;
      while ((m = nnRegex.exec(searchRange)) !== null) {
        const candidate = cursor + chunkSize + m.index + 2;
        if (!isInsideCodeBlock(text, candidate)) {
          splitPoint = candidate;
          break;
        }
      }
    }

    if (splitPoint === -1) {
      const remainingText = text.slice(cursor);
      chunks.push({
        index: chunks.length + 1,
        title: extractChunkTitle(remainingText, chunks.length),
        content: remainingText
      });
      break;
    }

    const chunkText = text.slice(cursor, splitPoint);
    chunks.push({
      index: chunks.length + 1,
      title: extractChunkTitle(chunkText, chunks.length),
      content: chunkText
    });
    cursor = splitPoint;
  }

  return chunks;
}

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  imports: [
    CommonModule,
    DatePipe,
    IonHeader,
    IonContent,
    NgcAvatarModule,
    MarkdownPipe
  ],
})
export class BlogDetailComponent implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private modalCtrl = inject(ModalController, { optional: true });
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute, { optional: true });
  private router = inject(Router, { optional: true });

  public blogPost = signal<BlogPost | null>(null);
  public isFavorite = signal<boolean>(false);
  public isFullScreen = signal<boolean>(false);
  public isReady = signal<boolean>(false);

  // Progressive Lazy Loading từng phần trên nhu cầu
  public allChunks = signal<MarkdownChunk[]>([]);
  public visibleChunksCount = signal<number>(1);
  public isLoadingNextChunk = signal<boolean>(false);
  public isProgressive = computed(() => this.allChunks().length > 1);
  public visibleChunks = computed(() => {
    const chunks = this.allChunks();
    const count = this.visibleChunksCount();
    return chunks.slice(0, count);
  });

  private lastScrollLoad = 0;

  constructor() {
    effect(() => {
      const post = this.blogPost();
      if (post && post.content && post.content.includes('```mermaid')) {
        setTimeout(() => {
          this.renderMermaidDiagrams();
        }, 150);
      }
    });
  }

  private initPostContent(post: BlogPost) {
    this.blogPost.set(post);
    this.isFavorite.set(!!post.favorite);
    const chunks = chunkMarkdownSafe(post.content || '');
    this.allChunks.set(chunks);
    this.visibleChunksCount.set(1);
  }

  loadNextChunk() {
    if (this.visibleChunksCount() >= this.allChunks().length) return;
    if (this.isLoadingNextChunk()) return;

    this.isLoadingNextChunk.set(true);
    this.lastScrollLoad = Date.now();

    setTimeout(() => {
      this.visibleChunksCount.update(c => Math.min(c + 1, this.allChunks().length));
      this.isLoadingNextChunk.set(false);
      setTimeout(() => {
        this.renderMermaidDiagrams();
      }, 50);
    }, 120);
  }

  loadAllChunks() {
    this.visibleChunksCount.set(this.allChunks().length);
    setTimeout(() => {
      this.renderMermaidDiagrams();
    }, 50);
  }

  jumpToChunk(targetIndex: number) {
    if (targetIndex > this.visibleChunksCount()) {
      this.visibleChunksCount.set(targetIndex);
    }
    setTimeout(() => {
      const el = this.el.nativeElement.querySelector('#chunk-part-' + targetIndex);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  onContentScroll(ev: any) {
    if (!this.isProgressive()) return;
    if (this.visibleChunksCount() >= this.allChunks().length) return;
    if (this.isLoadingNextChunk()) return;

    const now = Date.now();
    if (now - this.lastScrollLoad < 1000) return; // Khóa tối thiểu 1s giữa 2 lần nạp tự động

    const scrollTop = ev?.detail?.scrollTop || 0;
    if (scrollTop < 300) return; // Người dùng phải chủ động cuộn xuống ít nhất 300px

    const sentinel = this.el.nativeElement.querySelector('.load-more-sentinel');
    if (!sentinel) return;

    const rect = sentinel.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Chỉ nạp khi sentinel nằm trong khoảng nhìn thấy ở đáy
    if (rect.top > 0 && rect.top < windowHeight + 150) {
      this.loadNextChunk();
    }
  }

  ngOnDestroy() {
    // cleanup
  }

  private setupMermaidZoomControls() {
    if (typeof window !== 'undefined') {
      (window as any).zoomMermaid = (btn: HTMLElement, delta: number) => {
        const wrapper = btn.closest('.mermaid-block-wrapper');
        if (!wrapper) return;
        const svg = wrapper.querySelector('.mermaid-render-area svg') as SVGElement | null;
        if (!svg) return;
        const currentScale = parseFloat(svg.getAttribute('data-scale') || '1');
        const newScale = Math.min(Math.max(currentScale + delta, 0.4), 2.5);
        svg.setAttribute('data-scale', newScale.toString());
        svg.style.transform = `scale(${newScale})`;
        svg.style.transformOrigin = 'center top';
        const span = wrapper.querySelector('.mermaid-zoom-btn:nth-child(2) span');
        if (span) span.textContent = `${Math.round(newScale * 100)}%`;
      };

      (window as any).resetMermaid = (btn: HTMLElement) => {
        const wrapper = btn.closest('.mermaid-block-wrapper');
        if (!wrapper) return;
        const svg = wrapper.querySelector('.mermaid-render-area svg') as SVGElement | null;
        if (!svg) return;
        svg.setAttribute('data-scale', '1');
        svg.style.transform = 'scale(1)';
        const span = wrapper.querySelector('.mermaid-zoom-btn:nth-child(2) span');
        if (span) span.textContent = '100%';
      };
    }
  }

  private async renderMermaidDiagrams() {
    try {
      this.setupMermaidZoomControls();
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: {
          useMaxWidth: false,
          htmlLabels: true
        },
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      });
      const nodes = this.el.nativeElement.querySelectorAll('.mermaid:not([data-processed="true"])');
      if (nodes && nodes.length > 0) {
        await mermaid.run({
          nodes: Array.from(nodes)
        });
      }
    } catch (err) {
      console.warn('Mermaid render error:', err);
    }
  }

  // Nhận post từ Ionic Modal componentProps hoặc Angular property binding
  @Input()
  set post(value: BlogPost | null | undefined) {
    if (value) {
      this.initPostContent(value);
    }
  }
  get post(): BlogPost | null {
    return this.blogPost();
  }

  toggleFullScreen() {
    this.isFullScreen.update(v => !v);
    const modalEl = this.el.nativeElement.closest('ion-modal');
    if (modalEl) {
      if (this.isFullScreen()) {
        modalEl.classList.add('modal-fullscreen');
      } else {
        modalEl.classList.remove('modal-fullscreen');
      }
    }
  }

  async ngOnInit() {
    // Đợi 120ms cho animation mở modal hoàn tất êm ái trước khi render nội dung
    setTimeout(() => {
      this.isReady.set(true);
    }, 120);

    // Nếu chưa có post (ví dụ người dùng mở trực tiếp qua URL /blog/:id)
    if (!this.blogPost() && this.route) {
      const idParam = this.route.snapshot.paramMap.get('id');
      if (idParam) {
        try {
          const item = await this.blogService.getBlogById(+idParam);
          if (item) {
            this.initPostContent(item);
          }
        } catch (err) {
          console.error('Không thể tải bài viết:', err);
        }
      }
    }
  }

  toggleFavorite() {
    this.isFavorite.update(v => !v);
  }

  async dismiss() {
    if (this.modalCtrl) {
      try {
        const topModal = await this.modalCtrl.getTop();
        if (topModal) {
          await this.modalCtrl.dismiss(null, 'cancel');
          return;
        }
      } catch {
        // Không nằm trong modal
      }
    }
    if (this.router) {
      this.router.navigate(['/blog']);
    }
  }
}

