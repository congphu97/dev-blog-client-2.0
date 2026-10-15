import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../blog.models';

import { NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule } from 'ngc-library';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss'],
  imports: [CommonModule, NgcAvatarModule, NgcTagModule, NgcBadgeModule, NgcButtonModule, NgcCardModule]
})
export class BlogListComponent {
  // Signal Input nhận danh sách bài viết từ container
  posts = input.required<BlogPost[]>();

  // Signal Output phát sự kiện
  toggleFavorite = output<number>();
  chooseToEdit = output<BlogPost>();

  onToggleFavorite(id: number) {
    this.toggleFavorite.emit(id);
  }

  onChooseToEdit(post: BlogPost) {
    this.chooseToEdit.emit(post);
  }
}
