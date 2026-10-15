import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';

import { NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule } from 'ngc-library';

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

  onToggleFavorite(id: number) {
    this.toggleFavorite.emit(id);
  }

  onChooseToEdit(post: BlogPost) {
    this.chooseToEdit.emit(post);
  }
}
