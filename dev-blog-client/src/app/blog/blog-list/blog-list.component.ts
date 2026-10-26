import { Component, inject, input, output, resource, ResourceStatus, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';
import { BlogService } from '../blog.service';

import { NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule, NgcSkeletonModule } from 'ngc-library';
import { ModalController } from '@ionic/angular/standalone';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [
    CommonModule, 
    NgcAvatarModule, 
    NgcTagModule, 
    NgcBadgeModule, 
    NgcButtonModule, 
    NgcCardModule,
    NgcSkeletonModule
  ]
})
export class BlogListComponent {
  // Input posts tùy chọn để tương thích ngược với container
  posts = input<BlogPost[]>();

  skeletonItems = Array.from({ length: 3 });

  // Signal Output phát sự kiện
  toggleFavorite = output<number>();
  chooseToEdit = output<BlogPost>();

  // Filter limit để minh họa params reactivity
  limit = signal<number>(5);

  private blogService = inject(BlogService);
  private modalOpen = inject(ModalController);

  async navigationToDetail(post: BlogPost) {
    const modal = await this.modalOpen.create({
      component: BlogDetailComponent,
      cssClass: 'blog-detail-modal',
      componentProps: {
        post: post
      }
    });

    await modal.present();
  }

  // 1. Khởi tạo Resource cho Blog List
  blogResource = resource({
    params: () => ({ limit: this.limit() }),
    loader: async ({ params, abortSignal }) => {
      return this.blogService.getBlogs(params.limit, abortSignal);
    }
  });

  changeLimit(newLimit: number) {
    this.limit.set(newLimit);
  }

  // 8. value.update(): Optimistic UI (Toggle Favorite ngay lập tức)
  onToggleFavorite(id: number) {
    this.blogResource.value.update(currentList => {
      if (!currentList) return currentList;
      return currentList.map(item =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      );
    });
    this.toggleFavorite.emit(id);
  }

  onChooseToEdit(post: BlogPost) {
    this.chooseToEdit.emit(post);
  }

  // 9. value.set(): Gán dữ liệu thủ công
  setManualData() {
    this.blogResource.value.set([
      {
        id: 999,
        title: 'Bài viết ảo được gán thủ công (value.set)',
        content: 'Nội dung bài viết ảo được gán thủ công vào Signal Resource.',
        summary: 'Resource status chuyển sang ResourceStatus.Local',
        imageUrl: 'https://picsum.photos/id/1020/400/250',
        publishedAt: new Date().toISOString(),
        viewCount: 1,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        author: 'Admin',
        category: 'Demo',
        tags: ['Demo', 'Signal'],
        favorite: true
      }
    ]);
  }

  // 3. status(): Đọc trạng thái ResourceStatus ('idle' | 'loading' | 'reloading' | 'resolved' | 'error' | 'local')
  getStatusLabel(): string {
    switch (this.blogResource.status()) {
      case 'idle': return 'Idle (Chờ kích hoạt)';
      case 'loading': return 'Loading (Đang tải lần đầu)';
      case 'reloading': return 'Reloading (Đang làm mới)';
      case 'resolved': return 'Resolved (Tải thành công)';
      case 'error': return 'Error (Gặp lỗi)';
      case 'local': return 'Local (Vừa bị ghi đè bởi set/update)';
      default: return 'Không xác định';
    }
  }
}

