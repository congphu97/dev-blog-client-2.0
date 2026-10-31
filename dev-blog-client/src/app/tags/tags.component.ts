import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { NgcButtonModule, NgcBadgeModule, NgcTagModule, NgcCardModule, NgcSkeletonModule, NgcLoadingModule } from 'ngc-library';
import { BlogService } from '../blog/blog.service';
import { BlogPost } from '../blog/blog.models';

export interface TagInfo {
  name: string;
  count: number;
  firstLetter: string;
}

@Component({
  selector: 'app-tags',
  standalone: true,
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    NgcButtonModule,
    NgcBadgeModule,
    NgcTagModule,
    NgcCardModule,
    NgcSkeletonModule,
    NgcLoadingModule
  ]
})
export class TagsComponent implements OnInit {
  private blogService = inject(BlogService);
  private router = inject(Router);

  public isLoading = signal<boolean>(true);
  public skeletonCards = Array.from({ length: 12 });
  public blogs = signal<BlogPost[]>([]);
  public searchQuery = signal<string>('');
  public selectedLetter = signal<string>('ALL');
  public selectedTag = signal<string | null>(null);

  // Danh sách ký tự alphabet từ A-Z kèm 'ALL' và '#'
  public readonly alphabet: string[] = [
    'ALL',
    ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    '#'
  ];

  // Danh sách tags gợi ý phổ biến (Recommended)
  public readonly recommendedTags: string[] = [
    'Angular',
    'CI/CD',
    'DevOps',
    'Capacitor',
    'Firebase',
    'TypeScript',
    'Docker'
  ];

  async ngOnInit() {
    this.isLoading.set(true);
    try {
      const posts = await this.blogService.getBlogs();
      this.blogs.set(posts || []);
    } catch (err) {
      console.error('Lỗi khi tải bài viết để trích xuất tags:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  // Tổng hợp tất cả các tag từ bài viết và đếm số lượng
  public allTags = computed<TagInfo[]>(() => {
    const posts = this.blogs();
    const tagMap = new Map<string, number>();

    for (const post of posts) {
      if (Array.isArray(post.tags)) {
        for (const rawTag of post.tags) {
          const t = rawTag.trim();
          if (t) {
            tagMap.set(t, (tagMap.get(t) || 0) + 1);
          }
        }
      }
    }

    const result: TagInfo[] = [];
    tagMap.forEach((count, name) => {
      const firstChar = name.charAt(0).toUpperCase();
      const firstLetter = /^[A-Z]$/.test(firstChar) ? firstChar : '#';
      result.push({ name, count, firstLetter });
    });

    // Sắp xếp Alphabet theo tên tag
    return result.sort((a, b) => a.name.localeCompare(b.name));
  });

  // Lọc tag theo Search Query và Chữ cái được chọn (Alphabet)
  public filteredTags = computed<TagInfo[]>(() => {
    const letter = this.selectedLetter();
    const query = this.searchQuery().trim().toLowerCase();
    const tags = this.allTags();

    return tags.filter(item => {
      // 1. Khớp từ khóa tìm kiếm
      const matchQuery = !query || item.name.toLowerCase().includes(query);

      // 2. Khớp chữ cái được chọn
      let matchLetter = true;
      if (letter !== 'ALL') {
        if (letter === '#') {
          matchLetter = item.firstLetter === '#';
        } else {
          matchLetter = item.name.trim().toUpperCase().startsWith(letter);
        }
      }

      return matchQuery && matchLetter;
    });
  });

  // Danh sách bài viết ứng với tag đang được bấm chọn
  public articlesWithSelectedTag = computed<BlogPost[]>(() => {
    const tag = this.selectedTag();
    if (!tag) return [];

    return this.blogs().filter(post => 
      Array.isArray(post.tags) && post.tags.some(t => t.trim().toLowerCase() === tag.toLowerCase())
    );
  });

  // Chọn chữ cái
  public selectLetter(letter: string): void {
    this.selectedLetter.set(letter);
  }

  // Chọn tag
  public selectTag(tagName: string): void {
    if (this.selectedTag() === tagName) {
      this.selectedTag.set(null); // Bỏ chọn nếu bấm lại
    } else {
      this.selectedTag.set(tagName);
    }
  }

  // Đi tới chi tiết bài viết
  public viewPost(post: BlogPost): void {
    this.router.navigate(['/blog', post.id]);
  }
}
