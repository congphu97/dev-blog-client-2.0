# Cẩm Nang Angular Signals: `signal` vs `computed` vs `linkedSignal`

Tài liệu so sánh chi tiết, trực quan kèm ví dụ thực tế cho ứng dụng Angular 20+.

---

## 1. Bảng So Sánh Tổng Quan (Cheat Sheet)

| Tiêu chí | `signal()` | `computed()` | `linkedSignal()` |
| :--- | :--- | :--- | :--- |
| **Bản chất** | **State gốc (Source of Truth)**. Tự quản lý và độc lập hoàn toàn. | **State dẫn xuất (Derived State)**. Phụ thuộc 100% vào các Signal khác. | **State phụ thuộc lai (Hybrid State)**. Có giá trị mặc định tính toán nhưng cho phép can thiệp ghi. |
| **Loại Signal** | `WritableSignal<T>` | `Signal<T>` (Read-only) | `WritableSignal<T>` |
| **Khả năng Ghi** (`.set()`, `.update()`) | ✅ **Có** | ❌ **Không** (Lỗi compile ngay) | ✅ **Có** |
| **Tự động theo dõi Dependency?** | ❌ Không | ✅ **Có** (Bất kỳ signal nào gọi bên trong đều kích hoạt tính toán lại) | ✅ **Có** (Theo dõi signal nguồn) |
| **Cơ chế Cache (Memoization)** | Lưu giá trị hiện tại | ✅ **Có** (Chỉ tính lại khi signal phụ thuộc thay đổi) | ✅ **Có** |
| **Hành vi khi nguồn gốc thay đổi** | Không bị ảnh hưởng | Tự động tính toán ra kết quả mới | 🔄 **TỰ ĐỘNG RESET** giá trị về công thức mặc định (hủy giá trị user vừa `.set()`) |
| **Khi nào sử dụng?** | • State gốc: form inputs, danh sách từ API, flags toggle UI, user session... | • Lọc (filter), sắp xếp (sort) mảng<br>• Tính tổng tiền, đếm số lượng<br>• Định dạng hiển thị chuỗi (full name, currency format)... | • Lựa chọn item (selected item)<br>• Số lượng mua mặc định theo sản phẩm<br>• Pagination (chuyển trang tự reset về trang 1 khi đổi bộ lọc)<br>• Reset form state theo input từ cha |

---

## 2. Phân Tích Chi Tiết Từng Loại

### 2.1. `signal<T>(initialValue)` – State Gốc
- **Đặc điểm:** Dùng để tạo ra state có thể đọc và ghi.
- **Cách dùng:**
  ```typescript
  const count = signal(0);

  // Đọc:
  console.log(count()); // 0

  // Gán đè:
  count.set(10);

  // Cập nhật dựa trên giá trị trước:
  count.update(prev => prev + 1);
  ```

---

### 2.2. `computed<T>(fn, options?)` – State Chỉ Đọc
- **Đặc điểm:** Tự động lắng nghe các Signal được gọi bên trong callback.
- **Tính năng nổi bật:** Có tính năng **Memoization** (chỉ chạy lại khi dependency đổi) và hỗ trợ hàm so sánh **`equal`** để ngăn chặn tính toán/re-render lãng phí.
- **Cách dùng:**
  ```typescript
  const count = signal(2);
  const doubleCount = computed(() => count() * 2);

  console.log(doubleCount()); // 4
  // doubleCount.set(10); // ❌ LỖI: Computed là read-only!
  ```

---

### 2.3. `linkedSignal<T>(computation | options)` – State Liên Kết & Tự Reset (Angular 19+)
- **Đặc điểm:** Giải quyết bài toán: *"Vừa muốn bám theo state cha làm giá trị mặc định, vừa muốn người dùng được phép thay đổi tạm thời, và tự động reset khi state cha đổi"*.
- **Cách dùng:**
  ```typescript
  // Cú pháp ngắn gọn:
  const selectedPost = linkedSignal(() => blogPosts()[0]);

  // Cú pháp đầy đủ có nhận giá trị trước đó:
  const quantity = linkedSignal({
    source: product,
    computation: (newProduct, previous) => 1 // Reset về 1 mỗi khi product đổi
  });
  ```

---

## 3. Code Ví Dụ Toàn Diện (Blog Feature)

Dưới đây là một ví dụ kết hợp cả 3 loại trong một màn hình quản lý bài viết blog:

