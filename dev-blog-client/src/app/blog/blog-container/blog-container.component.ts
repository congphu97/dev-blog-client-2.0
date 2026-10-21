import { Component, computed, debounced, effect, inject, linkedSignal, OnInit, signal } from '@angular/core';
import { IonContent, IonButton, IonIcon, ModalController } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';
import { arrayEqualByKey } from 'src/app/shared/signal-utils';
import { BlogFormComponent, NewBlogData } from '../blog-form/blog-form.component';
import { BlogPost } from '../blog.models';
import { BlogGridComponent } from '../blog-grid/blog-grid.component';
import { BlogListComponent } from '../blog-list/blog-list.component';

import { NgcBadgeModule, NgcButtonModule, NgcTagModule, NgcAvatarModule } from 'ngc-library';

@Component({
  selector: 'app-blog-container',
  templateUrl: './blog-container.component.html',
  styleUrls: ['./blog-container.component.scss'],
  imports: [
    HeaderComponent, 
    IonContent, 
    IonButton, 
    BlogGridComponent, 
    BlogListComponent,
    NgcBadgeModule,
    NgcButtonModule,
    NgcTagModule,
    NgcAvatarModule
  ],
})
export class BlogContainerComponent implements OnInit {
  private modalCtrl = inject(ModalController);

  // Chế độ hiển thị: 'grid' hoặc 'list' bằng Signal
  public viewMode = signal<'grid' | 'list'>('grid');

  toggleViewMode() {
    this.viewMode.update(mode => mode === 'grid' ? 'list' : 'grid');
  }

  // 1. Keyword nhận giá trị ngay lập tức khi người dùng gõ
  public keyword = signal<string>('');

  // 2. DÙNG HÀM BUILT-IN CỦA ANGULAR 22: debounced()
  // Trì hoãn 400ms sau khi người dùng dừng gõ mới cập nhật
  public debouncedKeyword = debounced(this.keyword, 400);

  public isFavorite = signal(false);
  public blogPosts = signal<BlogPost[]>([
    {
      id: 1,
      title: 'Tìm hiểu Angular Signals',
      summary: 'Angular Signals là một cách quản lý trạng thái hiệu quả trong Angular 16.',
      imageUrl: 'https://picsum.photos/id/1011/400/250',
      favorite: false
    },
    {
      id: 2,
      title: 'Standalone Components trong Angular',
      summary: 'Hướng dẫn tạo và sử dụng standalone components để giảm phức tạp module.',
      imageUrl: 'https://picsum.photos/id/1012/400/250',
      favorite: false
    },
    {
      id: 3,
      title: 'Lazy Loading Router trong Angular',
      summary: 'Kỹ thuật lazy loading giúp tối ưu hiệu suất ứng dụng Angular.',
      imageUrl: 'https://picsum.photos/id/1013/400/250',
      favorite: false
    },
    {
      id: 4,
      title: 'Angular và RxJS',
      summary: 'Sử dụng RxJS trong Angular để quản lý dữ liệu bất đồng bộ hiệu quả.',
      imageUrl: 'https://picsum.photos/id/1014/400/250',
      favorite: true
    },
    {
      id: 5,
      title: 'Testing trong Angular',
      summary: 'Các phương pháp viết test unit và e2e trong Angular.',
      imageUrl: 'https://picsum.photos/id/1015/400/250',
      favorite: true

    }
  ]);

  // 3. computed lọc theo debouncedKeyword.value() thay vì keyword() trực tiếp!
  public favoriteBlogs = computed(() => {
    const search = (this.debouncedKeyword.value() ?? '').toLowerCase();
    return this.blogPosts().filter(post => post.favorite && post.title.toLowerCase().includes(search));
  }, {
    equal: arrayEqualByKey('id')
  });

  // =========================================================================
  // BÀI TOÁN THỰC TẾ: "Form Chỉnh Sửa Tiêu Đề Bài Viết"
  // 1. selectedBlog: Bài viết đang được chọn (Signal gốc)
  // 2. editTitle: linkedSignal bám theo selectedBlog().title làm mặc định
  //    - User gõ vào input => editTitle.set() cho phép sửa thoải mái.
  //    - User bấm chọn sang bài khác => editTitle TỰ ĐỘNG RESET về tiêu đề bài mới!
  // =========================================================================
  public selectedBlog = signal<BlogPost>(this.blogPosts()[0]);
  public editTitle = linkedSignal(() => this.selectedBlog().title);

  constructor() {
    effect(() => {
      console.log('--- Đang chọn bài:', this.selectedBlog().title);
      console.log('--- Giá trị trong ô Edit Title:', this.editTitle());
    });
  }

  // Chọn bài khác để sửa
  chooseBlogToEdit(blog: BlogPost) {
    this.selectedBlog.set(blog);
  }

  // Lưu tiêu đề mới vào danh sách blogPosts
  saveTitle() {
    this.blogPosts.update(posts =>
      posts.map(p => p.id === this.selectedBlog().id ? { ...p, title: this.editTitle() } : p)
    );
  }


  onSearch(event: Event) {
    this.keyword.set((event.target as HTMLInputElement).value);
  }

  // ==========================================
  // Mở Ionic Modal chứa BlogFormComponent theo từng mode
  // ==========================================
  async openCreateModal(mode: 'signal-form' | 'reactive-form' | 'template-driven-form' = 'signal-form') {
    const modal = await this.modalCtrl.create({
      component: BlogFormComponent,
      componentProps: {
        mode: mode // Truyền vào signal input mode của BlogFormComponent
      }
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss<NewBlogData>();

    if (role === 'confirm' && data) {
      // Dùng Signal .update() để thêm bài viết mới vào đầu danh sách
      const newPost: BlogPost = {
        id: Date.now(),
        title: data.title,
        summary: data.summary,
        imageUrl: data.imageUrl || 'https://picsum.photos/400/250',
        favorite: false
      };

      this.blogPosts.update(posts => [newPost, ...posts]);
      console.log('Đã tạo bài viết mới bằng Signal:', newPost);
    }
  }

  toggleFavorite(id: number) {
    const posts = this.blogPosts();
    // const index = posts.findIndex(p => p.id === id);
    // if (index > -1) {
    //   // copy mảng để trigger change
    //   const newPosts = [...posts];
    //   newPosts[index] = { ...newPosts[index], favorite: !newPosts[index].favorite };
    //   this.blogPosts.set(newPosts);
    // }

    this.blogPosts.update(posts =>
      posts.map(post =>
        post.id === id ? { ...post, favorite: !post.favorite } : post
      )
    );
  }

}
