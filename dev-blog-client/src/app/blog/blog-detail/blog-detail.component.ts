import { Component, ElementRef, inject, Input, OnInit, signal } from '@angular/core';
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

