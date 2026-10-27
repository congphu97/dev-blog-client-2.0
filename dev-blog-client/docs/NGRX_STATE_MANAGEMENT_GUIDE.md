# Cẩm Nang Toàn Diện Về NgRx (NgRx State Management) Trong Angular: Global Store vs SignalStore

> **Mục tiêu tài liệu:** Giúp bạn làm chủ từ gốc rễ hai trường phái quản lý trạng thái mạnh mẽ nhất hiện nay trong hệ sinh thái Angular:
> 1. **Cách 1: NgRx Global Store truyền thống** (Redux + RxJS: Actions, Reducers, Selectors, Effects, @ngrx/entity).
> 2. **Cách 2: NgRx SignalStore hiện đại** (`@ngrx/signals` - Thế hệ mới tối ưu cho Angular 16/17/18/19/20+ với Angular Signals, Zero Boilerplate).
> Toàn bộ hướng dẫn đều sử dụng ví dụ thực tế xuyên suốt: **Feature Quản lý Blog (Dev Blog)**.

---

## Mục lục

1. [Tổng quan: NgRx là gì & Tại sao cần State Management?](#1-tổng-quan-ngrx-là-gì--tại-sao-cần-state-management)
2. [Sơ đồ so sánh kiến trúc: Global Store (RxJS) vs SignalStore (Signals)](#2-sơ-đồ-so-sánh-kiến-trúc-global-store-rxjs-vs-signalstore-signals)
3. [CÁCH 1: Triển khai với NgRx Global Store (Redux + RxJS)](#3-cách-1-triển-khai-với-ngrx-global-store-redux--rxjs)
   - [3.1. Cài đặt thư viện](#31-cài-đặt-thư-viện)
   - [3.2. Định nghĩa Model & State Interface](#32-định-nghĩa-model--state-interface)
   - [3.3. Định nghĩa Actions (`createActionGroup`)](#33-định-nghĩa-actions-createactiongroup)
   - [3.4. Chuẩn hoá danh sách với `@ngrx/entity` (EntityAdapter)](#34-chuẩn-hoá-danh-sách-với-ngrxentity-entityadapter)
   - [3.5. Tạo Reducer (`createReducer`, `on`)](#35-tạo-reducer-createreducer-on)
   - [3.6. Tạo Selectors (`createSelector` với Memoization)](#36-tạo-selectors-createselector-với-memoization)
   - [3.7. Tạo Effects xử lý API bất đồng bộ (`createEffect`)](#37-tạo-effects-xử-lý-api-bất-đồng-bộ-createeffect)
   - [3.8. Đăng ký Store trong `main.ts` (Standalone Architecture)](#38-đăng-ký-store-trong-maints-standalone-architecture)
   - [3.9. Sử dụng trong Component](#39-sử-dụng-trong-component)
4. [CÁCH 2: Triển khai với NgRx SignalStore (`@ngrx/signals`)](#4-cách-2-triển-khai-với-ngrx-signalstore-ngrxsignals)
   - [4.1. Tại sao SignalStore lại là xu hướng của Angular hiện đại?](#41-tại-sao-signalstore-lại-là-xu-hướng-của-angular-hiện-đại)
   - [4.2. Cài đặt thư viện](#42-cài-đặt-thư-viện-1)
   - [4.3. Xây dựng `BlogStore` với `signalStore`](#43-xây-dựng-blogstore-với-signalstore)
   - [4.4. Đăng ký & Sử dụng `BlogStore` trong Component](#44-đăng-ký--sử-dụng-blogstore-trong-component)
5. [Bảng so sánh trực diện: Global Store vs SignalStore](#5-bảng-so-sánh-trực-diện-global-store-vs-signalstore)
6. [Các nguyên tắc sống còn & Best Practices](#6-các-nguyên-tắc-sống-còn--best-practices)

---

## 1. Tổng quan: NgRx là gì & Tại sao cần State Management?

### Vấn đề thực tế khi ứng dụng Angular lớn dần:
1. **Prop Drilling:** Truyền dữ liệu qua lại giữa component cha -> con -> cháu thông qua vô số `@Input()` và `@Output()`.
2. **Phân mảnh dữ liệu (Multiple Sources of Truth):** Nhiều component cùng giữ một bản sao của dữ liệu, khi một nơi cập nhật thì các nơi khác bị lệch.
3. **Mất kiểm soát luồng dữ liệu:** Rất khó trả lời câu hỏi: *"Dữ liệu này bị ai sửa? Sửa khi nào? Tại sao lại đổi giá trị?"*.

### 3 Nguyên tắc bất biến của Redux:
1. **Single Source of Truth:** Toàn bộ trạng thái ứng dụng được lưu giữ tại một Store duy nhất.
2. **State is Read-Only (Bất biến - Immutable):** Không bao giờ thay đổi trực tiếp biến state (`state.push(...)` là cấm kỵ). Cách duy nhất để đổi state là phát đi một **Action**.
3. **Thay đổi qua Pure Functions (Reducers):** State mới được sinh ra bằng hàm thuần khiết: `(oldState, action) => newState`.

---

## 2. Sơ đồ so sánh kiến trúc: Global Store (RxJS) vs SignalStore (Signals)

```
========================= CÁCH 1: GLOBAL STORE (REDUX) =========================
Component ──[dispatch(Action)]──> Reducer ──> Store ──[Selector (Observable)]──> Component
               │
               └──[Lắng nghe]──> Effect ──> HTTP API ──> [dispatch(Success)]──┘

========================= CÁCH 2: NGRX SIGNALSTORE ============================
Component ──[store.loadBlogs()]──> BlogStore (Methods / rxMethod)
                                        │
                                        ├── Gọi HTTP API
                                        └── patchState(...) ──[Signals: store.blogs()]──> UI tự render!
```

---

## 3. CÁCH 1: Triển khai với NgRx Global Store (Redux + RxJS)

Mô hình này là chuẩn mực cho các dự án **Enterprise quy mô lớn**, yêu cầu tính chặt chẽ cao, debug bằng **Redux DevTools** và audit toàn bộ hành động người dùng.

### 3.1. Cài đặt thư viện

```bash
npm install @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

---

### 3.2. Định nghĩa Model & State Interface

Tạo file: `src/app/state/blog-global/blog.model.ts`

```typescript
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

export interface BlogState {
  // Thay vì dùng mảng thông thường blogs: BlogPost[], ta dùng EntityState
  selectedBlogId: string | null;
  loading: boolean;
  error: string | null;
}
```

---

### 3.3. Định nghĩa Actions (`createActionGroup`)

Tạo file: `src/app/state/blog-global/blog.actions.ts`

```typescript
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { BlogPost } from './blog.model';

export const BlogActions = createActionGroup({
  source: 'Blog Page', // Định danh nguồn phát ra action (Action Hygiene)
  events: {
    // 1. Tải danh sách Blog
    'Load Blogs': emptyProps(),
    'Load Blogs Success': props<{ blogs: BlogPost[] }>(),
    'Load Blogs Failure': props<{ error: string }>(),

    // 2. Thêm bài viết mới
    'Add Blog': props<{ blog: Omit<BlogPost, 'id' | 'createdAt'> }>(),
    'Add Blog Success': props<{ blog: BlogPost }>(),
    'Add Blog Failure': props<{ error: string }>(),

    // 3. Xóa bài viết
    'Delete Blog': props<{ id: string }>(),
    'Delete Blog Success': props<{ id: string }>(),
    'Delete Blog Failure': props<{ error: string }>(),

    // 4. Chọn bài viết chi tiết
    'Select Blog': props<{ id: string }>(),
  },
});
```

---

### 3.4. Chuẩn hoá danh sách với `@ngrx/entity` (EntityAdapter)

Tại sao nên dùng `@ngrx/entity` thay vì lưu mảng `BlogPost[]`?
- Mảng thông thường: Khi cập nhật/xóa 1 phần tử, bạn phải dùng `Array.map()` hoặc `Array.filter()`, độ phức tạp là $O(N)$.
- `@ngrx/entity`: Lưu dưới dạng Normalized State `{ ids: ['1', '2'], entities: { '1': {...}, '2': {...} } }`. Tìm kiếm, cập nhật và xóa đạt tốc độ **$O(1)$**.

Tạo file: `src/app/state/blog-global/blog.reducer.ts`

```typescript
import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { BlogPost, BlogState } from './blog.model';
import { BlogActions } from './blog.actions';

// 1. Mở rộng EntityState: tự động có { ids: string[], entities: Dictionary<BlogPost> }
export interface State extends EntityState<BlogPost>, BlogState {}

// 2. Khởi tạo Entity Adapter
export const blogAdapter: EntityAdapter<BlogPost> = createEntityAdapter<BlogPost>({
  selectId: (blog: BlogPost) => blog.id,
  sortComparer: (a, b) => b.createdAt.localeCompare(a.createdAt), // Sắp xếp bài mới nhất lên đầu
});

// 3. State ban đầu
export const initialState: State = blogAdapter.getInitialState({
  selectedBlogId: null,
  loading: false,
  error: null,
});

// 4. Reducer Pure Function
export const blogReducer = createReducer(
  initialState,

  // Load Blogs
  on(BlogActions.loadBlogs, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) =>
    blogAdapter.setAll(blogs, { ...state, loading: false })
  ),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Add Blog
  on(BlogActions.addBlogSuccess, (state, { blog }) =>
    blogAdapter.addOne(blog, state)
  ),

  // Delete Blog
  on(BlogActions.deleteBlogSuccess, (state, { id }) =>
    blogAdapter.removeOne(id, state)
  ),

  // Select Blog
  on(BlogActions.selectBlog, (state, { id }) => ({
    ...state,
    selectedBlogId: id,
  }))
);
```

---

### 3.6. Tạo Selectors (`createSelector` với Memoization)

Tạo file: `src/app/state/blog-global/blog.selectors.ts`

```typescript
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, blogAdapter } from './blog.reducer';

// 1. Feature Selector
export const selectBlogFeatureState = createFeatureSelector<State>('blog');

// 2. Trích xuất 4 selectors dựng sẵn cực mạnh từ adapter:
// selectIds, selectEntities, selectAll, selectTotal
const { selectAll, selectEntities, selectTotal } = blogAdapter.getSelectors();

// Lấy toàn bộ danh sách bài viết dưới dạng mảng BlogPost[]
export const selectAllBlogs = createSelector(selectBlogFeatureState, selectAll);

// Lấy map entities dạng Dictionary { [id: string]: BlogPost }
export const selectBlogEntities = createSelector(selectBlogFeatureState, selectEntities);

// Đếm tổng số bài viết
export const selectTotalBlogs = createSelector(selectBlogFeatureState, selectTotal);

// Trạng thái Loading và Error
export const selectBlogLoading = createSelector(selectBlogFeatureState, (state) => state.loading);
export const selectBlogError = createSelector(selectBlogFeatureState, (state) => state.error);

// Lấy chi tiết bài viết đang được chọn
export const selectSelectedBlogId = createSelector(selectBlogFeatureState, (state) => state.selectedBlogId);
export const selectCurrentBlog = createSelector(
  selectBlogEntities,
  selectSelectedBlogId,
  (entities, selectedId) => (selectedId ? entities[selectedId] ?? null : null)
);
```

---

### 3.7. Tạo Effects xử lý API bất đồng bộ (`createEffect`)

Tạo file: `src/app/state/blog-global/blog.effects.ts`

```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap } from 'rxjs/operators';
import { BlogActions } from './blog.actions';
import { BlogPost } from './blog.model';

@Injectable()
export class BlogEffects {
  private actions$ = inject(Actions);
  private http = inject(HttpClient);

  // 1. Effect tải danh sách: Dùng switchMap để hủy request cũ nếu có request mới tới
  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      switchMap(() =>
        this.http.get<BlogPost[]>('/api/blogs').pipe(
          map((blogs) => BlogActions.loadBlogsSuccess({ blogs })),
          catchError((err) =>
            of(BlogActions.loadBlogsFailure({ error: err.message || 'Lỗi tải blog' }))
          )
        )
      )
    )
  );

  // 2. Effect thêm bài viết: Dùng mergeMap hoặc concatMap để không bỏ sót request
  addBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.addBlog),
      mergeMap(({ blog }) =>
        this.http.post<BlogPost>('/api/blogs', blog).pipe(
          map((newBlog) => BlogActions.addBlogSuccess({ blog: newBlog })),
          catchError((err) =>
            of(BlogActions.addBlogFailure({ error: err.message || 'Lỗi thêm blog' }))
          )
        )
      )
    )
  );

  // 3. Effect xoá bài viết
  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap(({ id }) =>
        this.http.delete(`/api/blogs/${id}`).pipe(
          map(() => BlogActions.deleteBlogSuccess({ id })),
          catchError((err) =>
            of(BlogActions.deleteBlogFailure({ error: err.message || 'Lỗi xoá blog' }))
          )
        )
      )
    )
  );
}
```

---

### 3.8. Đăng ký Store trong `main.ts` (Standalone Architecture)

Mở `src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { AppComponent } from './app/app.component';
import { blogReducer } from './app/state/blog-global/blog.reducer';
import { BlogEffects } from './app/state/blog-global/blog.effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    // 1. Đăng ký Feature Reducer
    provideStore({
      blog: blogReducer,
    }),
    // 2. Đăng ký Effects
    provideEffects([BlogEffects]),
    // 3. Bật Redux DevTools Extension trên trình duyệt
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
});
```

---

### 3.9. Sử dụng trong Component

Tạo component: `src/app/blog/blog-global-demo.component.ts`

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { BlogActions } from '../state/blog-global/blog.actions';
import {
  selectAllBlogs,
  selectBlogLoading,
  selectBlogError,
  selectTotalBlogs,
} from '../state/blog-global/blog.selectors';

@Component({
  selector: 'app-blog-global-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="blog-container">
      <h2>Quản Lý Blog (NgRx Global Store)</h2>

      <!-- Trạng thái Loading -->
      <p *ngIf="loading$ | async" class="loading">⏳ Đang tải danh sách bài viết...</p>

      <!-- Thông báo lỗi -->
      <p *ngIf="error$ | async as err" class="error">❌ Lỗi: {{ err }}</p>

      <p>Tổng số bài viết: <strong>{{ total$ | async }}</strong></p>

      <!-- Danh sách bài viết -->
      <div class="blog-grid" *ngIf="!(loading$ | async)">
        <div class="blog-card" *ngFor="let blog of blogs$ | async">
          <h3>{{ blog.title }}</h3>
          <p>{{ blog.content }}</p>
          <small>Tác giả: {{ blog.author }} | Ngày: {{ blog.createdAt }}</small>
          <button (click)="onDelete(blog.id)">🗑️ Xoá bài</button>
        </div>
      </div>

      <button class="btn-add" (click)="onAddNew()">+ Thêm bài viết mới</button>
    </div>
  `,
})
export class BlogGlobalDemoComponent implements OnInit {
  private store = inject(Store);

  // Kết nối dữ liệu qua Selectors (Observables)
  blogs$ = this.store.select(selectAllBlogs);
  loading$ = this.store.select(selectBlogLoading);
  error$ = this.store.select(selectBlogError);
  total$ = this.store.select(selectTotalBlogs);

  ngOnInit(): void {
    // Dispatch Action tải bài viết khi mở trang
    this.store.dispatch(BlogActions.loadBlogs());
  }

  onAddNew(): void {
    this.store.dispatch(
      BlogActions.addBlog({
        blog: {
          title: 'Học NgRx Global Store',
          content: 'Thành thạo Actions, Reducers, Selectors, Effects!',
          author: 'Cong Phu',
        },
      })
    );
  }

  onDelete(id: string): void {
    this.store.dispatch(BlogActions.deleteBlog({ id }));
  }
}
```

---

## 4. CÁCH 2: Triển khai với NgRx SignalStore (`@ngrx/signals`)

### 4.1. Tại sao SignalStore lại là xu hướng của Angular hiện đại?
- **Zero-Boilerplate:** Không cần tạo riêng file Action, Reducer, Selector, Effect. **Tất cả gom trong 1 file Store duy nhất!**
- **Native Angular Signals:** Tương thích 100% với Signal-based Change Detection của Angular 17/18/19/20+, cho tốc độ render siêu tốc, bỏ dần Zone.js.
- **Linh hoạt tuyệt đối:** Có thể dùng làm **Global Store** (cung cấp ở root) hoặc **Local Component Store** (gắn vào `providers` của component, tự hủy khi component unmount).

### 4.2. Cài đặt thư viện

```bash
npm install @ngrx/signals
```

---

### 4.3. Xây dựng `BlogStore` với `signalStore`

Tạo file: `src/app/state/blog-signals/blog.store.ts`

```typescript
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed } from '@angular/core';
import { pipe, of } from 'rxjs';
import { switchMap, tap, catchError } from 'rxjs/operators';
import { BlogPost } from '../blog-global/blog.model';

// 1. Định nghĩa State Interface
interface BlogSignalState {
  blogs: BlogPost[];
  selectedBlogId: string | null;
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

// 2. Khởi tạo State ban đầu
const initialBlogSignalState: BlogSignalState = {
  blogs: [],
  selectedBlogId: null,
  loading: false,
  error: null,
  searchTerm: '',
};

// 3. Khởi tạo Store với cú pháp Functional Composition
export const BlogStore = signalStore(
  { providedIn: 'root' }, // Đăng ký Global Singleton (hoặc bỏ dòng này nếu dùng Local Component)
  
  // A. Khởi tạo State
  withState(initialBlogSignalState),

  // B. Computed Signals (Tương đương Selectors có Memoization)
  withComputed((store) => ({
    // Đếm tổng số bài viết
    blogCount: computed(() => store.blogs().length),

    // Danh sách bài viết được lọc tự động theo từ khóa tìm kiếm
    filteredBlogs: computed(() => {
      const term = store.searchTerm().toLowerCase().trim();
      if (!term) return store.blogs();
      return store.blogs().filter(
        (b) => b.title.toLowerCase().includes(term) || b.content.toLowerCase().includes(term)
      );
    }),

    // Bài viết đang được chọn
    selectedBlog: computed(() => {
      const id = store.selectedBlogId();
      return store.blogs().find((b) => b.id === id) ?? null;
    }),
  })),

  // C. Methods (Tương đương Reducers + Effects + Actions)
  withMethods((store, http = inject(HttpClient)) => ({
    // Cập nhật từ khóa tìm kiếm (Đồng bộ)
    updateSearchTerm(term: string): void {
      patchState(store, { searchTerm: term });
    },

    // Chọn bài viết (Đồng bộ)
    selectBlog(id: string): void {
      patchState(store, { selectedBlogId: id });
    },

    // Xử lý API bất đồng bộ bằng rxMethod (Tương đương Effect)
    loadBlogs: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        switchMap(() =>
          http.get<BlogPost[]>('/api/blogs').pipe(
            tap((blogs) => patchState(store, { blogs, loading: false })),
            catchError((err) => {
              patchState(store, { error: err.message || 'Lỗi tải bài viết', loading: false });
              return of([]);
            })
          )
        )
      )
    ),

    // Thêm bài viết mới
    addBlog: rxMethod<Omit<BlogPost, 'id' | 'createdAt'>>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((newBlogData) =>
          http.post<BlogPost>('/api/blogs', newBlogData).pipe(
            tap((createdBlog) =>
              patchState(store, (state) => ({
                blogs: [createdBlog, ...state.blogs],
                loading: false,
              }))
            ),
            catchError((err) => {
              patchState(store, { error: err.message || 'Lỗi thêm bài', loading: false });
              return of(null);
            })
          )
        )
      )
    ),

    // Xóa bài viết
    deleteBlog: rxMethod<string>(
      pipe(
        switchMap((id) =>
          http.delete(`/api/blogs/${id}`).pipe(
            tap(() =>
              patchState(store, (state) => ({
                blogs: state.blogs.filter((b) => b.id !== id),
              }))
            ),
            catchError((err) => {
              patchState(store, { error: err.message || 'Lỗi xoá bài' });
              return of(null);
            })
          )
        )
      )
    ),
  }))
);
```

---

### 4.4. Đăng ký & Sử dụng `BlogStore` trong Component

Tạo component: `src/app/blog/blog-signal-demo.component.ts`

> [!TIP]
> **Điểm kỳ diệu của SignalStore:** Không cần dùng `async pipe`! Trong template, bạn chỉ cần gọi `store.blogs()`, `store.loading()` như hàm Signal bình thường. Giao diện tự động re-render chính xác vị trí thay đổi (Fine-grained Reactivity).

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogStore } from '../state/blog-signals/blog.store';

@Component({
  selector: 'app-blog-signal-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="blog-container">
      <h2>Quản Lý Blog (NgRx SignalStore - Angular Signals)</h2>

      <!-- Ô tìm kiếm bài viết -->
      <div class="search-box">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm bài viết..."
          [ngModel]="store.searchTerm()"
          (ngModelChange)="store.updateSearchTerm($event)"
        />
      </div>

      <!-- Trạng thái Loading -->
      <p *ngIf="store.loading()" class="loading">⏳ Đang tải dữ liệu qua Signals...</p>

      <!-- Thông báo lỗi -->
      <p *ngIf="store.error()" class="error">❌ Lỗi: {{ store.error() }}</p>

      <p>Tổng số bài viết: <strong>{{ store.blogCount() }}</strong></p>

      <!-- Danh sách bài viết đã lọc qua Computed Signal -->
      <div class="blog-grid" *ngIf="!store.loading()">
        <div class="blog-card" *ngFor="let blog of store.filteredBlogs()">
          <h3>{{ blog.title }}</h3>
          <p>{{ blog.content }}</p>
          <small>Tác giả: {{ blog.author }}</small>
          <button (click)="store.deleteBlog(blog.id)">🗑️ Xoá</button>
        </div>
      </div>

      <button class="btn-add" (click)="onAddNew()">+ Thêm Bài Mới</button>
    </div>
  `,
})
export class BlogSignalDemoComponent implements OnInit {
  // Inject Store trực tiếp — không cần đăng ký rườm rà trong main.ts
  readonly store = inject(BlogStore);