```typescript
import { Component, signal, computed, linkedSignal } from '@angular/core';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  favorite: boolean;
}

@Component({
  selector: 'app-blog-demo',
  template: `
    <!-- 1. SIGNAL: Nhập từ khóa tìm kiếm -->
    <input 
      [value]="keyword()" 
      (input)="onSearch($event)" 
      placeholder="Tìm theo tiêu đề..." 
    />

    <!-- 2. COMPUTED: Tự động hiển thị số bài yêu thích & danh sách lọc -->
    <p>Số bài yêu thích: <strong>{{ favoriteCount() }}</strong></p>

    <!-- 3. LINKEDSIGNAL: Hiển thị bài viết đang chọn -->
    <div class="preview-box">
      <h4>Bài viết đang được chọn xem chi tiết:</h4>
      <p>{{ selectedPost()?.title }} (Category: {{ selectedPost()?.category }})</p>
    </div>

    <!-- Danh sách bài viết -->
    <ul>
      @for (post of filteredPosts(); track post.id) {
        <li>
          <span>{{ post.title }}</span>
          <!-- User chủ động click chọn bài này -->
          <button (click)="selectPost(post)">Chọn xem</button>
        </li>
      }
    </ul>

    <!-- Nút giả lập đổi Danh mục (Làm nguồn gốc thay đổi) -->
    <button (click)="changeCategory('Tech')">Chuyển sang chuyên mục Tech</button>
    <button (click)="changeCategory('Travel')">Chuyển sang chuyên mục Travel</button>
  `
})
export class BlogDemoComponent {

  // =========================================================================
  // 1. SIGNAL (State gốc)
  // =========================================================================
  public keyword = signal('');
  public selectedCategory = signal('All');

  public blogPosts = signal<BlogPost[]>([
    { id: 1, title: 'Học Signals Cơ Bản', category: 'Tech', favorite: true },
    { id: 2, title: 'Kinh nghiệm du lịch Đà Lạt', category: 'Travel', favorite: false },
    { id: 3, title: 'Hiểu sâu về LinkedSignal', category: 'Tech', favorite: true },
  ]);

  onSearch(event: Event) {
    this.keyword.set((event.target as HTMLInputElement).value);
  }

  changeCategory(cat: string) {
    this.selectedCategory.set(cat);
  }


  // =========================================================================
  // 2. COMPUTED (State dẫn xuất - Read-only)
  // =========================================================================
  
  // Tự động lọc danh sách bài viết theo Category và Keyword
  public filteredPosts = computed(() => {
    const cat = this.selectedCategory();
    const search = this.keyword().toLowerCase().trim();

    return this.blogPosts().filter(post => {
      const matchCat = cat === 'All' || post.category === cat;
      const matchKeyword = !search || post.title.toLowerCase().includes(search);
      return matchCat && matchKeyword;
    });
  });

  // Tự động đếm số bài yêu thích
  public favoriteCount = computed(() => {
    return this.blogPosts().filter(p => p.favorite).length;
  });


  // =========================================================================
  // 3. LINKEDSIGNAL (Liên kết + Cho phép ghi + Tự động Reset)
  // =========================================================================
  
  // Mặc định luôn chọn bài ĐẦU TIÊN trong danh sách filteredPosts
  public selectedPost = linkedSignal<BlogPost | undefined>(() => this.filteredPosts()[0]);

  // User bấm nút chọn một bài cụ thể: VẪN .set() ĐƯỢC BÌNH THƯỜNG!
  selectPost(post: BlogPost) {
    this.selectedPost.set(post);
  }

  /*
   * CƠ CHẾ RESET KỲ DIỆU CỦA LINKEDSIGNAL:
   * Giả sử user đang ở chuyên mục 'Tech', đang chọn xem bài id = 3.
   * Khi user bấm nút đổi sang chuyên mục 'Travel':
   * => filteredPosts() thay đổi danh sách!
   * => selectedPost PHÁT HIỆN nguồn phụ thuộc đã thay đổi!
   * => selectedPost TỰ ĐỘNG RESET về bài đầu tiên của nhóm 'Travel' (id = 2)!
   * (Nếu dùng signal thông thường, nó sẽ bị kẹt lại ở bài id = 3 của nhóm Tech cũ).
   */
}
```

---

## 4. Tóm Tắt Trong 3 Câu Thần Chú

1. **`signal`**: Dữ liệu do **mình tự làm chủ**, thích sửa lúc nào thì gọi `.set()` / `.update()`.
2. **`computed`**: Dữ liệu **ăn theo 100%**, chỉ xem, không được đụng tay vào sửa.
3. **`linkedSignal`**: Dữ liệu **ăn theo làm mặc định, cho phép sửa tạm thời, nhưng hễ nguồn đổi thì tự động xóa đi làm lại (Reset)**.

