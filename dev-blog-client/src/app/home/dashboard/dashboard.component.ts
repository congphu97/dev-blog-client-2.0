import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  NgcCardModule,
  NgcButtonModule,
  NgcBadgeModule,
  NgcTagModule,
  NgcAvatarModule
} from 'ngc-library';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    NgcCardModule,
    NgcButtonModule,
    NgcBadgeModule,
    NgcTagModule,
    NgcAvatarModule
  ],
})
export class DashboardComponent {
  private router = inject(Router);

  // Dữ liệu bài viết nổi bật trên Dashboard
  public featuredBlog = {
    title: 'Khám phá Lập trình Hiện đại với Angular 22 & Ionic 8',
    description: 'Tìm hiểu kiến trúc Standalone, Signals đổi mới, tối ưu hiệu năng toàn diện và trải nghiệm phát triển blog công nghệ đỉnh cao.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80',
    category: 'Angular & Ionic',
    author: 'Phu Dev',
    readTime: '5 phút đọc',
    publishedAt: 'Hôm nay'
  };

  public recentStats = [
    { label: 'Bài viết', count: '12+', icon: '📝' },
    { label: 'Chủ đề', count: '6', icon: '🚀' },
    { label: 'Lượt xem', count: '1.2k', icon: '🔥' },
  ];

  /**
   * Điều hướng sang trang Blog
   */
  public navigateToBlog(): void {
    this.router.navigate(['/blog']);
  }
}
