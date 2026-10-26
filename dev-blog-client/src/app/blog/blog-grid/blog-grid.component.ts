import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';

import { NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule, NgcSkeletonModule } from 'ngc-library';
import { ModalController } from '@ionic/angular/standalone';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
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
export class BlogGridComponent {
  // Signal Input nhận danh sách bài viết từ container
  posts = input.required<BlogPost[]>();
  isLoading = input<boolean>(false);

  skeletonCards = Array.from({ length: 6 });

  // Signal Output phát sự kiện toggle favorite và chọn sửa bài
  toggleFavorite = output<number>();
  chooseToEdit = output<BlogPost>();
  modalOpen = inject(ModalController);

  onToggleFavorite(id: number) {
    this.toggleFavorite.emit(id);
  }

  onChooseToEdit(post: BlogPost) {
    this.chooseToEdit.emit(post);
  }

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
}