---

## 5. Xử Lý Ô Input Keyword (Search): Phiên Bản Cũ vs Phiên Bản Mới

### 5.1. Bảng Đối Chiếu Nhanh

| Tiêu chí | Phiên bản cũ (Traditional / NgModule) | Phiên bản mới (Angular Signals & Standalone) |
| :--- | :--- | :--- |
| **Kiểu biến** | `public keyword: string = '';` | `public keyword = signal<string>('');` |
| **Phụ thuộc module** | Cần import `FormsModule` | **Không cần `FormsModule`** (dùng Native DOM) |
| **Cú pháp HTML** | `[(ngModel)]="keyword" (ngModelChange)="onSearch()"` | `[value]="keyword()" (input)="onSearch($event)"` |
| **Bắt sự kiện Enter** | `(change)="onSearch()"` | `(change)="onSearch($event)"` hoặc `(keydown.enter)="onSearch($event)"` |
| **Cơ chế lọc mảng** | Phải gọi hàm `filterPosts()` thủ công mỗi khi keyword đổi | Tự động hoàn toàn bằng `computed()` (Reactivity) |

---

### 5.2. So Sánh Code Thực Tế

#### ❌ Cách Cũ (Dùng `ngModel` & biến thường):
```typescript
// blog-list.component.ts
import { FormsModule } from '@angular/forms'; // Bắt buộc phải import

@Component({
  imports: [CommonModule, FormsModule]
})
export class BlogListComponent {
  public keyword: string = '';
  public blogPosts: BlogPost[] = [ ... ];
  public filteredPosts: BlogPost[] = [];

  ngOnInit() {
    this.filteredPosts = this.blogPosts;
  }

  // Phải tự tay gọi lọc lại mỗi khi gõ/nhấn Enter
  onSearch() {
    this.filteredPosts = this.blogPosts.filter(p => 
      p.title.toLowerCase().includes(this.keyword.toLowerCase())
    );
  }
}
```

```html
<!-- blog-list.component.html -->
<!-- Two-way binding cũ -->
<input [(ngModel)]="keyword" (ngModelChange)="onSearch()" placeholder="Search..." />

@for (post of filteredPosts; track post.id) {
  <div>{{ post.title }}</div>
}
```

---

#### ✅ Cách Mới Chuẩn Signal (Không cần `FormsModule`, Declarative):
```typescript
// blog-list.component.ts
// Hoàn toàn không cần FormsModule!
export class BlogListComponent {
  // 1. Keyword là một Signal
  public keyword = signal('');
  public blogPosts = signal<BlogPost[]>([ ... ]);

  // 2. computed tự động tính lại mỗi khi keyword() HOẶC blogPosts() đổi
  public filteredPosts = computed(() => {
    const search = this.keyword().toLowerCase().trim();
    if (!search) return this.blogPosts();
    return this.blogPosts().filter(p => p.title.toLowerCase().includes(search));
  });

  // 3. Cập nhật keyword khi người dùng nhập
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.keyword.set(input.value);
  }
}
```

```html
<!-- blog-list.component.html -->
<!-- 
  [value]="keyword()"          : Đổ dữ liệu từ Signal ra thẻ input
  (input)="onSearch($event)"    : Tìm kiếm theo thời gian thực (gõ chữ nào ăn chữ đó)
  Hoặc (change)="onSearch($event)" : Tìm kiếm khi nhấn Enter hoặc click ra ngoài (blur)
-->
<input [value]="keyword()" (input)="onSearch($event)" placeholder="Search..." />

@for (post of filteredPosts(); track post.id) {
  <div>{{ post.title }}</div>
}
```

> **Tại sao cách mới vượt trội hơn?**
> 1. **Gọn nhẹ:** Loại bỏ hoàn toàn sự phụ thuộc vào `FormsModule`.
> 2. **Không lỗi thời dữ liệu (No Stale State):** Ở cách cũ, nếu `blogPosts` cập nhật (gọi API mới về) mà quên gọi `onSearch()`, danh sách `filteredPosts` sẽ hiển thị sai. Với `computed()`, Angular cam kết dữ liệu trên UI luôn đồng bộ 100%!

---

## 6. Cầu Nối Giữa Signal và Observable (RxJS Interop)

Angular cung cấp gói `@angular/core/rxjs-interop` để chuyển đổi qua lại giữa **Signals (đồng bộ, quản lý UI)** và **RxJS Observables (bất đồng bộ, thời gian, sự kiện)**.

