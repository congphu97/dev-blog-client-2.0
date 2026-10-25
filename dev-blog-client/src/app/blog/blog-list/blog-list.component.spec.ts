import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BlogListComponent } from './blog-list.component';
import { BlogPost } from '../blog.models';

describe('BlogListComponent', () => {
  let component: BlogListComponent;
  let fixture: ComponentFixture<BlogListComponent>;

  // Dữ liệu mẫu (Mock data) phục vụ cho test
  const mockPosts: BlogPost[] = [
    {
      id: 1,
      title: 'Angular Testing Guide',
      summary: 'Hướng dẫn viết Unit Test từ cơ bản đến nâng cao trong Angular.',
      imageUrl: 'https://example.com/angular.png',
      favorite: true
    },
    {
      id: 2,
      title: 'Học Ionic Framework',
      summary: 'Làm quen với việc xây dựng ứng dụng di động hybrid.',
      imageUrl: 'https://example.com/ionic.png',
      favorite: false
    }
  ];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BlogListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BlogListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('posts', []);
  }));

  it('nên khởi tạo component thành công', () => {
    fixture.componentRef.setInput('posts', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Hiển thị danh sách (Render List)', () => {
    it('nên render đúng số lượng bài viết khi có dữ liệu', () => {
      // 1. Arrange: Truyền input 2 bài viết
      fixture.componentRef.setInput('posts', mockPosts);
      // 2. Act: Cập nhật DOM
      fixture.detectChanges();

      // 3. Assert: Kiểm tra số phần tử hiển thị
      const items = fixture.nativeElement.querySelectorAll('.list-item');
      expect(items.length).toBe(2);
    });

    it('không nên render bài viết nào khi mảng posts rỗng', () => {
      fixture.componentRef.setInput('posts', []);
      fixture.detectChanges();

      const items = fixture.nativeElement.querySelectorAll('.list-item');
      expect(items.length).toBe(0);
    });

    it('nên hiển thị đúng tiêu đề và tóm tắt của bài viết đầu tiên', () => {
      fixture.componentRef.setInput('posts', mockPosts);
      fixture.detectChanges();

      const firstTitle = fixture.nativeElement.querySelector('.item-title')?.textContent?.trim();
      const firstSummary = fixture.nativeElement.querySelector('.item-summary')?.textContent?.trim();

      expect(firstTitle).toBe('Angular Testing Guide');
      expect(firstSummary).toBe('Hướng dẫn viết Unit Test từ cơ bản đến nâng cao trong Angular.');
    });
  });

  describe('Điều kiện giao diện (Favorite UI)', () => {
    it('nên hiển thị icon trái tim đỏ khi post.favorite = true', () => {
      fixture.componentRef.setInput('posts', [mockPosts[0]]); // mockPosts[0] có favorite = true
      fixture.detectChanges();

      const favBtn = fixture.nativeElement.querySelector('.favorite-btn');
      expect(favBtn?.textContent?.trim()).toBe('❤️');
    });

    it('nên hiển thị icon trái tim trắng khi post.favorite = false', () => {
      fixture.componentRef.setInput('posts', [mockPosts[1]]); // mockPosts[1] có favorite = false
      fixture.detectChanges();

      const favBtn = fixture.nativeElement.querySelector('.favorite-btn');
      expect(favBtn?.textContent?.trim()).toBe('🤍');
    });
  });

  describe('Tương tác người dùng (User Events)', () => {
    it('nên phát sự kiện toggleFavorite kèm theo post.id khi click vào nút tim', () => {
      // Dùng spyOn để theo dõi hàm emit của Output toggleFavorite
      spyOn(component.toggleFavorite, 'emit');

      fixture.componentRef.setInput('posts', mockPosts);
      fixture.detectChanges();

      // Tìm nút favorite đầu tiên và giả lập thao tác click
      const favBtn = fixture.nativeElement.querySelector('.favorite-btn') as HTMLButtonElement;
      favBtn.click();

      // Kiểm tra xem hàm emit có được gọi đúng với ID = 1 không
      expect(component.toggleFavorite.emit).toHaveBeenCalledWith(1);
    });

    it('nên phát sự kiện chooseToEdit kèm theo thông tin post khi click nút Sửa bài này', () => {
      spyOn(component.chooseToEdit, 'emit');

      fixture.componentRef.setInput('posts', mockPosts);
      fixture.detectChanges();

      // Giả lập click nút "✏️ Sửa bài này"
      const editBtn = fixture.nativeElement.querySelector('.item-actions button') as HTMLButtonElement;
      editBtn.click();

      // Kiểm tra xem hàm emit có nhận đúng toàn bộ object post đầu tiên không
      expect(component.chooseToEdit.emit).toHaveBeenCalledWith(mockPosts[0]);
    });
  });
});