  ngOnInit(): void {
    // Gọi method tải bài viết
    this.store.loadBlogs();
  }

  onAddNew(): void {
    this.store.addBlog({
      title: 'Học NgRx SignalStore trong 5 phút',
      content: 'Không Action, không Reducer, tối ưu tuyệt đối với Angular Signals!',
      author: 'Cong Phu',
    });
  }
}
```

---

## 5. Bảng so sánh trực diện: Global Store vs SignalStore

| Tiêu chí so sánh | Cách 1: NgRx Global Store | Cách 2: NgRx SignalStore |
| :--- | :--- | :--- |
| **Công nghệ nền tảng** | **Redux + RxJS** (Observables) | **Angular Signals** (Fine-grained Reactivity) |
| **Số lượng file cần tạo** | 5 files (`actions`, `reducer`, `selectors`, `effects`, `model`) | **1 file duy nhất** (`blog.store.ts`) |
| **Lượng code (Boilerplate)** | Rất nhiều (Action constants, switch/on reducers) | **Cực kỳ ít (Zero Boilerplate)** |
| **Hiển thị trên Template UI** | Bắt buộc dùng `async pipe` (`blogs$ \| async`) | Gọi hàm Signal trực tiếp (`store.blogs()`) |
| **Change Detection** | Phụ thuộc vào Zone.js & RxJS streams | Hỗ trợ hoàn hảo **Zoneless Angular (Signals)** |
| **Phạm vi hoạt động (Scope)** | Bắt buộc là **Global Singleton** | Linh hoạt: Làm **Global Store** hoặc **Local Component Store** |
| **Công cụ Debug** | Rất mạnh: **Redux DevTools** (Time-traveling debugger) | Dùng console log, Angular DevTools (đang phát triển thêm plugin) |
| **Dự án phù hợp** | Hệ thống Ngân hàng, Viễn thông, Enterprise lớn nhiều team | **Hầu hết các dự án Angular hiện đại (v17 - v20+)** |

---

## 6. Các nguyên tắc sống còn & Best Practices

1. **Nguyên tắc "Action Hygiene" (Cho Global Store):**
   - Đặt tên theo mẫu: `[Tên Trang/Nguồn] Tên sự kiện`.
   - ✅ Chuẩn: `[Blog List Page] Click Delete Post`, `[Blog API] Load Success`.
   - ❌ Sai: `Set Data`, `Update Post` (không rõ ai gọi và gọi từ đâu).

2. **Luôn bảo toàn tính Bất biến (Immutability):**
   - Không bao giờ gán đè thuộc tính: `state.blogs[0].title = 'Mới'` (khiến UI không nhận ra thay đổi).
   - Luôn dùng toán tử spread `...` hoặc `patchState(store, ...)` của NgRx.

3. **Khi nào dùng Global Store vs SignalStore?**
   - Chọn **SignalStore**: Nếu bạn đang làm dự án mới với Angular 17 trở lên, muốn code ngắn gọn, dễ bảo trì, chạy nhanh và đón đầu xu hướng Zoneless.
   - Chọn **Global Store**: Nếu dự án của bạn đã có sẵn nền tảng NgRx Redux lâu năm, đội ngũ quen thuộc với RxJS và bắt buộc phải audit lịch sử thay đổi qua Redux DevTools.
