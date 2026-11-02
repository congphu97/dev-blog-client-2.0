import { Component, ElementRef, inject, Input, OnInit, OnDestroy, signal, effect, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from '@ionic/angular/standalone';
import { 
  NgcAvatarModule
} from 'ngc-library';
import { BlogPost } from '../blog.models';
import { BlogService } from '../blog.service';
import { ModalController } from '@ionic/angular/standalone';
import { MarkdownPipe } from '../markdown.pipe';
import mermaid from 'mermaid';

/**
 * Kiểm tra xem vị trí cắt có nằm trong khối code (```) hay không
 */
function isInsideCodeBlock(text: string, index: number): boolean {
  const preceding = text.slice(0, index);
  const matches = preceding.match(/```/g) || [];
  return (matches.length % 2) !== 0; // Số lẻ fence nghĩa là đang nằm bên trong code block
}

/**
 * Chia nhỏ nội dung Markdown siêu dài thành các đoạn an toàn (~14.000 ký tự)
 * Bẻ gãy chính xác tại tiêu đề (#, ##, ###) và không bao giờ cắt vụn code block
 */
export function chunkMarkdownSafe(text: string, chunkSize = 14000): string[] {
  if (!text || text.length <= chunkSize * 1.3) return [text || ''];
  const chunks: string[] = [];
  let cursor = 0;

  while (cursor < text.length) {
    if (cursor + chunkSize >= text.length) {
      chunks.push(text.slice(cursor));
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
      chunks.push(text.slice(cursor));
      break;
    }

    chunks.push(text.slice(cursor, splitPoint));
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
    IonToolbar,
    IonTitle,
    IonButtons,
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

  // Progressive Chunking để chống WebKit crash OOM trên Mobile Safari
  public allChunks = signal<string[]>([]);
  public visibleChunksCount = signal<number>(1);
  public isProgressive = computed(() => this.allChunks().length > 1);
  public visibleChunks = computed(() => {
    const chunks = this.allChunks();
    const count = this.visibleChunksCount();
    return chunks.slice(0, count);
  });

  private observer: IntersectionObserver | null = null;

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
    this.setupIntersectionObserver();
  }

  loadNextChunk() {
    if (this.visibleChunksCount() < this.allChunks().length) {
      this.visibleChunksCount.update(c => Math.min(c + 1, this.allChunks().length));
      setTimeout(() => {
        this.renderMermaidDiagrams();
        this.observeSentinel();
      }, 50);
    }
  }

  loadAllChunks() {
    this.visibleChunksCount.set(this.allChunks().length);
    setTimeout(() => {
      this.renderMermaidDiagrams();
    }, 50);
  }

  private setupIntersectionObserver() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    if (this.observer) {
      this.observer.disconnect();
    }
    this.observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry && entry.isIntersecting) {
        this.loadNextChunk();
      }
    }, {
      rootMargin: '300px 0px' // Tự động load trước khi cuộn tới cách đáy 300px
    });

    setTimeout(() => this.observeSentinel(), 200);
  }

  private observeSentinel() {
    if (!this.observer) return;
    const sentinel = this.el.nativeElement.querySelector('.load-more-sentinel');
    if (sentinel) {
      this.observer.disconnect();
      this.observer.observe(sentinel);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
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

