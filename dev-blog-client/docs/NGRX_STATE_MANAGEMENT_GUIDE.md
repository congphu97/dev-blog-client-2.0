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
7. [Hướng dẫn thực chiến: Triển khai Authentication Global Store (Dev Blog 2.0 Auth)](#7-hướng-dẫn-thực-chiến-triển-khai-authentication-global-store-dev-blog-20-auth)
   - [7.1. Cấu trúc thư mục & Sơ đồ luồng toàn diện](#71-cấu-trúc-thư-mục--sơ-đồ-luồng-toàn-diện)
   - [7.2. Định nghĩa Model & Chuẩn hoá dữ liệu với `@ngrx/entity`](#72-định-nghĩa-model--chuẩn-hoá-dữ-liệu-với-ngrxentity)
   - [7.3. Định nghĩa Actions (`createActionGroup`) & Giải thích cú pháp camelCase](#73-định-nghĩa-actions-createactiongroup--giải-thích-cú-pháp-camelcase)
   - [7.4. Xử lý Side Effects với NgRx Effects (`ofType`, `exhaustMap`, Navigation)](#74-xử-lý-side-effects-với-ngrx-effects-oftype-exhaustmap-navigation)
   - [7.5. Xây dựng Reducer & Feature Selector (`createFeature` + `extraSelectors`)](#75-xây-dựng-reducer--feature-selector-createfeature--extraselectors)
   - [7.6. Cấu hình `main.ts` & Giải thích chuyên sâu `maxAge: 25`, `logOnly`](#76-cấu-hình-maints--giải-thích-chuyên-sâu-maxage-25-logonly)
   - [7.7. Tích hợp vào `LoginComponent` & `HeaderComponent` (Signals & Observables)](#77-tích-hợp-vào-logincomponent--headercomponent-signals--observables)
   - [7.8. Bảng giải đáp thắc mắc thường gặp (FAQ)](#78-bảng-giải-đáp-thắc-mắc-thường-gặp-faq)
   - [7.9. Phiên bản SignalStore tương ứng (`src/app/store/signal/auth.signal-store.ts`)](#79-phiên-bản-signalstore-tương-ứng-srcappstoresignalauthsignal-storets)
8. [Cẩm nang toàn diện: Xây dựng & Sử dụng NgRx SignalStore (@ngrx/signals)](#8-cẩm-nang-toàn-diện-xây-dựng--sử-dụng-ngrx-signalstore-ngrxsignals)
   - [8.1. Triết lý thiết kế & Kiến trúc Lego (Plugin-based Architecture)](#81-triết-lý-thiết-kế--kiến-trúc-lego-plugin-based-architecture)
   - [8.2. Chi tiết 5 Mảnh ghép cốt lõi (withState, withEntities, withComputed, withMethods, withHooks)](#82-chi-tiết-5-mảnh-ghép-cốt-lõi-withstate-withentities-withcomputed-withmethods-withhooks)
   - [8.3. Cơ chế hoạt động của `patchState` (Immutable State Mutation)](#83-cơ-chế-hoạt-động-của-patchstate-immutable-state-mutation)
   - [8.4. Xử lý bất đồng bộ: `async/await` vs `rxMethod`](#84-xử-lý-bất-đồng-bộ-asyncawait-vs-rxmethod)
   - [8.5. Hướng dẫn từng bước tạo `AuthSignalStore`](#85-hướng-dẫn-từng-bước-tạo-authsignalstore)
   - [8.6. Hướng dẫn cách gọi & sử dụng SignalStore trong Component (TypeScript + Template HTML)](#86-hướng-dẫn-cách-gọi--sử-dụng-signalstore-trong-component-typescript--template-html)
   - [8.7. Bảng so sánh 10 tiêu chí: Global Store vs SignalStore](#87-bảng-so-sánh-10-tiêu-chí-global-store-vs-signalstore)

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

---

## 7. Hướng dẫn thực chiến: Triển khai Authentication Global Store (Dev Blog 2.0 Auth)

Đây là tài liệu chi tiết về toàn bộ kiến trúc **Authentication Global Store** đã được triển khai trực tiếp vào dự án `dev-blog-client-2.0`, kết hợp giữa:
- **NgRx Global Store** (`@ngrx/store` + `createFeature`)
- **Entity State Management** (`@ngrx/entity`)
- **Asynchronous Side Effects** (`@ngrx/effects`)
- **Tích hợp Angular Signals** (`store.selectSignal`) & **Redux DevTools**.

---

### 7.1. Cấu trúc thư mục & Sơ đồ luồng toàn diện

#### Cấu trúc thư mục Store:
```
dev-blog-client/src/app/store/auth/
├── auth.models.ts     # Interface AuthUser & AuthState extends EntityState<AuthUser>
├── auth.actions.ts    # Khai báo Action Groups dạng camelCase
├── auth.reducer.ts    # EntityAdapter, Reducer xử lý State, createFeature & extraSelectors
├── auth.effects.ts    # Effects gọi API AuthService, dispatch Success/Failure & chuyển trang
└── index.ts           # Barrel file export toàn bộ Store
```

#### Sơ đồ luồng hoạt động (Data Flow):
```
[User bấm Submit "Đăng nhập ngay"]
             │
             ▼
[LoginComponent: this.store.dispatch(AuthActions.login({ email, password }))]
             │
             ├───────────────────────────────────────────────────────┐
             ▼ (1. Lắng nghe qua ofType)                             ▼ (2. Reducer cập nhật)
    [AuthEffects.login$]                                     [authFeature.reducer]
             │                                                       │
             ▼ Gọi API Backend                                       ▼
  [AuthService.login()]                                     state.loading = true
             │ (delay 600ms giả lập HTTP)                            state.error = null
             ▼
  (Trả về AuthUser)
             │
             ▼ (3. Dispatch Action kết quả)
  [AuthActions.loginSuccess({ user })]
             │
             ├───────────────────────────────────────────────────────┐
             ▼                                                       ▼
   [AuthEffects.loginSuccess$]                               [authFeature.reducer]
             │ (delay 1s)                                            │
             ▼ (Tự động chuyển trang)                                ▼
   [router.navigate(['/blog'])]                             [authAdapter.upsertOne(user)]
                                                             state.selectedUserId = user.id
                                                             state.isAuthenticated = true
                                                             state.loading = false
                                                                     │
                                                                     ▼
                                                    [Header & Login Component re-render]
                                                    (Đọc qua store.selectSignal(selectUser))
```

---

### 7.2. Định nghĩa Model & Chuẩn hoá dữ liệu với `@ngrx/entity`

#### Tại sao lại dùng `@ngrx/entity` cho Auth?
Thay vì lưu một mảng user `users: AuthUser[]`, `@ngrx/entity` tự động chuyển đổi cấu trúc state thành dạng Dictionary (Normalized Data):
```typescript
{
  ids: ['usr_admin_01', 'usr_guest_02'],
  entities: {
    'usr_admin_01': { id: 'usr_admin_01', name: 'Phú Cường (Admin)', ... },
    'usr_guest_02': { id: 'usr_guest_02', name: 'Nguyễn Văn Đọc (Reader)', ... }
  },
  selectedUserId: 'usr_admin_01',
  isAuthenticated: true,
  loading: false,
  error: null
}
```
- **Tốc độ truy xuất O(1):** Tìm kiếm user đang đăng nhập qua `entities[selectedUserId]` tức thì trong $O(1)$, không cần duyệt mảng $O(n)$ bằng `.find()`.
- **Adapter CRUD chuẩn:** Cung cấp sẵn các hàm `addOne`, `upsertOne`, `setAll`, `updateOne`, `removeOne` mà không cần viết code sao chép mảng thủ công.

#### Mã nguồn `auth.models.ts`:
```typescript
import { EntityState } from '@ngrx/entity';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'reader';
  provider?: 'google' | 'github' | 'local';
  badge?: string;
}

export interface AuthState extends EntityState<AuthUser> {
  selectedUserId: string | null; // ID của user đang đăng nhập
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

---

### 7.3. Định nghĩa Actions (`createActionGroup`) & Giải thích cú pháp camelCase

#### Mã nguồn `auth.actions.ts`:
```typescript
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthUser } from './auth.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ email: string; password?: string }>(),
    loginSuccess: props<{ user: AuthUser }>(),
    loginFailure: props<{ error: string }>(),
    setTestAccount: props<{ account: AuthUser }>(),
    loadAccountsSuccess: props<{ accounts: AuthUser[] }>(),
    removeAccount: props<{ id: string }>(),
    logout: emptyProps(),
  },
});
```

#### Giải thích chuyên sâu: Cú pháp camelCase vs String có khoảng trắng
Trong `events` của `createActionGroup`, NgRx hỗ trợ cả 2 cách viết:

| Cách viết khai báo trong `events` | Tên hàm gọi trong TypeScript | Tên Action hiển thị trên Redux DevTools |
| :--- | :--- | :--- |
| **Cách 1 (camelCase):** `loginSuccess` | `AuthActions.loginSuccess(...)` | `[Auth] loginSuccess` |
| **Cách 2 (String có khoảng trắng):** `'Login Success'` | `AuthActions.loginSuccess(...)` | `[Auth] Login Success` |

**Vì sao viết camelCase NgRx vẫn tự hiểu?**
Bên trong mã nguồn của NgRx:
```javascript
function toActionName(eventName) {
  return eventName
    .trim()
    .split(' ')
    .map((word, i) => (i === 0 ? uncapitalize(word) : capitalize(word)))
    .join('');
}
```
- Khi truyền chuỗi `'Login Success'` có khoảng trắng, hàm tách từ và ghép thành `loginSuccess`.
- Khi truyền trực tiếp camelCase `loginSuccess`, do không có khoảng trắng nên nó giữ nguyên tên `loginSuccess`.
- Cả hai cách đều sinh ra hàm gọi `AuthActions.loginSuccess(...)` y hệt nhau. Viết camelCase giúp code đồng bộ, quen thuộc với cú pháp TypeScript và tránh gõ nhầm string.

---

### 7.4. Xử lý Side Effects với NgRx Effects (`ofType`, `exhaustMap`, Navigation)

#### Tại sao không gọi `AuthService` trực tiếp trong Component?
- **Nguyên tắc "Separation of Concerns":** Component chỉ nên chịu trách nhiệm hiển thị giao diện và nhận tương tác từ người dùng.
- Việc gọi API mạng, xử lý độ trễ, bắt lỗi và điều hướng trang là các tác vụ phụ (Side Effects) ➔ Cần đưa vào **NgRx Effects** để dễ bảo trì, tái sử dụng và kiểm thử (Unit Test).

#### Mã nguồn `auth.effects.ts`:
```typescript
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, tap, delay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Effect 1: Lắng nghe action Login -> Gọi API Backend -> Dispatch kết quả
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login), // 1. Lọc và chỉ bắt action Login
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(err =>
            of(AuthActions.loginFailure({ error: err?.message || 'Đăng nhập không thành công!' }))
          )
        )
      )
    )
  );

  /**
   * Effect 2: Khi Login Success -> Chờ 1s rồi chuyển hướng sang trang /blog
   * { dispatch: false } thông báo Effect này chỉ thực hiện Side Effect, không bắn action mới
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        delay(1000),
        tap(() => {
          this.router.navigate(['/blog']);
        })
      ),
    { dispatch: false }
  );
}
```

#### Giải thích cơ chế cốt lõi của Effect:
1. **Tên biến `login$` có tự động khớp action không?**
   - **HOÀN TOÀN KHÔNG!** Tên biến `login$` chỉ là tên thuộc tính do lập trình viên đặt (thêm `$` theo chuẩn RxJS). Bạn đặt là `handleLogin$` hay `doAuth$` thì Effect vẫn chạy bình thường.
   - Thứ thực sự "bắt" Action chính là toán tử:
     👉 **`ofType(AuthActions.login)`**!
   - `this.actions$` là một luồng (stream) phát ra **MỌI** action của toàn app. `ofType` đóng vai trò là chiếc màng lọc (filter): chỉ khi nào action phát ra là `AuthActions.login` thì nó mới cho đi qua để kích hoạt code phía dưới.
2. **Tại sao lại dùng `exhaustMap` thay vì `switchMap` hay `mergeMap`?**
   - `exhaustMap` bỏ qua mọi lần click mới nếu lần gọi API trước đó chưa hoàn thành.
   - Điều này giúp **chống click đúp (double-click) hoặc spam submit form login**, ngăn ngừa việc gửi 2-3 request đăng nhập trùng lặp lên server cùng lúc!

---

### 7.5. Xây dựng Reducer & Feature Selector (`createFeature` + `extraSelectors`)

#### Mã nguồn `auth.reducer.ts`:
```typescript
import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, AuthUser } from './auth.models';
import { AuthActions } from './auth.actions';

// 1. Tạo Adapter Entity cho AuthUser
export const authAdapter: EntityAdapter<AuthUser> = createEntityAdapter<AuthUser>({
  selectId: (user: AuthUser) => user.id,
  sortComparer: false,
});

const getInitialUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('dev_blog_auth_user') || localStorage.getItem('dev_blog_oauth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

// 2. State ban đầu với authAdapter.getInitialState()
export const initialAuthState: AuthState = authAdapter.getInitialState({
  selectedUserId: initialUser ? initialUser.id : null,
  isAuthenticated: !!initialUser,
  loading: false,
  error: null,
  ...(initialUser
    ? {
        ids: [initialUser.id],
        entities: { [initialUser.id]: initialUser },
      }
    : { ids: [], entities: {} }),
});

const { selectAll, selectTotal } = authAdapter.getSelectors();

// 3. Khai báo Feature Reducer
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.login, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Lưu/Cập nhật user vào Dictionary Entity bằng adapter.upsertOne
    on(AuthActions.loginSuccess, (state, { user }) => {
      try {
        localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));
      } catch {}

      return authAdapter.upsertOne(user, {
        ...state,
        selectedUserId: user.id,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    }),
    on(AuthActions.setTestAccount, (state, { account }) => {
      try {
        localStorage.setItem('dev_blog_auth_user', JSON.stringify(account));
      } catch {}

      return authAdapter.upsertOne(account, {
        ...state,
        selectedUserId: account.id,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    }),
    on(AuthActions.loadAccountsSuccess, (state, { accounts }) =>
      authAdapter.setAll(accounts, state)
    ),
    on(AuthActions.removeAccount, (state, { id }) =>
      authAdapter.removeOne(id, state)
    ),
    on(AuthActions.logout, state => {
      try {
        localStorage.removeItem('dev_blog_auth_user');
        localStorage.removeItem('dev_blog_oauth_user');
      } catch {}

      return {
        ...state,
        selectedUserId: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    })
  ),
  // 4. Các Selectors nâng cao (Extra Selectors)
  extraSelectors: ({ selectAuthState, selectEntities: selectFeatureEntities, selectSelectedUserId }) => ({
    // Truy vấn O(1) lấy user đang đăng nhập
    selectUser: createSelector(
      selectFeatureEntities,
      selectSelectedUserId,
      (entities, selectedUserId) => (selectedUserId ? entities[selectedUserId] ?? null : null)
    ),
    // Lấy danh sách toàn bộ các user
    selectAllUsers: createSelector(selectAuthState, selectAll),
    // Lấy tổng số user đã lưu
    selectTotalUsers: createSelector(selectAuthState, selectTotal),
  }),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectUser,
  selectAllUsers,
  selectTotalUsers,
  selectEntities: selectAuthEntities,
  selectIds: selectAuthIds,
  selectIsAuthenticated,
  selectLoading,
  selectError,
  selectSelectedUserId,
} = authFeature;
```

---

### 7.6. Cấu hình `main.ts` & Giải thích chuyên sâu `maxAge: 25`, `logOnly`

#### Mã nguồn `src/main.ts`:
```typescript
import { isDevMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { I18nTranslateModule } from 'ngc-library';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authFeature, AuthEffects } from './app/store/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
      [authFeature.name]: authFeature.reducer, // 👈 Đăng ký nhánh Auth vào Global Store
    }),
    provideEffects(AuthEffects),               // 👈 Đăng ký Effect xử lý API & Navigation
    provideStoreDevtools({
      maxAge: 25,                             // 👈 Giới hạn số lượng snapshot lịch sử
      logOnly: !isDevMode()                   // 👈 Bảo mật trên Production
    }),
    importProvidersFrom(I18nTranslateModule)
  ],
});
```

#### Giải thích chi tiết các thông số trong `provideStoreDevtools`:

#### 1. `maxAge: 25` là gì?
- **Định nghĩa:** `maxAge` quy định **số lượng Action và State Snapshot tối đa** mà Redux DevTools lưu trữ trong bộ nhớ lịch sử (History).
- **Cơ chế hoạt động:**
  - Mỗi khi một action được dispatch, DevTools chụp lại toàn bộ State lúc đó (để bạn có thể bấm nút tua ngược thời gian - Time Travel Debugging).
  - Khi ứng dụng dispatch đến action thứ 26: Action cũ nhất (action số 1) sẽ tự động bị xoá khỏi bộ nhớ để nhường chỗ cho action mới.
- **Tại sao cần có `maxAge`?**
  - **Chống tràn RAM (Memory Leak):** Nếu không giới hạn `maxAge`, khi ứng dụng chạy lâu hoặc có các action phát liên tục (như gõ phím, cuộn trang, WebSocket, polling timer...), DevTools sẽ lưu trữ hàng ngàn state snapshots ➔ Khiến trình duyệt ngốn cả GB RAM, bị giật lag và đơ tab.
  - Con số `25` là giá trị mặc định được khuyến nghị của NgRx: vừa đủ để lập trình viên xem lại và debug chuỗi sự kiện gần nhất mà không làm nặng máy. Bạn có thể tăng lên `50` hoặc `100` khi cần debug luồng phức tạp.

#### 2. `logOnly: !isDevMode()` là gì?
- `isDevMode()` là hàm của Angular trả về `true` khi đang chạy local (`ng serve`) và `false` khi build production (`ng build`).
- Khi ở môi trường **Development** (`!isDevMode() === false`): `logOnly = false` ➔ Cho phép toàn quyền tương tác với Redux DevTools: tua ngược thời gian (Time-travel), Dispatch action test trực tiếp từ DevTools, can thiệp State.
- Khi ở môi trường **Production** (`!isDevMode() === true`): `logOnly = true` ➔ DevTools chỉ ở chế độ đọc log đơn thuần (Read-only), ngăn chặn người dùng ngoài production mở DevTools để sửa đổi State của ứng dụng (bảo mật dữ liệu).

---

### 7.7. Tích hợp vào `LoginComponent` & `HeaderComponent` (Signals & Observables)

#### Trong [`src/app/auth/login/login.component.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/src/app/auth/login/login.component.ts):
Component chỉ làm nhiệm vụ dispatch action và đọc state từ Store:

```typescript
export class LoginComponent {
  private store = inject(Store);

  // Đọc State từ NgRx Store bằng Signal (tự động re-render, không cần async pipe)
  public authUser = this.store.selectSignal(authFeature.selectUser);
  public isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);
  public isStoreLoading = this.store.selectSignal(authFeature.selectLoading);
  public storeError = this.store.selectSignal(authFeature.selectError);

  // (Hoặc nếu muốn dùng Observable truyền thống:
  // public authUser$ = this.store.select(authFeature.selectUser);)

  public onLogin(event: Event) {
    event.preventDefault();
    const emailVal = this.email().trim();
    const passVal = this.password().trim();

    // 👉 CHỈ 1 DÒNG DUY NHẤT: Bắn action Login
    // AuthEffects sẽ tự bắt -> gọi AuthService.login() -> cập nhật State -> chuyển sang /blog!
    this.store.dispatch(AuthActions.login({ email: emailVal, password: passVal }));
  }
}
```

#### Trong [`src/app/header/header.component.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/src/app/header/header.component.ts):
Header lắng nghe user từ NgRx Store để hiển thị tên và avatar:

```typescript
export class HeaderComponent {
  private store = inject(Store);
  public authUser = this.store.selectSignal(authFeature.selectUser);

  public onLogout() {
    this.store.dispatch(AuthActions.logout());
  }
}
```

---

### 7.8. Bảng giải đáp thắc mắc thường gặp (FAQ)

| Câu hỏi | Câu trả lời tóm tắt |
| :--- | :--- |
| **Dùng `store.selectSignal(...)` có phải là NgRx SignalStore không?** | **Không.** Đây vẫn là **NgRx Global Store truyền thống (chuẩn Redux)**. `selectSignal()` chỉ là hàm tiện ích giúp bọc Observable thành Signal để template HTML gọi `user()` không cần `\| async` pipe. |
| **Tại sao action trong `events` viết camelCase mà NgRx vẫn hiểu?** | Hàm `createActionGroup` tự động chuẩn hoá tên. Viết `'Login Success'` hay `loginSuccess` thì hàm trong TypeScript đều là `AuthActions.loginSuccess(...)`. |
| **Tên biến Effect (`login$`) có cần phải giống tên Action không?** | **Không.** Tên biến đặt là gì cũng được (`handleLogin$`, `auth$`). Thứ quyết định bắt action nào là hàm `ofType(AuthActions.login)` bên trong. |
| **Tại sao nên dùng `exhaustMap` trong Effect Login?** | Để chống spam submit hoặc double-click của người dùng: khi một request login đang chạy thì các click tiếp theo sẽ bị bỏ qua. |
| **Ý nghĩa của `{ dispatch: false }` trong Effect?** | Dùng cho các Effect chỉ thực hiện Side Effect ngoài lề (như `router.navigate()`, ghi log, alert) mà **không sinh ra action mới**, tránh việc NgRx báo lỗi lặp vô tận (infinite loop). |
| **Tại sao cấu hình `maxAge: 25` trong DevTools?** | Giới hạn chỉ lưu 25 state snapshot gần nhất trong lịch sử Redux DevTools nhằm **chống rò rỉ bộ nhớ (Memory Leak)** và tránh làm đơ trình duyệt khi app chạy lâu. |

---

### 7.9. Phiên bản SignalStore tương ứng: `src/app/store/signal/auth.signal-store.ts`

Để bạn thấy rõ sự khác biệt giữa hai trường phái, toàn bộ tính năng Authentication ở trên đã được viết lại bằng **NgRx SignalStore** chỉ trong **1 file duy nhất** tại [`src/app/store/signal/auth.signal-store.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/src/app/store/signal/auth.signal-store.ts):

#### So sánh trực diện số lượng file:
- **Global Store (`src/app/store/auth/`):** 5 files (`models`, `actions`, `reducer`, `effects`, `index`), phải đăng ký `provideStore`, `provideEffects` trong `main.ts`.
- **SignalStore (`src/app/store/signal/`):** **1 file duy nhất**, không cần Action constants, không cần Reducer switch/on, không cần Effect tách rời!

#### Mã nguồn `auth.signal-store.ts`:
```typescript
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { withEntities, setAllEntities, upsertEntity, removeEntity } from '@ngrx/signals/entities';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../auth/auth.models';

export interface AuthSignalState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthSignalState: AuthSignalState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthSignalStore = signalStore(
  { providedIn: 'root' }, // Singleton dùng toàn app như Service

  // 1. State
  withState(initialAuthSignalState),

  // 2. Entity Management
  withEntities<AuthUser>(),

  // 3. Computed Signals (thay thế Selectors)
  withComputed((store) => ({
    isAdmin: computed(() => store.user()?.role === 'admin'),
    displayNameWithBadge: computed(() => {
      const u = store.user();
      if (!u) return 'Khách vãng lai';
      return `${u.name} ${u.badge ? `(${u.badge})` : ''}`;
    }),
    totalSavedAccounts: computed(() => store.entities().length),
  })),

  // 4. Methods (thay thế Actions + Reducers + Effects)
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    // Gọi API đăng nhập trực tiếp bằng async / await
    async login(email: string, password?: string): Promise<boolean> {
      patchState(store, { loading: true, error: null });

      try {
        const user = await firstValueFrom(authService.login(email, password));

        // Cập nhật State & Entity collection đồng thời
        patchState(
          store,
          {
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          },
          upsertEntity(user)
        );

        localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));

        setTimeout(() => {
          router.navigate(['/blog']);
        }, 1000);

        return true;
      } catch (err: any) {
        patchState(store, {
          loading: false,
          error: err?.message || 'Đăng nhập không thành công!',
        });
        return false;
      }
    },

    setAccount(account: AuthUser): void {
      patchState(
        store,
        { user: account, isAuthenticated: true },
        upsertEntity(account)
      );
    },

    logout(): void {
      localStorage.removeItem('dev_blog_auth_user');
      patchState(store, {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    },
  })),

  // 5. Hooks vòng đời
  withHooks({
    onInit(store) {
      try {
        const raw = localStorage.getItem('dev_blog_auth_user');
        if (raw) {
          const user: AuthUser = JSON.parse(raw);
          patchState(store, { user, isAuthenticated: true }, upsertEntity(user));
        }
      } catch {}
    },
  })
);
```

#### Cách sử dụng `AuthSignalStore` trong Component:
```typescript
import { Component, inject } from '@angular/core';
import { AuthSignalStore } from '../store/signal';

@Component({
  selector: 'app-demo-signal-auth',
  standalone: true,
  template: `
    <div *ngIf="authStore.loading()">Đang đăng nhập...</div>
    <div *ngIf="authStore.user(); as user">
      Xin chào, {{ authStore.displayNameWithBadge() }}!
      <button (click)="authStore.logout()">Đăng xuất</button>
    </div>
  `,
})
export class DemoSignalAuthComponent {
  // Inject Store trực tiếp — không cần Store.dispatch hay provideStore rườm rà
  readonly authStore = inject(AuthSignalStore);

  onLogin() {
    this.authStore.login('phu.cuong@gmail.com', 'password123');
  }
}
```

---

## 8. Cẩm nang toàn diện: Xây dựng & Sử dụng NgRx SignalStore (@ngrx/signals)

NgRx SignalStore là giải pháp quản lý trạng thái chính thức được đội ngũ NgRx phát triển từ Angular 16+ trở đi, nhằm tận dụng tối đa sức mạnh phản ứng tức thì (Fine-grained Reactivity) của **Angular Signals**.

---

### 8.1. Triết lý thiết kế & Kiến trúc Lego (Plugin-based Architecture)

#### 1. Tại sao SignalStore lại ra đời?
- **Global Store truyền thống (Redux):** Quá nhiều file rườm rà (Action constants, Action Creators, Reducers, Effects, Selectors, Module/Standalone registration). Người mới tiếp cận thường bị rối ("Tại sao chỉ lưu một biến mà phải tạo 5 file?").
- **SignalStore:** Giải quyết triệt để vấn đề này với triết lý **Zero Boilerplate**. Toàn bộ logic được gom vào một **Store thuần khiết (Composable Object)**, dễ đọc, dễ viết như một Angular Service thông thường nhưng mạnh mẽ gấp nhiều lần.

#### 2. Kiến trúc Lego (Plugin Extensibility):
Hàm `signalStore(...)` nhận vào các mảnh ghép (Features) như xếp hình Lego:
```typescript
export const MyStore = signalStore(
  withState(...),     // Mảnh 1: State
  withEntities(...),  // Mảnh 2: Quản lý danh sách
  withComputed(...),  // Mảnh 3: Dữ liệu phái sinh
  withMethods(...),   // Mảnh 4: Xử lý logic & API
  withHooks(...)      // Mảnh 5: Vòng đời Store
);
```

#### 3. Phạm vi hoạt động linh hoạt (Global vs Local Scope):
- **Global Store Singleton (dùng chung toàn app):**
  Thêm `{ providedIn: 'root' }` vào tham số đầu tiên:
  ```typescript
  export const AuthSignalStore = signalStore({ providedIn: 'root' }, ...);
  ```
- **Local Store (Gắn liền với vòng đời Component):**
  Bỏ `{ providedIn: 'root' }` và đăng ký vào mảng `providers` của Component:
  ```typescript
  @Component({
    selector: 'app-user-profile',
    providers: [UserProfileStore], // 👈 Khi Component bị hủy, Store cũng tự động hủy theo
  })
  export class UserProfileComponent {}
  ```

---

### 8.2. Chi tiết 5 Mảnh ghép cốt lõi

#### Mảnh 1: `withState(...)` — Khai báo trạng thái
- Định nghĩa các thuộc tính dữ liệu của Store.
- **Tính năng tự động đặc biệt:** SignalStore tự động sinh ra một **Signal chỉ đọc (Readonly Signal)** cho từng thuộc tính:
  ```typescript
  withState({
    user: null as AuthUser | null,
    loading: false,
  })
  // ➔ Tự động sinh ra 2 Signal: store.user() và store.loading()
  ```

#### Mảnh 2: `withEntities<T>()` — Quản lý danh sách (Collection Management)
- Nằm trong package `@ngrx/signals/entities`.
- Tự động chuẩn hoá dữ liệu theo chuẩn Dictionary:
  - `store.ids()`: Mảng danh sách ID (`Signal<string[] | number[]>`).
  - `store.entities()`: Bản đồ ID ➔ Object (`Signal<Record<string, T>>`).
  - `store.entityMap()`: Tương tự `entities()`.
- Cung cấp sẵn các mutation helper tối ưu:
  - `addEntity(item)` / `addEntities([items])`
  - `upsertEntity(item)` / `upsertEntities([items])`: Thêm mới hoặc cập nhật nếu đã tồn tại.
  - `updateEntity({ id, changes })`
  - `removeEntity(id)` / `removeEntities([ids])`
  - `setAllEntities([items])`: Xoá sạch cũ và nạp danh sách mới.

#### Mảnh 3: `withComputed(...)` — Dữ liệu phái sinh (Computed Signals)
- Thay thế hoàn toàn cho các hàm `createSelector(...)` dài dòng của NgRx cũ.
- Dùng hàm `computed()` chuẩn của Angular:
  ```typescript
  withComputed((store) => ({
    isAdmin: computed(() => store.user()?.role === 'admin'),
    hasError: computed(() => !!store.error()),
  }))
  ```
- **Cơ chế Memoization tự nhiên:** `computed()` chỉ chạy lại phép tính khi các Signal mà nó phụ thuộc bị thay đổi giá trị. Nếu state không đổi, nó trả về kết quả đã cache ngay lập tức.

#### Mảnh 4: `withMethods(...)` — Logic nghiệp vụ & Gọi API
- Thay thế hoàn toàn cho sự kết hợp rườm rà giữa **Action + Reducer + Effect**.
- Được phép `inject()` các Service bên ngoài (`AuthService`, `Router`, `HttpClient`...):
  ```typescript
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    // Viết các hàm logic ở đây
  }))
  ```

#### Mảnh 5: `withHooks(...)` — Vòng đời của Store
- Cung cấp 2 hook chính:
  - `onInit(store)`: Chạy ngay khi Store vừa được khởi tạo (thích hợp để nạp data ban đầu từ `localStorage` hoặc gọi API khởi động).
  - `onDestroy(store)`: Chạy khi Store bị hủy (thích hợp để ngắt kết nối WebSocket, huỷ subscription, dọn dẹp timer).

---

### 8.3. Cơ chế hoạt động của `patchState` (Immutable State Mutation)

Hàm `patchState(store, ...)` là công cụ duy nhất để cập nhật State trong SignalStore.

#### 1. Cập nhật một phần dữ liệu (Partial Update):
Không cần phải sao chép toàn bộ state cũ (`...state`), `patchState` tự động merge:
```typescript
patchState(store, { loading: true, error: null });
```

#### 2. Kết hợp với Entity Mutation:
Bạn có thể cập nhật vừa state thông thường vừa cập nhật entity trong cùng một lệnh:
```typescript
patchState(
  store,
  { user: newUser, isAuthenticated: true, loading: false },
  upsertEntity(newUser) // 👈 Cập nhật luôn cả collection entity!
);
```

#### 3. Cập nhật dựa trên giá trị state hiện tại (Updater Callback):
```typescript
patchState(store, (state) => ({
  retryCount: state.retryCount + 1
}));
```

---

### 8.4. Xử lý bất đồng bộ: `async/await` vs `rxMethod`

Trong `withMethods`, bạn có 2 lựa chọn để xử lý API bất đồng bộ:

#### Lựa chọn 1: Dùng `async / await` (Khuyên dùng cho hầu hết trường hợp)
- Cực kỳ đơn giản, ai đọc cũng hiểu ngay.
- Sử dụng hàm `firstValueFrom` của RxJS để biến Observable thành Promise:
```typescript
async login(email: string, password?: string) {
  patchState(store, { loading: true });

  try {
    const user = await firstValueFrom(authService.login(email, password));
    patchState(store, { user, loading: false });
    router.navigate(['/blog']);
  } catch (err: any) {
    patchState(store, { loading: false, error: err.message });
  }
}
```

#### Lựa chọn 2: Dùng `rxMethod` (Khi cần sức mạnh của RxJS Operators)
- Nằm trong package `@ngrx/signals/rxjs-interop`.
- Phù hợp cho các bài toán phức tạp:
  - **Chống spam click submit:** dùng `exhaustMap`.
  - **Autocomplete Search:** dùng `debounceTime(300)` + `distinctUntilChanged()` + `switchMap`.
```typescript
loginWithRx: rxMethod<{ email: string; password?: string }>(
  pipe(
    tap(() => patchState(store, { loading: true })),
    exhaustMap(({ email, password }) =>
      authService.login(email, password).pipe(
        tap((user) => {
          patchState(store, { user, loading: false });
          router.navigate(['/blog']);
        }),
        catchError((err) => {
          patchState(store, { loading: false, error: err.message });
          return of(null);
        })
      )
    )
  )
)
```

---

### 8.5. Hướng dẫn từng bước tạo `AuthSignalStore`

Tạo file [`src/app/store/signal/auth.signal-store.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/src/app/store/signal/auth.signal-store.ts):

```typescript
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withState, withComputed, withMethods, withHooks, patchState } from '@ngrx/signals';
import { withEntities, upsertEntity, removeEntity, setAllEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, of, firstValueFrom } from 'rxjs';
import { exhaustMap, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../auth/auth.models';

export interface AuthSignalState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthSignalState: AuthSignalState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const AuthSignalStore = signalStore(
  { providedIn: 'root' },

  withState(initialAuthSignalState),
  withEntities<AuthUser>(),

  withComputed((store) => ({
    isAdmin: computed(() => store.user()?.role === 'admin'),
    displayNameWithBadge: computed(() => {
      const u = store.user();
      if (!u) return 'Khách vãng lai';
      return `${u.name} ${u.badge ? `(${u.badge})` : ''}`;
    }),
    totalSavedAccounts: computed(() => store.entities().length),
  })),

  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    async login(email: string, password?: string): Promise<boolean> {
      patchState(store, { loading: true, error: null });

      try {
        const user = await firstValueFrom(authService.login(email, password));

        patchState(
          store,
          { user, isAuthenticated: true, loading: false, error: null },
          upsertEntity(user)
        );

        localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));
        setTimeout(() => router.navigate(['/blog']), 1000);
        return true;
      } catch (err: any) {
        patchState(store, { loading: false, error: err?.message || 'Đăng nhập không thành công!' });
        return false;
      }
    },

    setAccount(account: AuthUser): void {
      patchState(
        store,
        { user: account, isAuthenticated: true, loading: false, error: null },
        upsertEntity(account)
      );
      localStorage.setItem('dev_blog_auth_user', JSON.stringify(account));
    },

    logout(): void {
      localStorage.removeItem('dev_blog_auth_user');
      patchState(store, { user: null, isAuthenticated: false, loading: false, error: null });
    },
  })),

  withHooks({
    onInit(store) {
      try {
        const raw = localStorage.getItem('dev_blog_auth_user');
        if (raw) {
          const user: AuthUser = JSON.parse(raw);
          patchState(store, { user, isAuthenticated: true }, upsertEntity(user));
        }
      } catch {}
    },
  })
);
```

---

### 8.6. Hướng dẫn cách gọi & sử dụng SignalStore trong Component (TypeScript + Template HTML)

#### 1. Trong file TypeScript:
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthSignalStore } from '../../store/signal';

@Component({
  selector: 'app-login-demo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-demo.component.html'
})
export class LoginDemoComponent {
  // 1. Inject Store trực tiếp như Service thông thường:
  public authStore = inject(AuthSignalStore);

  public email = 'phu.cuong@gmail.com';
  public password = 'Developer@2026';

  // 2. Gọi Method khi submit:
  public onSubmit() {
    this.authStore.login(this.email, this.password);
  }

  // 3. Đăng xuất:
  public onLogout() {
    this.authStore.logout();
  }
}
```

#### 2. Trong Template HTML:
```html
<div class="auth-box">
  <!-- Kiểm tra trạng thái Loading -->
  @if (authStore.loading()) {
    <div class="loading-bar">⏳ Đang xác thực tài khoản...</div>
  }

  <!-- Hiển thị Lỗi nếu có -->
  @if (authStore.error()) {
    <div class="alert-error">⚠️ {{ authStore.error() }}</div>
  }

  <!-- Hiển thị thông tin User sau khi đăng nhập thành công -->
  @if (authStore.user(); as user) {
    <div class="user-card">
      <img [src]="user.avatar" class="avatar" />
      <h3>{{ authStore.displayNameWithBadge() }}</h3>
      <p>Email: {{ user.email }}</p>

      @if (authStore.isAdmin()) {
        <span class="role-tag">👑 Quản trị hệ thống</span>
      }

      <p>Tổng tài khoản đã lưu: {{ authStore.totalSavedAccounts() }}</p>

      <button type="button" class="btn-logout" (click)="onLogout()">Đăng Xuất</button>
    </div>
  } @else {
    <!-- Form đăng nhập -->
    <form (submit)="onSubmit()">
      <input type="email" [(ngModel)]="email" name="email" placeholder="Email..." required />
      <input type="password" [(ngModel)]="password" name="password" placeholder="Mật khẩu..." required />

      <button type="submit" [disabled]="authStore.loading()">
        {{ authStore.loading() ? 'Đang đăng nhập...' : 'Đăng nhập ngay →' }}
      </button>
    </form>
  }
</div>
```

---

### 8.7. Bảng so sánh 10 tiêu chí: Global Store vs SignalStore

| Tiêu chí | NgRx Global Store (Cũ) | NgRx SignalStore (Hiện đại) |
| :--- | :--- | :--- |
| **1. Mô hình kiến trúc** | Redux thuần túy (Event Broker) | Functional Reactive Store (Plugin Lego) |
| **2. Số lượng file cần tạo** | 4 - 5 files (`actions`, `reducer`, `effects`, `selectors`...) | **1 file duy nhất** |
| **3. Khối lượng code (Boilerplate)** | Rất nhiều (Action constants, switch/on) | **Gần như bằng 0 (Zero Boilerplate)** |
| **4. Cú pháp đọc dữ liệu** | `store.select(selector) \| async` | `store.prop()` (Gọi hàm Signal `()`) |
| **5. Cơ chế xử lý Async API** | Bắt buộc dùng `@ngrx/effects` (`createEffect`) | Gọi thẳng bằng `async / await` hoặc `rxMethod` |
| **6. Quản lý danh sách (Entities)** | Dùng `@ngrx/entity` riêng biệt | Tích hợp sẵn `withEntities()` cực nhẹ |
| **7. Change Detection** | Phụ thuộc Zone.js & RxJS streams | Hỗ trợ tự nhiên cho **Zoneless Angular** |
| **8. Khả năng tái sử dụng (Scope)** | Bắt buộc là **Global Singleton** | Linh hoạt: Làm **Global Store** hoặc **Local Store** |
| **9. Dễ học (Learning Curve)** | Khó, cần nắm vững RxJS & Redux | **Rất dễ**, trực quan như gọi hàm Service |
| **10. Công cụ Debug** | Redux DevTools (Time-traveling) | Angular DevTools, Console inspection |