```
       toObservable()
Signal  ─────────────►  Observable (Dùng các toán tử RxJS: debounceTime, switchMap...)
        ◄─────────────
          toSignal()
```

---

### 6.1. Biến 1 Signal thành Observable: `toObservable()`

Hàm `toObservable(mySignal)` nhận vào 1 Signal và trả về 1 Observable. Cứ mỗi khi giá trị của Signal thay đổi, Observable này sẽ bắn ra giá trị đó (`next(value)`).

#### Cú pháp cơ bản:
```typescript
import { Component, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

export class DemoComponent {
  public count = signal(0);

  // 1. Biến Signal thành Observable
  public count$ = toObservable(this.count);

  constructor() {
    // 2. Lắng nghe như một Observable thông thường
    this.count$.subscribe(val => {
      console.log('Observable nhận giá trị mới:', val);
    });
  }
}
```

> ⚠️ **Lưu ý quan trọng về Injection Context:**
> `toObservable()` cần bám vào vòng đời component để tự động `complete` (hủy đăng ký). Vì vậy, nó **phải được gọi tại chỗ khai báo thuộc tính** hoặc **bên trong `constructor()`**. Nếu gọi trong các method khác (như `ngOnInit`), bạn phải truyền thêm `{ injector }`.

---

### 6.2. Kỹ Thuật Thực Chiến: Debounce Tìm Kiếm (Signal ➔ Observable ➔ Signal)

Signal thuần túy không có khái niệm độ trễ (delay hay debounce). Do đó, kịch bản thực tế là:
1. Tạo `keyword` dạng **Signal** để gắn vào ô `<input>` cho mượt.
2. Dùng `toObservable()` để biến thành luồng sự kiện.
3. Dùng toán tử RxJS `debounceTime(400)` + `distinctUntilChanged()` để chờ user ngừng gõ.
4. Dùng `toSignal()` để ép luồng Observable đó ngược về **Signal** cho template và `computed()` dễ xài!

```typescript
import { Component, signal, computed } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged } from 'rxjs';

export class BlogListComponent {
  // 1. Signal lưu chữ gõ tức thời trên input (User gõ chữ nào nhận ngay chữ đó)
  public keyword = signal('');

  // 2. Chuyển thành Observable -> Debounce 400ms -> Chuyển ngược lại thành Signal
  public debouncedKeyword = toSignal(
    toObservable(this.keyword).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    { initialValue: '' } // Giá trị khởi tạo ban đầu khi chưa gõ gì
  );

  public blogPosts = signal<BlogPost[]>([ ... ]);

  // 3. computed lọc theo debouncedKeyword thay vì keyword trực tiếp!
  // Chỉ chạy tính toán/lọc khi user đã dừng gõ đủ 400ms!
  public filteredPosts = computed(() => {
    const search = this.debouncedKeyword().toLowerCase().trim();
    console.log('🔥 Chỉ chạy lọc bài viết khi đã ngừng gõ 400ms:', search);

    if (!search) return this.blogPosts();
    return this.blogPosts().filter(p => p.title.toLowerCase().includes(search));
  });

  onSearch(event: Event) {
    this.keyword.set((event.target as HTMLInputElement).value);
  }
}
```

#### Template HTML:
```html
<!-- Bắt sự kiện (input) để cập nhật liên tục -->
<input [value]="keyword()" (input)="onSearch($event)" placeholder="Gõ tìm kiếm..." />

<!-- Danh sách tự động lọc mượt mà sau 400ms -->
@for (post of filteredPosts(); track post.id) {
  <div>{{ post.title }}</div>
}
```

---

### 6.3. Helper Hàm Tái Sử Dụng: `debounceSignal()`

Để không phải viết đi viết lại pipe RxJS ở các component khác, bạn có thể tạo một helper dùng chung trong `src/app/shared/signal-utils.ts`:

```typescript
import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

/**
 * Trì hoãn việc cập nhật giá trị của Signal sau một khoảng thời gian timeMs (mặc định 300ms)
 */
export function debounceSignal<T>(sourceSignal: Signal<T>, timeMs: number = 300): Signal<T> {
  return toSignal(
    toObservable(sourceSignal).pipe(debounceTime(timeMs)),
    { initialValue: sourceSignal() }
  );
}
```

**Cách dùng siêu ngắn gọn trong component:**
```typescript
public keyword = signal('');
public debouncedKeyword = debounceSignal(this.keyword, 400); // 1 dòng là xong!
```

---

## 7. Tiến Hóa Của Form Trong Angular: Cũ vs Compat vs Signal Mới

### 7.1. Bảng Tóm Tắt So Sánh Các Thế Hệ Form

