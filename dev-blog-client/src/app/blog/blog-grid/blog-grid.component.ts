import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';
import { ModalController } from '@ionic/angular/standalone';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';
import { NgcAvatarModule } from 'ngc-library';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  imports: [CommonModule, NgcAvatarModule],
})
export class BlogGridComponent {
  posts = input.required<BlogPost[]>();
  isLoading = input<boolean>(false);

  skeletonCards = Array.from({ length: 6 });

  toggleFavorite = output<number>();
  chooseToEdit = output<BlogPost>();
  modalOpen = inject(ModalController);

  // Quản lý upvote/downvote tương tác tại chỗ
  userVotes = signal<Record<number, number>>({});
  // Trạng thái copy link feedback
  copiedPostId = signal<number | null>(null);

  onToggleFavorite(id: number, event?: Event) {
    event?.stopPropagation();
    this.toggleFavorite.emit(id);
  }

  onChooseToEdit(post: BlogPost, event?: Event) {
    event?.stopPropagation();
    this.chooseToEdit.emit(post);
  }

  onUpvote(event: Event, post: BlogPost) {
    event.stopPropagation();
    const current = this.userVotes()[post.id] || 0;
    const next = current === 1 ? 0 : 1;
    this.userVotes.update((v) => ({ ...v, [post.id]: next }));
  }

  onDownvote(event: Event, post: BlogPost) {
    event.stopPropagation();
    const current = this.userVotes()[post.id] || 0;
    const next = current === -1 ? 0 : -1;
    this.userVotes.update((v) => ({ ...v, [post.id]: next }));
  }

  getVote(id: number): number {
    return this.userVotes()[id] || 0;
  }

  getUpvoteCount(post: BlogPost): number {
    const base = post.upvotes ?? 222;
    const user = this.getVote(post.id);
    return base + (user === 1 ? 1 : user === -1 ? -1 : 0);
  }

  onCopyLink(event: Event, post: BlogPost) {
    event.stopPropagation();
    const url = window.location.origin + window.location.pathname + '#blog-' + post.id;
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url).catch(() => {});
    }
    this.copiedPostId.set(post.id);
    setTimeout(() => {
      if (this.copiedPostId() === post.id) {
        this.copiedPostId.set(null);
      }
    }, 2000);
  }

  formatViews(count?: number): string {
    if (!count) return '519.6K';
    if (count >= 1_000_000) {
      return (count / 1_000_000).toFixed(1) + 'M';
    }
    if (count >= 1_000) {
      return (count / 1_000).toFixed(1) + 'K';
    }
    return count.toString();
  }

  getFormattedDate(post: BlogPost): string {
    if (!post.publishedAt) return 'Oct 12';
    try {
      const d = new Date(post.publishedAt);
      if (isNaN(d.getTime())) return 'Oct 12';
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch {
      return 'Oct 12';
    }
  }

  getReadingOrWatchTime(post: BlogPost): string {
    if (post.readTime) return post.readTime;
    if (post.isVideo) return '22m watch time';
    // Tính thời gian đọc bài viết bình thường
    const words = post.content ? post.content.split(/\s+/).length : 300;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes}m read time`;
  }

  getAuthorAvatar(post: BlogPost): string {
    if (post.authorAvatar) return post.authorAvatar;
    const seed = encodeURIComponent(post.author || 'dev-' + post.id);
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
  }

  getVisibleTags(post: BlogPost): string[] {
    if (!post.tags || post.tags.length === 0) {
      return ['#open-source'];
    }
    const first = post.tags[0];
    if (first.length > 10 || post.tags.length === 1) {
      return [first];
    }
    const second = post.tags[1];
    if (first.length + second.length > 18) {
      return [first];
    }
    return post.tags.slice(0, 2);
  }

  getRemainingTagsCount(post: BlogPost): number {
    const total = post.tags?.length || 0;
    const visible = this.getVisibleTags(post).length;
    return Math.max(0, total - visible);
  }

  async navigationToDetail(post: BlogPost) {
    const modal = await this.modalOpen.create({
      component: BlogDetailComponent,
      cssClass: 'blog-detail-modal',
      componentProps: {
        post: post,
      },
    });

    await modal.present();
  }
}
