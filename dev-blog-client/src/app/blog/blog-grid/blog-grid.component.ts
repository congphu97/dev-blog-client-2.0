import { Component, inject, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';

import { NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule } from 'ngc-library';
import { ModalController } from '@ionic/angular/standalone';
import { BlogDetailComponent } from '../blog-detail/blog-detail.component';
import { BlogFormComponent } from '../blog-form/blog-form.component';
import { BlogFormReactiveComponent } from '../blog-form/blog-form-reactive/blog-form-reactive.component';
import { BlogFormTemplateComponent } from '../blog-form/blog-form-template/blog-form-template.component';

@Component({
  selector: 'app-blog-grid',
  templateUrl: './blog-grid.component.html',
  styleUrls: ['./blog-grid.component.scss'],
  imports: [CommonModule, NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule]
})
export class BlogGridComponent {
  // Signal Input nhận danh sách bài viết từ container
  posts = input.required<BlogPost[]>();

  // Signal Output phát sự kiện toggle favorite và chọn sửa bài
  toggleFavorite = output<number>();
  chooseToEdit = output<BlogPost>();
  modalOpen = inject(ModalController);

  onToggleFavorite(id: number) {
    this.toggleFavorite.emit(id);
  }

  async onChooseToEdit(post: BlogPost) {
    // this.chooseToEdit.emit(post);
     const modal = await this.modalOpen.create({
      component: BlogFormTemplateComponent,
      componentProps: {
        post: post
      }
    });

    await modal.present();
  }

  async navigationToDetail(post: BlogPost) {
    const modal = await this.modalOpen.create({
      component: BlogDetailComponent,
      componentProps: {
        post: post
      }
    });

    await modal.present();
  }
}