| Tiêu chí | 1. Legacy Forms (Phiên bản cũ) | 2. Compat Forms (Giai đoạn chuyển giao) | 3. Pure Signal Forms (Phiên bản mới) |
| :--- | :--- | :--- | :--- |
| **Các loại hình** | • Reactive Forms (`FormGroup`)<br>• Template-driven (`ngModel`) | Reactive Forms bọc thêm tầng Signal Interop (`toSignal`) | Pure Signal Model (`signal()`, `linkedSignal()`) |
| **Nền tảng cốt lõi** | **RxJS + Zone.js** | **RxJS + Signal Interop** | **Granular Reactivity (Signals thuần)** |
| **Module bắt buộc** | `ReactiveFormsModule` hoặc `FormsModule` | `ReactiveFormsModule` + `@angular/core/rxjs-interop` | **Không cần module nào** (Zero Dependency) |
| **Cách theo dõi giá trị** | `form.valueChanges.subscribe(...)` | `formValue = toSignal(form.valueChanges)` | Gọi hàm `form().field` trực tiếp |
| **Cơ chế Validation** | Class `Validators` (`required`, `minLength`...) | Vẫn dùng `Validators` cũ nhưng bọc status qua Signal | Dùng **`computed()`** kiểm tra logic đồng bộ |
| **Tốc độ render UI** | Quét lại toàn bộ cây component (Zone.js) | Cải thiện: Chỉ render đúng chỗ Signal thay đổi | **Tối ưu tối đa**: Không cần Zone.js (Zoneless ready) |
| **Khi nào sử dụng?** | Dự án cũ đang chạy ổn định | Dự án lớn có nhiều form cũ cần gắn UI Signal mà không có thời gian viết lại | **Dự án mới, form modal, form tính năng mới** |

---

### 7.2. Chi Tiết: "Compat Form" (Compatibility Form) Là Gì?

> **Định nghĩa:** **Compat Form** là giải pháp "bắc cầu" (bridge) giúp bạn giữ nguyên logic của **Reactive Form cũ** (`FormGroup`, `FormControl`), nhưng lại có thể **đọc và đồng bộ dữ liệu dưới dạng Signal** để template HTML hiển thị mượt mà mà không lo rò rỉ bộ nhớ (memory leak do quên `unsubscribe`).

#### Vấn đề của cách cũ:
```typescript
// ❌ Cách cũ: Phải tự quản lý subscribe / unsubscribe và cờ boolean
this.blogForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
  this.isValid = this.blogForm.valid;
});
```

#### Cách giải quyết bằng "Compat Form":
```typescript
import { Component, computed, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form">
      <input formControlName="title" placeholder="Tiêu đề..." />
    </form>

    <!-- UI đọc trực tiếp từ Signal cực kỳ mượt mà! -->
    <p>Tiêu đề đang gõ: {{ formValues()?.title }}</p>
    <button [disabled]="!isFormValid()">Lưu</button>
  `
})
export class CompatFormDemoComponent {
  private fb = inject(FormBuilder);

  // 1. Giữ nguyên FormGroup cũ (Code cũ không cần sửa gì)
  public form = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    summary: ['', [Validators.required]]
  });

  // 2. TẦNG COMPAT: Chuyển toàn bộ valueChanges thành một Signal tự động!
  public formValues = toSignal(this.form.valueChanges, {
    initialValue: this.form.value
  });

  // 3. TẬP TRUNG TÍNH TOÁN: Kết hợp signal của form với computed()
  public isFormValid = computed(() => {
    // Tự động kiểm tra đồng bộ, template không cần check form.invalid lằng nhằng
    const val = this.formValues();
    return (val?.title?.trim().length ?? 0) >= 3 && (val?.summary?.trim().length ?? 0) > 0;
  });
}
```

---

### 7.3. Khi Nào Nên Chọn Cách Nào?

1. **Dùng Pure Signal Form khi:**
   - Tạo các form modal, popup thêm/sửa nhanh (như `BlogFormComponent` vừa làm).
   - Muốn component siêu nhẹ, không cần kéo theo gói `FormsModule`.
   - Cần tính năng Live Preview xem trước dữ liệu theo thời gian thực.
2. **Dùng Compat Form khi:**
   - Dự án đã có sẵn hàng chục màn hình dùng `FormGroup` phức tạp (form nhiều bước, dynamic controls).
   - Bạn chỉ muốn gắn thêm tính năng mới hoặc tối ưu hóa hiển thị UI bằng Signals mà không muốn rủi ro phá vỡ logic cũ.



