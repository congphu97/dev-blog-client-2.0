import { Component, ElementRef, inject, Input, OnInit, signal, effect } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonContent } from '@ionic/angular/standalone';
import { 
  NgcCardModule, 
  NgcAvatarModule, 
  NgcTagModule, 
  NgcBadgeModule, 
  NgcButtonModule, 
  NgcDividerModule 
} from 'ngc-library';
import { BlogPost } from '../blog.models';
import { BlogService } from '../blog.service';
import { ModalController } from '@ionic/angular/standalone';
import { MarkdownPipe } from '../markdown.pipe';
import mermaid from 'mermaid';

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
    NgcCardModule,
    NgcAvatarModule,
    NgcTagModule,
    NgcBadgeModule,
    NgcButtonModule,
    NgcDividerModule,
    MarkdownPipe
  ],
})
export class BlogDetailComponent implements OnInit {
  private el = inject(ElementRef);
  private modalCtrl = inject(ModalController, { optional: true });
  private blogService = inject(BlogService);
  private route = inject(ActivatedRoute, { optional: true });
  private router = inject(Router, { optional: true });

  public blogPost = signal<BlogPost | null>(null);
  public isFavorite = signal<boolean>(false);
  public isFullScreen = signal<boolean>(false);

  constructor() {
    effect(() => {
      const post = this.blogPost();
      if (post && post.content) {
        setTimeout(() => {
          this.renderMermaidDiagrams();
        }, 150);
      }
    });
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
      this.blogPost.set(value);
      this.isFavorite.set(!!value.favorite);
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
            this.blogPost.set(item);
            this.isFavorite.set(!!item.favorite);
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

