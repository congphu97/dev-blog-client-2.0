# CẨM NANG ÔN TẬP TOÀN DIỆN ANGULAR, RXJS & SIGNALS (ANGULAR v16 – v22+)

> Tài liệu chuẩn hóa cấu trúc kiến thức chuyên sâu của Angular, RxJS, Dependency Injection, Custom Form Control, Signals và Asynchronous State Management.
> Phân định tường minh giữa **Legacy (Cũ / Decorator & Zone.js)** và **Modern (Mới / Signal-based, Functional APIs & Kỷ nguyên Zoneless)**.

---

## 📌 MỤC LỤC TỔNG QUAN (TABLE OF CONTENTS)

- [A. ANGULAR CORE](#a-angular-core)
  - [1. Component Lifecycle Hooks](#1-component-lifecycle-hooks)
  - [2. ViewEncapsulation (Bao Đóng Style CSS)](#2-viewencapsulation-bao-đóng-style-css)
  - [3. Component Interaction (Truyền Dữ Liệu Component)](#3-component-interaction-truyền-dữ-liệu-component)
  - [4. Directives: 3 Loại & Custom Directive Thực Chiến](#4-directives-3-loại--custom-directive-thực-chiến)
  - [5. Pipes & Pure vs Impure Pipe](#5-pipes--pure-vs-impure-pipe)
  - [6. Change Detection Strategy: NgZone vs Zoneless Toàn Diện](#6-change-detection-strategy-ngzone-vs-zoneless-toàn-diện)
  - [7. Sự Tiến Hóa Của Forms Trong Angular](#7-sự-tiến-hóa-của-forms-trong-angular)
  - [8. Templates Đặc Biệt, Router Binding & Lazy Loading Toàn Diện (Defer Blocks, Preloading Strategies)](#8-templates-đặc-biệt-router-binding--lazy-loading-toàn-diện-defer-blocks-preloading-strategies)
  - [9. Compilation: JIT vs AOT (Ivy Engine)](#9-compilation-jit-vs-aot-ivy-engine)
  - [10. View Queries vs Content Queries](#10-view-queries-vs-content-queries)
- [B. RXJS & XỬ LÝ BẤT ĐỒNG BỘ CHUYÊN SÂU](#b-rxjs--xử-lý-bất-đồng-bộ-chuyên-sâu)
  - [11. Các Khái Niệm Cốt Lõi Của RxJS](#11-các-khái-niệm-cốt-lõi-của-rxjs)
  - [12. Phân Biệt Tường Tận 4 Loại Subject: `Subject` vs `BehaviorSubject` vs `ReplaySubject` vs `AsyncSubject`](#12-phân-biệt-tường-tận-4-loại-subject-subject-vs-behaviorsubject-vs-replaysubject-vs-asyncsubject)
  - [13. Các Toán Tử Kết Hợp (Combination Operators)](#13-các-toán-tử-kết-hợp-combination-operators)
  - [14. Phân Biệt Chuyên Sâu 4 Toán Tử Biến Đổi: `switchMap` vs `concatMap` vs `mergeMap` vs `exhaustMap`](#14-phân-biệt-chuyên-sâu-4-toán-tử-biến-đổi-switchmap-vs-concatmap-vs-mergemap-vs-exhaustmap)
  - [15. Kỹ Thuật Giải Phóng Bộ Nhớ (Unsubscribe)](#15-kỹ-thuật-giải-phóng-bộ-nhớ-unsubscribe)
- [C. DEPENDENCY INJECTION (DI) & PROVIDERS CHUYÊN SÂU](#c-dependency-injection-di--providers-chuyên-sâu)
  - [16. Cơ Chế Hoạt Động Của DI & Functional `inject()`](#16-cơ-chế-hoạt-động-của-di--functional-inject)
  - [17. Phân Biệt Toàn Diện Các Loại Provider (`useClass` vs `useValue` vs `useFactory` vs `useExisting`) & `InjectionToken`](#17-phân-biệt-toàn-diện-các-loại-provider-useclass-vs-usevalue-vs-usefactory-vs-useexisting--injectiontoken)
  - [18. Bốn Resolution Modifiers Kiểm Soát Cây Injector: `@Self`, `@SkipSelf`, `@Optional`, `@Host`](#18-bốn-resolution-modifiers-kiểm-soát-cây-injector-self-skipself-optional-host)
- [D. CUSTOM FORM CONTROL & COMPONENT NÂNG CAO](#d-custom-form-control--component-nâng-cao)
  - [19. ControlValueAccessor (CVA) Toàn Diện](#19-controlvalueaccessor-cva-toàn-diện)
  - [20. CDK Overlay (Thư Viện Angular Material CDK)](#20-cdk-overlay-thư-viện-angular-material-cdk)
- [E. ANGULAR SIGNALS & ASYNCHRONOUS RESOURCE MANAGEMENT](#e-angular-signals--asynchronous-resource-management)
  - [21. Angular Signals Toàn Diện (`signal` vs `computed` vs `linkedSignal`)](#21-angular-signals-toàn-diện-signal-vs-computed-vs-linkedsignal)
  - [22. Bắt Cầu Tương Tác Giữa Signals và RxJS (RxJS Interop)](#22-bắt-cầu-tương-tác-giữa-signals-và-rxjs-rxjs-interop)
  - [23. Asynchronous State Toàn Diện Với `resource()` & `rxResource()` (Angular 19+)](#23-asynchronous-state-toàn-diện-với-resource--rxresource-angular-19)
- [F. SERVICE WORKERS & PROGRESSIVE WEB APPS (PWAs)](#f-service-workers--progressive-web-apps-pwas)
  - [24. Overview (Tổng Quan Về Service Worker & PWA)](#24-overview-tổng-quan-về-service-worker--pwa)
  - [25. Getting Started (Khởi Tạo & Cấu Hình Angular Service Worker)](#25-getting-started-khởi-tạo--cấu-hình-angular-service-worker)
  - [26. Custom Service Worker Scripts (Tự Tùy Biến Service Worker)](#26-custom-service-worker-scripts-tự-tùy-biến-service-worker)
  - [27. Configuration File (`ngsw-config.json` Chi Tiết Từng Thuộc Tính)](#27-configuration-file-ngsw-configjson-chi-tiết-từng-thuộc-tính)
  - [28. Communicating with the Service Worker (`SwUpdate` & `SwPush`)](#28-communicating-with-the-service-worker-swupdate--swpush)
  - [29. Push Notifications (Thông Báo Đẩy Với Web Push API)](#29-push-notifications-thông-báo-đẩy-với-web-push-api)
  - [30. Service Worker DevOps (Deploy, Caching Invalidation & Safe Rollout)](#30-service-worker-devops-deploy-caching-invalidation--safe-rollout)
  - [31. App Shell Pattern (Kiến Trúc Khung Ứng Dụng Tải Ngay Lập Tức)](#31-app-shell-pattern-kiến-trúc-khung-ứng-dụng-tải-ngay-lập-tức)

---

# A. ANGULAR CORE

---

### 1. Component Lifecycle Hooks

#### 1.1. Thứ tự thực thi 9 Lifecycle Hooks
Mỗi khi Angular khởi tạo và render một component, các hooks được kích hoạt theo một vòng đời nghiêm ngặt:

```
[ constructor() ] (Khởi tạo class)
       │
       ▼
[ ngOnChanges() ] (Mỗi khi @Input() thay đổi reference)
       │
       ▼
[ ngOnInit() ] (Chạy DUY NHẤT 1 lần để init logic, call API)
       │
       ▼
[ ngDoCheck() ] (Chạy trong MỌI chu kỳ Change Detection)
       │
       ├─► [ ngAfterContentInit() ] (1 lần: Render xong <ng-content>)
       ├─► [ ngAfterContentChecked() ] (Mỗi lần kiểm tra content projection)
       │
       ├─► [ ngAfterViewInit() ] (1 lần: Render xong View Component & Con)
       ├─► [ ngAfterViewChecked() ] (Mỗi lần kiểm tra View)
       │
       ▼ (Khi component bị gỡ khỏi DOM)
[ ngOnDestroy() ] (Dọn dẹp timer, unsubscribe RxJS)
```

#### 1.2. Bảng đối chiếu Cũ (Legacy) vs Mới (Modern v16+)

| Tiêu chí | Cũ (Class & Interface) | Mới (Functional & Injection Context) |
| :--- | :--- | :--- |
| **Dọn dẹp bộ nhớ** | Phải `implements OnDestroy` và viết hàm `ngOnDestroy()`. | Dùng **`DestroyRef`**: Đăng ký callback ở bất kỳ đâu có injection context (Service, Helper, Function). |
| **Thao tác DOM** | Thao tác DOM trong `ngAfterViewInit` (Dễ dính crash nếu chạy SSR trên Node.js). | Dùng **`afterRender` / `afterNextRender`**: Đảm bảo code **chỉ chạy trên Trình duyệt**, an toàn 100% với SSR/SSG. |

##### Code thực chiến hiện đại:
```typescript
import { Component, DestroyRef, inject, afterNextRender, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-modern-lifecycle',
  standalone: true,
  template: `<div id="chart-box">Biểu đồ Canvas</div>`
})
export class ModernLifecycleComponent implements OnInit {
  private destroyRef = inject(DestroyRef);

  constructor() {
    // 1. Thao tác DOM an toàn: Cam kết chỉ chạy trên Browser sau khi DOM đã vẽ xong
    afterNextRender(() => {
      const el = document.getElementById('chart-box');
      console.log('Thao tác DOM an toàn:', el);
    });
  }

  ngOnInit() {
    // 2. Dọn dẹp thủ công không cần OnDestroy interface
    const timer = setInterval(() => console.log('Ping...'), 1000);
    this.destroyRef.onDestroy(() => clearInterval(timer));

    // 3. Tự hủy Observable khi component unmount
    interval(2000).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(console.log);
  }
}
```

---

### 2. ViewEncapsulation Toàn Diện: `Emulated` vs `None` vs `ShadowDom` & `ExperimentalIsolatedShadowDom`

Mặc định trong các ứng dụng web thông thường, CSS có tính chất **Global Cascade** (mọi quy tắc CSS viết ở một nơi có thể dễ dàng làm vỡ giao diện ở một nơi khác). Angular giải quyết vấn đề này thông qua cơ chế **ViewEncapsulation**.

```typescript
@Component({
  selector: 'app-card',
  encapsulation: ViewEncapsulation.Emulated // Mặc định
})
```

---

#### 2.1. Bảng So Sánh 4 Chế Độ ViewEncapsulation (Cheat Sheet Phỏng Vấn)

| Chế độ Encapsulation | Cơ chế hoạt động | Style bên ngoài lọt vào? | Style bên trong rò rỉ ra ngoài? | Tạo `#shadow-root` trong DOM? |
| :--- | :--- | :---: | :---: | :---: |
| **`Emulated`** (Mặc định) | Angular **giả lập** bao đóng bằng cách sinh thuộc tính hash độc nhất (vd: `_ngcontent-ng-c12`). | ⚠️ Chỉ nhận global styles từ `styles.scss` (font, reset CSS). | ❌ **Không** (Style chỉ tác dụng lên thẻ có mã hash). | ❌ Không |
| **`None`** | Bỏ hoàn toàn bao đóng. Đẩy toàn bộ CSS của component lên thẳng thẻ `<head>` của trang web. | ✅ Nhận mọi style. | ⚠️ **Có** (Biến thành CSS toàn cục, dễ làm vỡ layout trang khác). | ❌ Không |
| **`ShadowDom`** | Sử dụng **Web Component Shadow DOM chuẩn của trình duyệt** (`attachShadow({ mode: 'open' })`). | ❌ **Chặn đứng 100%** (Kể cả class `.btn`, `.card` từ Bootstrap hay Tailwind trong styles.scss đều KHÔNG vào được). | ❌ **Chặn đứng 100%** (CSS bên trong bị nhốt kín trong shadow tree). | ✅ **Có** (Có thẻ `#shadow-root`) |
| **`ExperimentalIsolatedShadowDom`** | Đưa tính năng Shadow DOM lên mức tối đa: Đảm bảo **cô lập hoàn toàn cả về CSS Custom Properties (CSS Variables)** và kế thừa font-family/color từ cây DOM cha. | 🛡️ **Cô lập tuyệt đối**, ngăn cản cả CSS inheritance mặc định của trình duyệt. | ❌ Không rò rỉ ra ngoài. | ✅ **Có** (Có thẻ `#shadow-root` cô lập hoàn toàn) |

---

#### 2.2. Đi Sâu Vào `ShadowDom`: Bản Chất & Ví Dụ Thực Chiến

##### 1. Bản chất Shadow DOM của trình duyệt
Khi bạn khai báo `encapsulation: ViewEncapsulation.ShadowDom`:
- Trình duyệt sẽ tạo ra một cây DOM phụ độc lập gọi là **Shadow Tree**, được gắn vào component thông qua nút gốc **`#shadow-root`**.
- Toàn bộ thẻ `<style>` của component được đặt **bên trong** `#shadow-root`.
- **Luật bất khả xâm phạm:** Các selector CSS bên ngoài (dù là `body button`, `.global-btn`, `*`) đều **không thể xuyên qua** `#shadow-root` để chạm vào các phần tử bên trong (trừ khi dùng CSS Custom Variables `--primary-color`).

##### 2. Ví dụ thực tế: Widget Nhúng (Embeddable Widget / Micro-frontend)
Giả sử bạn viết một widget Chatbot hoặc Widget Đánh giá sản phẩm để bán cho đối tác nhúng vào website của họ. Trang web của đối tác có hàng nghìn dòng CSS xấu viết đè lung tung (`button { background: black !important; }`). 

Nếu dùng `Emulated`, CSS `!important` của đối tác vẫn có thể đè nát nút bấm của bạn. Nhưng nếu dùng `ShadowDom`, widget của bạn sẽ bất khả chiến bại:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  encapsulation: ViewEncapsulation.ShadowDom, // 🛡️ Bật Shadow DOM thật của trình duyệt
  template: `
    <div class="chat-container">
      <h3>Trợ lý ảo AI</h3>
      <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
      <button class="send-btn">Gửi tin nhắn</button>
    </div>
  `,
  styles: [`
    /* Style này chỉ sống duy nhất bên trong #shadow-root */
    .chat-container {
      border: 1px solid #e2e8f0;
      padding: 16px;
      border-radius: 12px;
      background: white;
    }
    .send-btn {
      background: #3b82f6;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
    }
  `]
})
export class ChatWidgetComponent {}
```

##### 3. Cấu trúc cây DOM thật sinh ra trên trình duyệt:
```html
<app-chat-widget>
  #shadow-root (open)
    <style>
      .chat-container { ... }
      .send-btn { background: #3b82f6; ... }
    </style>
    <div class="chat-container">
      <h3>Trợ lý ảo AI</h3>
      <button class="send-btn">Gửi tin nhắn</button>
    </div>
</app-chat-widget>
```

##### 4. Cách duy nhất để style từ ngoài lọt qua `ShadowDom`: CSS Custom Properties (Variables)
```css
/* Trong styles.scss toàn cục của trang web: */
app-chat-widget {
  /* CSS Variables CÓ THỂ xuyên qua được Shadow Boundary! */
  --widget-primary: #10b981;
}
```
Và trong component bên trong Shadow DOM ta đọc biến này:
```css
.send-btn {
  background: var(--widget-primary, #3b82f6);
}
```

---

#### 2.3. `ExperimentalIsolatedShadowDom` Là Gì? Tại Sao Lại Cần Nó?

Mặc dù `ViewEncapsulation.ShadowDom` đã ngăn chặn được 99% CSS bên ngoài, nhưng trong chuẩn của Web Components, vẫn có một số thuộc tính CSS có tính chất **Kế thừa tự nhiên (Inheritable Properties)** xuyên qua được `#shadow-root`:
- `color` (Màu chữ)
- `font-family`, `font-size`, `line-height`
- `visibility`
- Toàn bộ các biến **CSS Custom Properties (`--my-var`)**

##### Vấn đề thực tế gặp phải với `ShadowDom` thông thường:
Nếu trang web cha bên ngoài khai báo:
```css
body {
  font-family: 'Comic Sans MS', cursive !important;
  color: hotpink !important;
  --text-size: 30px;
}
```
Thì mặc dù Component dùng `ViewEncapsulation.ShadowDom`, **toàn bộ chữ bên trong widget vẫn bị đổi thành font 'Comic Sans MS' và màu 'hotpink'** do cơ chế kế thừa tự nhiên của trình duyệt!

---

##### Giải pháp của Angular: `ExperimentalIsolatedShadowDom`
Đây là chế độ nâng cao mang tính thử nghiệm của Angular nhằm phục vụ cho các hệ thống **Micro-frontend** và các thư viện component độc lập cao cấp:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-secure-widget',
  standalone: true,
  // 🛡️ Bật chế độ cô lập tuyệt đối
  encapsulation: (ViewEncapsulation as any).ExperimentalIsolatedShadowDom || ViewEncapsulation.ShadowDom,
  template: `
    <div class="box">
      <h3>Khu Vực Tuyệt Mật</h3>
      <p>Nội dung này được bảo vệ 100% không chịu bất kỳ ảnh hưởng style nào từ trang cha!</p>
    </div>
  `,
  styles: [`
    .box { padding: 12px; }
  `]
})
export class SecureWidgetComponent {}
```

##### Cơ chế hoạt động của `ExperimentalIsolatedShadowDom`:
1. Vẫn tạo ra `#shadow-root` giống như `ShadowDom`.
2. **Tự động áp dụng reset triệt để**: Tự động inject một lớp reset CSS ở mức cao nhất (`all: initial`) và triệt tiêu kế thừa từ document host.
3. **Ngắt toàn bộ CSS Variables không mong muốn**: Ngăn chặn các biến CSS tùy biến từ ngoài làm lệch màu sắc/layout của component.
4. **Độc lập hoàn toàn với framework bên ngoài**: Đảm bảo component hiển thị đồng nhất 100% hệt như đang chạy trong một iframe riêng biệt, nhưng lại không có nhược điểm về hiệu năng hay hạn chế giao tiếp của thẻ `<iframe>`.

---

#### 2.4. Bảng Tóm Tắt Khi Nào Nên Chọn Chế Độ Nào (Phỏng Vấn Ghi Điểm)

1. **Chọn `Emulated` (Mặc định)**: Dùng cho 95% component trong app thông thường. Vừa đảm bảo CSS không lọt ra ngoài, vừa thừa hưởng được các class tiện ích của toàn app (TailwindCSS, Bootstrap grid, theme font chữ chung).
2. **Chọn `None`**: Dùng khi muốn viết style đè vào các thư viện bên thứ 3 (như custom lại style của Angular Material Dialog, TinyMCE Editor, Google Maps popup).
3. **Chọn `ShadowDom`**: Dùng khi viết **Design System Component** hoặc **Custom Elements / Web Components** (`@angular/elements`) được nhúng sang các ứng dụng khác (React, Vue, PHP, WordPress).
4. **Chọn `ExperimentalIsolatedShadowDom`**: Dùng cho các hệ thống **Micro-frontend cao cấp** hoặc widget thanh toán/bảo mật cần cam kết cô lập hoàn toàn tuyệt đối khỏi CSS kế thừa của trang web chứa nó.

---

### 3. Component Interaction (Truyền Dữ Liệu Component)

#### 3.1. Bảng đối chiếu cú pháp

| Chiều truyền | Cú pháp Cũ (Decorator) | Cú pháp Mới (Signal-based v17.1+) |
| :--- | :--- | :--- |
| **Cha $\rightarrow$ Con** | `@Input() name!: string;` | `name = input<string>('Guest');`<br>`age = input.required<number>();` |
| **Con $\rightarrow$ Cha** | `@Output() save = new EventEmitter<string>();` | `save = output<string>();` |
| **Hai chiều (2-way)** | `@Input() val` + `@Output() valChange` | `val = model<number>(0);` |
| **Lắng nghe Host DOM** | `@HostBinding('class.active')` | Khai báo trực tiếp trong metadata `host: { '[class.active]': 'isActive()' }` |

#### 3.2. Cầu nối RxJS với Signal Output (`outputFromObservable` & `outputToObservable`)
```typescript
import { outputFromObservable, outputToObservable } from '@angular/core/rxjs-interop';
import { interval, debounceTime } from 'rxjs';

export class SearchBoxComponent {
  // 1. Biến Observable thành Angular Output (tự ngắt khi component unmount)
  tickerOutput = outputFromObservable(interval(1000));

  // 2. Biến Output thành Observable để dùng các toán tử RxJS
  searchQuery = output<string>();

  constructor() {
    outputToObservable(this.searchQuery).pipe(
      debounceTime(300)
    ).subscribe(query => console.log('Debounced Query:', query));
  }
}
```

---

### 4. Directives: 3 Loại & Custom Directive Thực Chiến

#### 4.1. Bảng phân loại Directives

| Loại Directive | Có Template riêng? | Đổi cấu trúc DOM? | Công dụng & Ví dụ |
| :--- | :---: | :---: | :--- |
| **1. Component** | ✅ CÓ | ✅ CÓ | Là directive có template HTML: `<app-header>` |
| **2. Attribute Directive** | ❌ KHÔNG | ❌ KHÔNG | Thay đổi màu sắc, style, sự kiện: `ngClass`, `[appHighlight]` |
| **3. Structural Directive** | ❌ KHÔNG | ✅ CÓ (Thêm/Xóa) | Thêm/xóa thẻ thật trên cây DOM (tiền tố `*`): `*ngIf`, `*appHasRole` |

#### 4.2. Code Custom Attribute Directive (Signal Input + HostListener)
```typescript
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  private el = inject(ElementRef);
  color = input<string>('#fde047'); // Signal input

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.backgroundColor = this.color();
  }

  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}
```

#### 4.3. Code Custom Structural Directive (`*appHasRole`)
```typescript
@Directive({
  selector: '[appHasRole]',
  standalone: true
})
export class HasRoleDirective {
  private templateRef = inject(TemplateRef<any>);
  private vcr = inject(ViewContainerRef);
  private currentRole = 'ADMIN';

  appHasRole = input.required<string>();

  constructor() {
    effect(() => {
      if (this.appHasRole() === this.currentRole) {
        this.vcr.createEmbeddedView(this.templateRef); // Đúc HTML vào DOM
      } else {
        this.vcr.clear(); // Xóa sạch khỏi DOM
      }
    });
  }
}
```

#### 4.4. Modern Control Flow thay thế Structural Directives (Angular 17+)
Không cần import `CommonModule`, compiler biên dịch trực tiếp giúp hiệu năng tăng vọt:
```html
<!-- Cũ: *ngIf / *ngFor -->
<div *ngIf="isAuth; else login">Chào bạn!</div>
<ng-template #login><button>Login</button></ng-template>

<!-- Mới: @if, @for, @switch -->
@if (isAuth()) {
  <div>Chào bạn!</div>
} @else {
  <button>Login</button>
}

@for (item of items(); track item.id; let idx = $index) {
  <p>{{ idx + 1 }}. {{ item.name }}</p>
} @empty {
  <p>Danh sách rỗng!</p>
}
```

---

### 5. Pipes & Pure vs Impure Pipe

* **`Pure Pipe` (Mặc định)**: Chỉ chạy khi tham chiếu đầu vào (Primitive value hoặc Object reference) thay đổi.
* **`Impure Pipe` (`pure: false`)**: Bị gọi liên tục trong **MỌI** chu kỳ Change Detection (kể cả khi chỉ rê chuột). Cực kỳ tốn tài nguyên, tránh tính toán nặng tại đây.
* **Tương tác với Signals**: Khi truyền Signal vào pipe `{{ mySignal() | formatCurrency }}`, Angular chỉ chạy lại pipe khi giá trị cụ thể của Signal đó biến đổi.

---

### 6. Change Detection Strategy: NgZone vs Zoneless Toàn Diện

Quản lý chu kỳ phát hiện thay đổi (Change Detection) là trọng tâm của hiệu năng trong Angular.

#### 6.1. Chi tiết 2 chiến lược: Default vs OnPush

* **`Default` (CheckAlways)**: Quét toàn bộ cây component từ root xuống lá bất cứ khi nào có sự kiện bất đồng bộ xảy ra (click, timer, http).
* **`OnPush`**: Bỏ qua component trừ khi:
  1. Tham chiếu của `@Input()` thay đổi.
  2. Event handler của chính component đó được kích hoạt.
  3. Template dùng `async` pipe hoặc Signal có giá trị mới.
  4. Gọi thủ công `ChangeDetectorRef.markForCheck()`.

---

#### 6.2. Hiểu sâu về `NgZone` (`Zone.js`)

`Zone.js` hoạt động bằng cơ chế **Monkey-patching** — can thiệp và bọc lại toàn bộ các API bất đồng bộ chuẩn của trình duyệt (`setTimeout`, `setInterval`, `Promise.then`, `addEventListener`, `fetch`, `XMLHttpRequest`).

Mỗi khi một tác vụ async hoàn thành, `Zone.js` thông báo cho Angular: *"Đã có sự kiện xảy ra, hãy quét lại toàn bộ cây Component để vẽ lại UI!"*.

##### 1. `runOutsideAngular(fn)` – Chạy thoát vùng kiểm soát:
* **Mục đích:** Bất kỳ thao tác thay đổi biến số nào diễn ra bên trong hàm này đều **KHÔNG** kích hoạt Change Detection.
* **Use-case thực tế:** Lắng nghe sự kiện di chuột `mousemove`, cuộn trang `scroll`, requestAnimationFrame, animation phức tạp, hoặc nhận hàng nghìn bản tin mỗi giây từ WebSockets.

##### 2. `run(fn)` – Kéo luồng quay trở lại Angular:
* **Mục đích:** Ép Angular chạy Change Detection và render lại UI ngay lập tức.
* **Use-case thực tế:** Khi nhận callback từ các SDK bên thứ 3 (Google Maps SDK, Stripe checkout popup, HTML5 Geolocation, hoặc kết quả từ Web Worker độc lập).

```typescript
import { Component, OnInit, NgZone, inject } from '@angular/core';

@Component({
  selector: 'app-zone-demo',
  template: `<p>Vị trí chuột: {{ coords.x }} - {{ coords.y }}</p>`
})
export class ZoneDemoComponent implements OnInit {
  private ngZone = inject(NgZone);
  coords = { x: 0, y: 0 };

  ngOnInit() {
    // Chạy sự kiện mousemove ngoài Zone để không trigger 60 lần/giây gây lag app
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', (e) => {
        // Chỉ khi di chuột qua tọa độ đặc biệt mới cần update UI:
        if (e.clientX > 500) {
          this.ngZone.run(() => {
            this.coords = { x: e.clientX, y: e.clientY }; // Tự động trigger vẽ lại UI!
          });
        }
      });
    });
  }
}
```

---

#### 6.3. Kỷ Nguyên Zoneless (Angular 18+ & Angular 20+)

Trong kiến trúc truyền thống, nhược điểm chí mạng của `Zone.js` là:
- Làm tăng dung lượng bundle tải về (khoảng 30-40KB gzip polyfill).
- Gặp khó khăn khi debug callstack (stack trace bị bọc qua nhiều tầng Zone).
- Không thể phát hiện thay đổi chi tiết tại chỗ (chỉ có thể quét từ trên xuống dưới dạng thô sơ - Coarse-grained).

##### Cơ chế hoạt động của Zoneless:
* Thay vì cần một thư viện bên ngoài nghe lén các sự kiện async, Angular chuyển sang mô hình **Fine-grained Reactivity (Phản ứng hạt nhân siêu nhỏ)** dựa trên **Angular Signals**.
* Khi một Signal thay đổi giá trị (`.set()` hoặc `.update()`), Signal đó tự động phát thông báo trực tiếp đến chính xác node DOM tương ứng trên màn hình để cập nhật **ngay lập tức mà không cần quét duyệt toàn bộ cây component**.

##### Cách kích hoạt Zoneless trong `app.config.ts`:
```typescript
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // Bật chế độ chạy không cần Zone.js
    provideExperimentalZonelessChangeDetection()
  ]
};
```

Sau khi bật cờ này, bạn có thể xóa hoàn toàn `"zone.js"` khỏi mảng `polyfills` trong `angular.json`, giúp ứng dụng nhẹ hơn và tải trang thần tốc.

---

### 7. Sự Tiến Hóa Của Forms Trong Angular

#### 7.1. Bảng so sánh 3 thế hệ Form

| Tiêu chí | 1. Traditional Reactive Forms | 2. Compat Form (Bắc Cầu) | 3. Signal Forms (v19+ preview, v22+ stable) |
| :--- | :--- | :--- | :--- |
| **Nền tảng** | RxJS + Zone.js | RxJS + Signal Interop | Pure Signals |
| **Class sử dụng** | `FormGroup`, `FormControl`, `FormArray` | Giữ nguyên `FormGroup`, bọc bằng `toSignal()` | Dùng hàm `form()` bọc trực tiếp Signal Model |
| **Modules** | `ReactiveFormsModule` | `ReactiveFormsModule` + `toSignal` | **Không cần module** |
| **Đọc giá trị** | `form.valueChanges.subscribe()` | `formVal = toSignal(form.valueChanges)` | `formModel().username` |

#### 7.2. Code so sánh trực quan

##### Cách 1: Compat Form (Giữ nguyên FormGroup cũ, đọc mượt qua Signal)
```typescript
export class CompatFormComponent {
  private fb = inject(NonNullableFormBuilder);

  form = this.fb.group({
    keyword: ['', Validators.required]
  });

  // Chuyển toàn bộ valueChanges thành Signal tự động
  formValues = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  // computed tính toán đồng bộ, template không lo rò rỉ bộ nhớ
  isSearchReady = computed(() => (this.formValues().keyword?.length ?? 0) >= 3);
}
```

##### Cách 2: Pure Signal Form (Mới hoàn toàn)
```typescript
import { signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';

export class ModernFormComponent {
  userModel = signal({ username: '', email: '' });

  userForm = form(this.userModel, (path) => {
    required(path.username);
  });
}
```

---

### 8. Templates Đặc Biệt, Router Binding & Lazy Loading Toàn Diện (Defer Blocks, Preloading Strategies)

#### 8.1. Các thẻ template đặc biệt
1. `<ng-container>`: Thẻ gom nhóm ảo, không in thẻ thật ra DOM (tránh vỡ Flexbox/Grid).
2. `<ng-template>`: Khuôn đúc HTML đóng gói, chỉ hiển thị khi được kích hoạt qua `*ngIf else` hoặc `*ngTemplateOutlet`.
3. `<ng-content>`: Content Projection truyền HTML từ cha vào con (hỗ trợ multi-slot với thuộc tính `select`).

---

#### 8.2. Lazy Loading Trong Angular: Route Level vs Component Level

Lazy loading (Tải lười) là kỹ thuật chia nhỏ file bundle JavaScript ban đầu của ứng dụng thành nhiều file chunk nhỏ, chỉ tải về khi người dùng thực sự cần đến.

| Tiêu chí | 1. Route-level Lazy Loading | 2. Component-level Lazy Loading (`@defer`) |
| :--- | :--- | :--- |
| **Phạm vi** | Tải nguyên một trang / module khi URL thay đổi. | Tải một component cụ thể nằm ngay bên trong một trang. |
| **Cơ chế** | Cấu hình trong mảng `routes` của Angular Router. | Khai báo bằng khối cú pháp `@defer` ngay trong file HTML template. |
| **Thời điểm tải** | Khi người dùng click chuyển sang đường dẫn URL đó. | Khi cuộn tới phần tử (viewport), khi hover chuột, sau timer... |

##### 1. Cấu hình Route-level Lazy Loading (Standalone Component):
```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    // Tự động tách thành chunk riêng: home.component.js
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'admin',
    // Lazy load toàn bộ cụm routes con:
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];
```

---

#### 8.3. Deferrable Views (`@defer`) - Angular 17+ (Component-level Lazy Loading)

`@defer` cho phép lazy load bất kỳ component standalone nào trực tiếp tại template HTML mà không cần can thiệp vào router.

##### Cấu trúc đầy đủ 4 khối của `@defer`:
```html
@defer (on viewport; prefetch on idle) {
  <!-- Khối chính: Chỉ tải mã nguồn và render khi điều kiện kích hoạt xảy ra -->
  <app-heavy-chart [data]="chartData()" />
} 
@placeholder (minimum 500ms) {
  <!-- Khối giữ chỗ: Hiển thị ngay lập tức trước khi tải (giúp giữ khung layout, chống giật trang) -->
  <div class="skeleton-box">📊 Chờ cuộn chuột tới biểu đồ...</div>
} 
@loading (after 100ms; minimum 800ms) {
  <!-- Khối đang tải: Hiển thị spinner khi file chunk JS đang được tải qua mạng -->
  <!-- after 100ms: Chỉ hiện nếu mạng chậm hơn 100ms (tránh chớp tắt màn hình khi mạng quá nhanh) -->
  <div class="loading-spinner">⏳ Đang tải thư viện biểu đồ...</div>
} 
@error {
  <!-- Khối lỗi: Hiển thị nếu file chunk tải thất bại (rớt mạng) -->
  <div class="error-box">❌ Không thể tải biểu đồ. Vui lòng thử lại!</div>
}
```

##### Bảng tra cứu các Trigger Kích Hoạt của `@defer`:
| Trigger | Cú pháp | Ý nghĩa hoạt động |
| :--- | :--- | :--- |
| **`on idle`** (Mặc định) | `@defer (on idle)` | Trình duyệt rảnh rỗi (`requestIdleCallback`) thì tự động tải ngầm. |
| **`on viewport`** | `@defer (on viewport)` | Chỉ tải khi phần tử bắt đầu cuộn vào màn hình người dùng (`IntersectionObserver`). Có thể truyền biến tham chiếu: `on viewport(triggerEl)`. |
| **`on interaction`** | `@defer (on interaction)` | Tải khi người dùng click hoặc gõ phím vào vùng giữ chỗ (`placeholder`). |
| **`on hover`** | `@defer (on hover)` | Tải khi người dùng rê chuột vào vùng giữ chỗ. |
| **`on immediate`** | `@defer (on immediate)` | Tải ngay lập tức sau khi trang hiện tại render xong. |
| **`on timer`** | `@defer (on timer(3s))` | Trì hoãn tải sau một khoảng thời gian cụ thể (ví dụ 3 giây). |
| **`when [condition]`** | `@defer (when isPremium())`| Tải dựa trên một biểu thức boolean tùy biến (Signal hoặc biến thông thường). |

> 💡 **Kỹ thuật `prefetch` đỉnh cao UX:** Bạn có thể tách rời thời điểm **tải file JS về máy** và thời điểm **vẽ ra màn hình**:
> ```html
> <!-- Tải ngầm file JS về bộ nhớ đệm lúc máy rảnh rỗi (prefetch on idle),
>      nhưng chỉ vẽ ra màn hình khi người dùng thực sự click vào (on interaction)! -->
> @defer (on interaction; prefetch on idle) {
>   <app-comment-box />
> } @placeholder {
>   <button>Bấm vào đây để xem bình luận</button>
> }
> ```

---

#### 8.4. Preloading Strategy Trong Angular Router

Khi dùng Route Lazy Loading, vấn đề nảy sinh là: Lúc người dùng bấm vào menu, trình duyệt mới bắt đầu tải file chunk JS của trang đó về $\rightarrow$ Người dùng phải chờ vài trăm mili-giây đến vài giây.

**Preloading Strategy** giải quyết triệt để vấn đề này: Sau khi trang đầu tiên tải xong, Angular sẽ **tự động tải ngầm các trang còn lại trong nền** khi mạng đang rảnh rỗi.

##### 1. Bảng so sánh 3 chiến lược Preloading:

| Chiến lược Preloading | Cách hoạt động | Ưu điểm & Nhược điểm |
| :--- | :--- | :--- |
| **`NoPreloading`** (Mặc định) | Bấm vào link trang nào mới tải file JS trang đó. | Tiết kiệm băng thông tối đa, nhưng bấm chuyển trang có độ trễ. |
| **`PreloadAllModules`** | Trang chủ vừa tải xong là lập tức tải ngầm **tất cả** các trang còn lại. | Chuyển trang tức thì 0 giây, nhưng tốn băng thông nếu app có hàng trăm module lớn. |
| **Custom Preload Strategy** (Khuyên dùng cho dự án lớn) | Tự viết luật lọc: Chỉ tải ngầm các trang quan trọng (có gắn cờ `preload: true`) hoặc có kết nối mạng nhanh. | Cân bằng hoàn hảo giữa tốc độ trải nghiệm và dung lượng 4G của người dùng. |

##### 2. Cấu hình `PreloadAllModules` trong `app.config.ts`:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules) // Bật tải ngầm toàn bộ
    )
  ]
};
```

##### 3. Tự viết Custom Preloading Strategy (Theo cờ `data.preload` hoặc Độ trễ Network):
```typescript
// custom-preloading.strategy.ts
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SelectivePreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // 1. Kiểm tra nếu route có khai báo data: { preload: true }
    if (route.data && route.data['preload']) {
      const delayMs = route.data['delay'] || 1000;
      console.log(`🚀 Tự động tải ngầm trang [${route.path}] sau ${delayMs}ms`);
      // Chờ máy rảnh rỗi một chút rồi mới tải
      return timer(delayMs).pipe(switchMap(() => load()));
    }
    // Không có cờ thì không tải ngầm (giữ lazy loading thông thường)
    return of(null);
  }
}
```

*Sử dụng trong routes và app.config.ts:*
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    data: { preload: true, delay: 2000 } // Trang quan trọng -> Tải ngầm sau 2s
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.component').then(m => m.SettingsComponent)
    // Không có preload -> Bấm mới tải
  }
];

// app.config.ts
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(SelectivePreloadingStrategy))
  ]
};
```

---

#### 8.5. Router Input Binding
Tự động map `:id` trên URL hoặc query param `?sort=desc` thành Signal `input()`:
```typescript
export const routes: Routes = [{
  path: 'blog/:id',
  component: BlogDetailComponent
}];

// Trong BlogDetailComponent:
export class BlogDetailComponent {
  id = input.required<string>(); // Tự động nhận giá trị từ :id
}
```

---

### 9. Compilation Toàn Diện: JIT (Just-In-Time) vs AOT (Ahead-Of-Time) & Ivy Engine

Trình duyệt web (Chrome, Safari, Firefox...) **chỉ hiểu được HTML, CSS và JavaScript thuần**. Trình duyệt **hoàn toàn KHÔNG HIỂU** các cú pháp đặc thù của Angular như:
- Data Binding `{{ title }}`
- Property Binding `[disabled]="isLoading"`
- Event Binding `(click)="save()"`
- Cú pháp Control Flow `@if`, `@for`

Do đó, toàn bộ HTML Template và Metadata của Angular bắt buộc phải trải qua một quá trình **Biên dịch (Compilation)** để chuyển hóa thành các mã lệnh JavaScript DOM manipulation tối ưu. 

Hai cơ chế thực hiện công việc này chính là **JIT** và **AOT**.

---

#### 9.1. Bảng So Sánh Chi Tiết Từng Tiêu Chí (Cheat Sheet)

| Tiêu chí | JIT (Just-In-Time) | AOT (Ahead-Of-Time) - Khuyến nghị |
| :--- | :--- | :--- |
| **Bản chất** | **"Vừa chạy vừa dịch"**. Đẩy toàn bộ HTML Template thô về trình duyệt, trình duyệt tự dịch lúc runtime. | **"Dịch sẵn từ trước"**. Toàn bộ Template được biên dịch sang mã JS thuần ngay tại máy lập trình viên / server CI-CD lúc build. |
| **Thời điểm biên dịch** | **Tại Runtime trên trình duyệt** của người dùng khi họ mở trang web. | **Tại Build time** khi chạy lệnh `ng build` hoặc `ng serve`. |
| **Kích thước Bundle tải về** | **Rất Lớn**: Bắt buộc phải đóng gói kèm theo toàn bộ cỗ máy **Angular Compiler (`@angular/compiler` nặng ~100KB - 200KB gzip)** về máy client. | **Siêu Nhẹ**: **Loại bỏ hoàn toàn `@angular/compiler`** ra khỏi bundle thành phẩm. Khả năng Tree-shaking đạt mức tối đa. |
| **Tốc độ khởi động (FCP / Startup)** | **Chậm**: Trình duyệt phải thực hiện chuỗi: Tải bundle $\rightarrow$ Phân tích HTML $\rightarrow$ Nạp Angular Compiler $\rightarrow$ Dịch template sang JS $\rightarrow$ Mới vẽ được UI. | ⚡ **Nhanh vượt trội**: Trình duyệt chỉ việc tải file JS đã được dịch sẵn và thực thi lệnh vẽ DOM trực tiếp ngay lập tức. |
| **Bắt lỗi Template (Error Detection)** | **Muộn tại Runtime**: Lỗi gõ sai tên biến trong HTML (vd `{{ use.nam }}`) chỉ phát hiện khi người dùng mở đúng trang đó trên trình duyệt (thấy màn hình trắng hoặc lỗi console đỏ). | 🛡️ **Sớm tại Build time**: Bắt lỗi kiểu dữ liệu (Type-checking) và cú pháp template ngay lúc build. Nếu sai biến, lệnh build sẽ báo đỏ và **chặn không cho release code lỗi**. |
| **Bảo mật (Security - XSS)** | Kém an toàn hơn: Template được đánh giá và dịch động tại runtime. | **An toàn cao**: Mã template đã biến thành các hàm JS đóng gói, giảm thiểu tối đa nguy cơ bị tiêm mã độc (Injection/XSS). |
| **Môi trường sử dụng** | Chủ yếu dùng trong môi trường **Development cục bộ** (khi cần rebuild nhanh). | **Mặc định và BẮT BUỘC cho Production** (Hiện tại từ Angular 12+ AOT là mặc định cho cả dev). |

---

#### 9.2. Sơ Đồ Cơ Chế Hoạt Động Của JIT vs AOT

```
========================================================================================
1. LUỒNG HOẠT ĐỘNG CỦA JIT (JUST-IN-TIME):
========================================================================================
[ Developer Code ] ── ng build ──► [ Bundle gồm: JS + Template Thô + @angular/compiler ]
                                                            │ (Tải qua mạng Internet)
                                                            ▼
                                              [ TRÌNH DUYỆT CLIENT ]
                                              1. Tải toàn bộ bundle nặng về máy.
                                              2. Bật @angular/compiler lên trong RAM.
                                              3. Dịch từng thẻ HTML template sang JS.
                                              4. Mới bắt đầu vẽ giao diện ra màn hình! ➔ CHẬM ⏳


========================================================================================
2. LUỒNG HOẠT ĐỘNG CỦA AOT (AHEAD-OF-TIME):
========================================================================================
[ Developer Code ] ── ng build (AOT Engine dịch sẵn Template sang JS) 
       │
       ▼
[ Bundle Rút Gọn: CHỈ CÒN JS THUẦN ] (Đã gỡ sạch @angular/compiler)
       │ (Tải qua mạng Internet - File siêu nhẹ)
       ▼
[ TRÌNH DUYỆT CLIENT ]
1. Tải bundle nhẹ về máy.
2. Thực thi mã JS vẽ Real DOM ngay lập tức! ➔ NHANH THẦN TỐC ⚡
```

---

#### 9.3. Đằng Sau Hậu Trường: Angular Ivy Compiler Đã Biến Đổi Code Như Thế Nào?

Hãy xem một Component đơn giản:
```typescript
@Component({
  selector: 'app-greeting',
  template: `<h1>Xin chào {{ name }}!</h1>`
})
export class GreetingComponent {
  name = 'Phú Nguyễn';
}
```

* **Ở chế độ JIT:** Chuỗi `<h1>Xin chào {{ name }}!</h1>` được giữ nguyên dưới dạng chuỗi String trong bundle gửi về client. Client phải tốn CPU để parse chuỗi này.
* **Ở chế độ AOT (với Ivy Engine):** Trình biên dịch AOT dịch thẳng template thành các lệnh thực thi DOM tối ưu (gọi là **Ivy Instructions**):
```javascript
// Mã JavaScript thuần mà AOT sinh ra lúc build:
export class GreetingComponent {
  // ...
  static ɵcmp = ɵɵdefineComponent({
    type: GreetingComponent,
    selectors: [["app-greeting"]],
    template: function GreetingComponent_Template(rf, ctx) {
      if (rf & 1) { // 1. Creation Mode (Lúc vẽ DOM ban đầu)
        ɵɵelementStart(0, "h1");
        ɵɵtext(1);
        ɵɵelementEnd();
      }
      if (rf & 2) { // 2. Update Mode (Lúc Change Detection kiểm tra cập nhật)
        ɵɵadvance(1);
        ɵɵtextInterpolate1("Xin chào ", ctx.name, "!");
      }
    }
  });
}
```
> 💡 **Tại sao AOT Tree-shaking lại tối thượng?**
> Nhìn đoạn code trên: Component này chỉ dùng 2 hàm `ɵɵelementStart` và `ɵɵtextInterpolate1`. Toàn bộ các tính năng khác của Angular (như Animations, SVG, Form...) không hề được gọi đến $\rightarrow$ Webpack/Vite sẽ tự động **cắt bỏ toàn bộ code không dùng** ra khỏi file JS cuối cùng!

---

#### 9.4. Mẫu Trả Lời Phỏng Vấn "Ghi Điểm Tuyệt Đối" (1 Phút Thuyết Phục)

> *"**JIT (Just-In-Time)** và **AOT (Ahead-Of-Time)** là hai chiến lược biên dịch của Angular:*
> 
> * **JIT (Vừa chạy vừa dịch):** Quá trình biên dịch template diễn ra ngay trên trình duyệt của người dùng lúc runtime. Vì thế, bundle bắt buộc phải mang theo cả cỗ máy `@angular/compiler` (nặng thêm khoảng 100KB - 200KB), khiến thời gian tải trang đầu (Startup / First Contentful Paint) bị chậm hơn. Ngoài ra, lỗi type trong template chỉ được phát hiện khi người dùng click vào trang đó lúc runtime.
> * **AOT (Dịch sẵn lúc build):** Quá trình biên dịch diễn ra tại build-time. Ivy Compiler dịch toàn bộ HTML template và styles thành các hàm JavaScript thuần (`ɵɵelementStart`, `ɵɵtext`). Điều này mang lại 3 lợi thế vượt trội:
>   1. **Bundle siêu nhẹ:** Do đã loại bỏ hoàn toàn `@angular/compiler` và tận dụng tối đa Tree-shaking.
>   2. **Khởi động thần tốc:** Trình duyệt chỉ việc thực thi code JS có sẵn để vẽ DOM mà không tốn công parse HTML.
>   3. **Bắt lỗi sớm:** Template Type-checking phát hiện gõ sai biến hay sai kiểu dữ liệu ngay lúc build, chống crash ứng dụng trên Production.
> 
> *Trước đây JIT được dùng trong môi trường Development để tăng tốc độ rebuild cục bộ. Tuy nhiên, kể từ kỷ nguyên Angular Ivy (Angular 12+), AOT đã trở thành mặc định cho cả Development lẫn Production vì tốc độ biên dịch của Ivy hiện tại đã cực kỳ nhanh."*

---

### 10. View Queries vs Content Queries Toàn Diện (`viewChild` / `viewChildren` vs `contentChild` / `contentChildren`)

Trong Angular, **Querying (Truy vấn)** là cơ chế giúp Component cha có thể "chạm tay" vào các phần tử HTML thật (DOM Element), các Component con hoặc các Directives nằm trong phạm vi của mình.

Angular phân định ranh giới cực kỳ rõ ràng thành **2 loại Queries**:
1. **View Queries**: Truy vấn những gì thuộc về **View nội bộ** (HTML Template mà chính component đó tự viết ra).
2. **Content Queries**: Truy vấn những gì thuộc về **Content ngoại lai** (Nội dung HTML được Component cha bên ngoài chiếu vào thông qua `<ng-content>`).

---

#### 10.1. Bảng So Sánh Chi Tiết (Cheat Sheet Phỏng Vấn)

| Tiêu chí | View Queries (`ViewChild` / `viewChild`) | Content Queries (`ContentChild` / `contentChild`) |
| :--- | :--- | :--- |
| **Vùng tìm kiếm** | Nằm bên trong **Template nội bộ** của component (`template` hoặc `templateUrl`). | Nằm giữa cặp thẻ đóng mở của component do **bên ngoài truyền vào qua `<ng-content>`**. |
| **Cú pháp Cũ (Decorator)** | `@ViewChild('myRef')`, `@ViewChildren(MyComponent)` | `@ContentChild('myRef')`, `@ContentChildren(MyComponent)` |
| **Cú pháp Mới (Signal-based v17.2+)** | `myRef = viewChild<ElementRef>('myRef')`<br>`list = viewChildren(MyComponent)` | `myRef = contentChild<ElementRef>('myRef')`<br>`list = contentChildren(MyComponent)` |
| **Thời điểm sẵn sàng dữ liệu (Lifecycle)** | ⏳ **`ngAfterViewInit`** (Sau khi toàn bộ template của nó và các view con render xong). | ⚡ **`ngAfterContentInit`** (Đến sớm hơn! Ngay khi khối `<ng-content>` vừa được nạp vào). |
| **Nếu đọc tại `ngOnInit`** | ❌ **`undefined`** (DOM nội bộ chưa vẽ xong). | ❌ **`undefined`** (Content chưa khởi tạo xong). |
| **Kiểu dữ liệu trả về với Signals** | `Signal<T | undefined>` (hoặc `viewChild.required<T>()`) | `Signal<T | undefined>` (hoặc `contentChild.required<T>()`) |

---

#### 10.2. Sơ Đồ Cấu Trúc Trực Quan: Đâu là View? Đâu là Content?

```html
<!-- TRONG TEMPLATE CỦA PARENT COMPONENT: -->
<app-card>
  <!-- ================================================================= -->
  <!-- ĐÂY CHÍNH LÀ CONTENT (Content Projection - Được truyền từ ngoài vào) -->
  <!-- app-card sẽ dùng contentChild / ContentChild để truy vấn phần tử này! -->
  <!-- ================================================================= -->
  <button #externalBtn>Nút Bấm Từ Cha Truyền Vào</button>
</app-card>


<!-- TRONG TEMPLATE NỘI BỘ CỦA APP-CARD COMPONENT (card.component.html): -->
<div class="card-wrapper">
  <!-- 1. Đây là VIEW NỘI BỘ của app-card (Dùng viewChild để query) -->
  <h2 #cardHeader>Tiêu Đề Nội Bộ Của Card</h2>

  <!-- 2. Nơi đón nhận Content từ bên ngoài đổ vào: -->
  <div class="projected-slot">
    <ng-content></ng-content>
  </div>
</div>
```

---

#### 10.3. Code Ví Dụ Toàn Diện Cả Hai Cú Pháp (Cũ Decorator vs Mới Signal) Kèm Data Log Thực Tế

Hãy tạo một bộ Component gồm: `<app-item>` (Con) được chiếu vào `<app-box>` (Thùng chứa).

##### 1. Component Con được chiếu vào: `<app-item>`
```typescript
// item.component.ts
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item',
  standalone: true,
  template: `<div class="badge">Phần tử: {{ label() }}</div>`
})
export class ItemComponent {
  label = input.required<string>();

  sayHello() {
    return `Chào từ Item: ${this.label()}`;
  }
}
```

##### 2. Component Thùng Chứa: `<app-box>` (Nơi thực hiện cả View Query và Content Query)
```typescript
// box.component.ts
import { 
  Component, 
  ElementRef, 
  OnInit, 
  AfterContentInit, 
  AfterViewInit,
  // Cú pháp Cũ (Decorators):
  ViewChild, 
  ContentChild, 
  ViewChildren,
  ContentChildren,
  QueryList,
  // Cú pháp Mới (Signals):
  viewChild, 
  contentChild,
  viewChildren,
  contentChildren
} from '@angular/core';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-box',
  standalone: true,
  template: `
    <div class="box-container" style="border: 2px dashed #3b82f6; padding: 16px;">
      <!-- VIEW NỘI BỘ: Thẻ h3 và input này do chính box.component sở hữu -->
      <h3 #boxTitle>Tiêu đề của Box (View Query)</h3>
      <input #internalInput value="Dữ liệu nội bộ" />

      <!-- KHU VỰC CHIẾU CONTENT: Nhận các <app-item> từ bên ngoài đổ vào -->
      <div class="content-slot" style="background: #f1f5f9; padding: 12px; margin-top: 8px;">
        <p>Vùng hiển thị nội dung bên ngoài chiếu vào:</p>
        <ng-content></ng-content>
      </div>
    </div>
  `
})
export class BoxComponent implements OnInit, AfterContentInit, AfterViewInit {

  // =========================================================================
  // CÁCH MỚI: SIGNAL-BASED QUERIES (Angular 17.2+) - KHUYÊN DÙNG
  // =========================================================================
  // 1. View Queries bằng Signal: Trả về Signal<ElementRef | undefined>
  titleSignal = viewChild<ElementRef<HTMLHeadingElement>>('boxTitle');
  inputSignal = viewChild.required<ElementRef<HTMLInputElement>>('internalInput');

  // 2. Content Queries bằng Signal: Truy vấn Component hoặc thẻ chiếu qua <ng-content>
  projectedItemSignal = contentChild(ItemComponent);
  allProjectedItemsSignal = contentChildren(ItemComponent);


  // =========================================================================
  // CÁCH CŨ: DECORATOR-BASED QUERIES
  // =========================================================================
  @ViewChild('boxTitle') titleDecorator!: ElementRef<HTMLHeadingElement>;
  @ContentChild(ItemComponent) projectedItemDecorator!: ItemComponent;
  @ContentChildren(ItemComponent) allItemsDecorator!: QueryList<ItemComponent>;


  // =========================================================================
  // KIỂM CHỨNG VÒNG ĐỜI VÀ IN DATA LOG RA CONSOLE
  // =========================================================================

  // [1] Tại ngOnInit: Lúc này DOM VÀ CONTENT ĐỀU CHƯA SẴN SÀNG!
  ngOnInit() {
    console.log('--- [1. ngOnInit] ---');
    console.log('viewChild (Signal):', this.titleSignal()); // undefined
    console.log('@ViewChild (Decorator):', this.titleDecorator); // undefined
    console.log('contentChild (Signal):', this.projectedItemSignal()); // undefined
  }

  // [2] Tại ngAfterContentInit: CONTENT NGOẠI LAI VỪA KHỞI TẠO XONG (View nội bộ VẪN CHƯA XONG!)
  ngAfterContentInit() {
    console.log('--- [2. ngAfterContentInit] ---');
    console.log('contentChild (Signal):', this.projectedItemSignal()?.sayHello());
    console.log('Tổng số item được chiếu vào (Signal):', this.allProjectedItemsSignal().length);
    console.log('@ContentChild (Decorator):', this.projectedItemDecorator?.sayHello());

    // CẢNH BÁO: View Query tại thời điểm này vẫn chưa an toàn!
    console.log('viewChild lúc này (chưa có):', this.titleSignal()); // undefined hoặc chưa gắn xong
  }

  // [3] Tại ngAfterViewInit: TOÀN BỘ VIEW NỘI BỘ VÀ VIEW CON ĐÃ VẼ XONG 100%!
  ngAfterViewInit() {
    console.log('--- [3. ngAfterViewInit] ---');
    // Truy cập thẻ HTML thật nội bộ
    const h3El = this.titleSignal()?.nativeElement;
    console.log('viewChild Native Element:', h3El?.textContent); // "Tiêu đề của Box (View Query)"

    const inputVal = this.inputSignal().nativeElement.value;
    console.log('Internal Input Value:', inputVal); // "Dữ liệu nội bộ"

    // Thao tác đổi màu style DOM an toàn
    if (h3El) {
      h3El.style.color = '#ef4444';
    }
  }
}
```

##### 3. Component Cha sử dụng: `<app-parent>`
```typescript
// parent.component.ts
import { Component } from '@angular/core';
import { BoxComponent } from './box.component';
import { ItemComponent } from './item.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [BoxComponent, ItemComponent],
  template: `
    <h2>Màn Hình Quản Lý Parent</h2>

    <app-box>
      <!-- HAI THẺ DƯỚI ĐÂY NẰM GIỮA CẶP THẺ ĐÓNG MỞ CỦA APP-BOX -->
      <!-- ĐÂY CHÍNH LÀ DỮ LIỆU ĐƯỢC CONTENT QUERY TÌM THẤY! -->
      <app-item label="Thẻ VIP 01" />
      <app-item label="Thẻ Standard 02" />
    </app-box>
  `
})
export class ParentComponent {}
```

---

#### 10.4. Log Output Thực Tế Trên DevTools Console

Khi trang web vừa tải xong, thứ tự log in ra trên Console như sau:

```text
--- [1. ngOnInit] ---
viewChild (Signal): undefined
@ViewChild (Decorator): undefined
contentChild (Signal): undefined

--- [2. ngAfterContentInit] ---
contentChild (Signal): "Chào từ Item: Thẻ VIP 01"
Tổng số item được chiếu vào (Signal): 2
@ContentChild (Decorator): "Chào từ Item: Thẻ VIP 01"
viewChild lúc này: undefined

--- [3. ngAfterViewInit] ---
viewChild Native Element: "Tiêu đề của Box (View Query)"
Internal Input Value: "Dữ liệu nội bộ"
```

---

#### 10.5. Sự Vượt Trội Của Cú Pháp Mới `viewChild()` / `contentChild()` (Signals) So Với `@ViewChild` Cũ

| Điểm khác biệt | Cũ (`@ViewChild`) | Mới (`viewChild()` / `contentChild()`) |
| :--- | :--- | :--- |
| **Kiểu dữ liệu** | Biến thông thường (`ElementRef` hoặc `undefined`). | **Signal**: Tự động tích hợp vào hệ thống phản ứng (Reactivity). |
| **Bắt sự kiện biến mất/xuất hiện** | Nếu phần tử nằm trong `*ngIf`, khi `*ngIf` đổi từ `false` sang `true`, bạn phải dùng Setter: `set myEl(val: ElementRef) { ... }` rất phức tạp. | Dùng trực tiếp với **`effect()`** hoặc **`computed()`**: Hễ phần tử xuất hiện trong DOM là Signal tự đổi giá trị và trigger effect ngay! |
| **Độ an toàn Type-Safety** | Phải gán non-null assertion `!` (dễ dính lỗi gõ nhầm runtime nếu thẻ không có). | Có sẵn hàm **`.required()`** (ví dụ `viewChild.required('myInput')`): Nếu trong template không có thẻ này, Angular sẽ báo lỗi đỏ tường minh ngay lúc chạy! |

##### Ví dụ dùng `effect()` lắng nghe sự xuất hiện của `viewChild`:
```typescript
export class AutoFocusComponent {
  // Tự động bắt khi thẻ input xuất hiện trong DOM (kể cả khi bị bọc trong @if)
  searchBox = viewChild<ElementRef<HTMLInputElement>>('searchBox');

  constructor() {
    effect(() => {
      const inputRef = this.searchBox();
      if (inputRef) {
        console.log('⚡ Input vừa xuất hiện trong DOM -> Tự động Focus!');
        inputRef.nativeElement.focus();
      }
    });
  }
}
```

---

# B. RXJS & XỬ LÝ BẤT ĐỒNG BỘ CHUYÊN SÂU

---

### 11. Các Khái Niệm Cốt Lõi Của RxJS

* **`Observable`**: Dòng suối dữ liệu có thể phát ra nhiều giá trị theo thời gian.
* **`Observer`**: Người đón nhận dữ liệu với 3 hàm callback: `next()`, `error()`, `complete()`.
* **`Subscription`**: Hợp đồng lắng nghe, đại diện cho tiến trình thực thi, dùng để gọi `.unsubscribe()`.

---

### 12. Phân Biệt Tường Tận 4 Loại Subject: `Subject` vs `BehaviorSubject` vs `ReplaySubject` vs `AsyncSubject`

`Subject` là một Observable đặc biệt vừa là **Observable** (cho phép subscribe) vừa là **Observer** (cho phép gọi `.next()`, `.error()`, `.complete()`).

#### Bảng so sánh 4 loại Subject (Cheat Sheet Phỏng Vấn)

| Tiêu chí | `Subject` | `BehaviorSubject` | `ReplaySubject(N)` | `AsyncSubject` |
| :--- | :--- | :--- | :--- | :--- |
| **Cần giá trị khởi tạo?** | ❌ Không | ✅ **Bắt buộc** (`new BehaviorSubject(val)`) | ❌ Không | ❌ Không |
| **Đọc giá trị đồng bộ tức thì** | ❌ Không có hàm đọc | ✅ Có hàm **`.getValue()`** | ❌ Không | ❌ Không |
| **Hành vi khi có Subscriber mới** | **Chỉ nhận** các giá trị phát ra **sau** thời điểm đăng ký. Giá trị trước đó bị mất vĩnh viễn. | **Nhận ngay lập tức 1 giá trị hiện tại mới nhất**, sau đó mới nhận các giá trị tiếp theo. | **Phát lại N giá trị cũ** đã phát trong quá khứ (buffer), bất kể subscriber đến muộn cỡ nào. | **Không phát gì cả** cho đến khi gọi `.complete()`. Khi đó chỉ phát **duy nhất 1 giá trị cuối cùng**. |
| **Use-case thực tế** | Bắn sự kiện click nút bấm, trigger event không cần lưu lịch sử. | Lưu thông tin User đăng nhập, Theme hiện tại (Dark/Light), giỏ hàng mua sắm. | Lưu lịch sử Chat tin nhắn, lưu cache n bản tin chứng khoán gần nhất. | Chờ một phép tính toán siêu nặng chạy xong hoặc chờ file tải hoàn tất. |

#### Minh họa Code chi tiết từng loại:

```typescript
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

// --------------------------------------------------------------------------
// 1. SUBJECT THƯỜNG
// --------------------------------------------------------------------------
const subject = new Subject<number>();
subject.next(1);
subject.subscribe(val => console.log('Subject Sub 1:', val)); // Đến muộn sau khi 1 đã phát
subject.next(2);
// Output: "Subject Sub 1: 2" (Mất số 1)

// --------------------------------------------------------------------------
// 2. BEHAVIORSUBJECT
// --------------------------------------------------------------------------
const behavior = new BehaviorSubject<string>('Khởi tạo');
behavior.next('Đang hoạt động');
behavior.subscribe(val => console.log('Behavior Sub 1:', val)); 
// Output: "Behavior Sub 1: Đang hoạt động" (Nhận ngay giá trị hiện tại!)
console.log('Đọc tức thì:', behavior.getValue()); // "Đang hoạt động"

// --------------------------------------------------------------------------
// 3. REPLAYSUBJECT (Lưu lại 2 phần tử gần nhất)
// --------------------------------------------------------------------------
const replay = new ReplaySubject<string>(2);
replay.next('Tin nhắn 1');
replay.next('Tin nhắn 2');
replay.next('Tin nhắn 3');
replay.subscribe(val => console.log('Replay Sub:', val));
// Output:
// "Replay Sub: Tin nhắn 2"
// "Replay Sub: Tin nhắn 3" (Phát lại 2 giá trị gần nhất)

// --------------------------------------------------------------------------
// 4. ASYNCSUBJECT
// --------------------------------------------------------------------------
const asyncSub = new AsyncSubject<number>();
asyncSub.next(10);
asyncSub.next(20);
asyncSub.next(30);
asyncSub.subscribe(val => console.log('AsyncSub:', val)); 
// Lúc này CHƯA có gì in ra màn hình!

asyncSub.complete(); // Đóng stream
// Output: "AsyncSub: 30" (Chỉ in ra giá trị cuối cùng tại thời điểm complete)
```

---

### 13. Các Toán Tử Kết Hợp (Combination Operators)

* **`forkJoin`**: Chờ **tất cả luồng hoàn thành (complete)**, trả về giá trị cuối cùng của mỗi luồng (giống `Promise.all`).
* **`combineLatest`**: Chỉ cần mỗi luồng phát ra ít nhất 1 lần, sau đó **hễ bất kỳ luồng nào đổi** là gom ngay bộ giá trị mới nhất.
* **`zip`**: Ghép các giá trị theo cặp chỉ số đồng nhất (Phần tử 1 luồng A đi với phần tử 1 luồng B).
* **`concat`**: Chạy tuần tự (Luồng 1 xong mới cho luồng 2 chạy).
* **`merge`**: Chạy song song (Luồng nào có dữ liệu trước thì đẩy ra trước).

---

### 14. Phân Biệt Chuyên Sâu 4 Toán Tử Biến Đổi: `switchMap` vs `concatMap` vs `mergeMap` vs `exhaustMap`

Các toán tử này (gọi là **Flattening / Higher-order Mapping Operators**) dùng khi một Observable phát ra giá trị và giá trị đó lại kích hoạt một Observable con (ví dụ: User click chuột $\rightarrow$ Gọi API HTTP).

#### Bảng so sánh chiến lược xử lý (Cheat Sheet Phỏng Vấn)

| Toán tử | Cơ chế khi Inner Observable mới xuất hiện | Thứ tự hoàn thành | Use-case chuẩn xác |
| :--- | :--- | :--- | :--- |
| **`switchMap`** | 🛑 **HỦY NGAY LẬP TỨC (Unsubscribe)** request cũ đang chạy dở, chỉ chạy request mới nhất. | Luôn lấy kết quả của request cuối cùng. | **Ô tìm kiếm Auto-complete**, chuyển tab, xem chi tiết bài viết theo ID trên URL. |
| **`concatMap`** | ⏳ **XẾP HÀNG ĐỢI (Queue/FIFO)**. Đợi request trước hoàn thành xong xuôi mới chạy request tiếp theo. | Bảo toàn thứ tự 100% như lúc phát ra. | **Upload danh sách file tuần tự**, lưu nhật ký log theo đúng thứ tự thời gian. |
| **`mergeMap`** | ⚡ **CHẠY SONG SONG TẤT CẢ (Concurrent)**. Không hủy, không chờ ai, request nào xong trước trả về trước. | Tùy tốc độ mạng, không đảm bảo thứ tự. | Xóa hàng loạt mục cùng lúc, tải chi tiết của 10 item song song. |
| **`exhaustMap`**| 🛡️ **BỎ QUA / PHỚT LỜ (Ignore)** request mới nếu request hiện tại vẫn còn đang chạy dở. | Chỉ giữ request đầu tiên, từ chối request đến sau. | **Nút bấm Đăng Nhập / Đặt Hàng / Mua Vé**: Chống click đúp chuột spam gửi trùng đơn hàng. |

#### Code ví dụ thực chiến phân biệt rõ ràng:

```typescript
import { fromEvent } from 'rxjs';
import { switchMap, concatMap, mergeMap, exhaustMap } from 'rxjs/operators';

// Giả lập hàm gọi API mất 2 giây mới trả về kết quả
function callApi(param: string) {
  return http.get(`/api/data?q=${param}`);
}

// 1. switchMap: Gõ chữ 'A', đang đợi thì gõ tiếp 'AB' -> Hủy ngay request 'A', chỉ lấy 'AB'
searchTerm$.pipe(
  switchMap(term => callApi(term))
).subscribe();

// 2. concatMap: Chọn upload 3 ảnh -> Upload xong ảnh 1 mới upload ảnh 2, xong ảnh 2 mới sang ảnh 3
uploadFiles$.pipe(
  concatMap(file => uploadApi(file))
).subscribe();

// 3. mergeMap: Bấm xóa 5 dòng cùng lúc -> Bắn 5 request HTTP song song ra server cùng 1 tích tắc
deleteIds$.pipe(
  mergeMap(id => deleteApi(id))
).subscribe();

// 4. exhaustMap: User click liên tục 5 lần vào nút "Thanh Toán"
// -> Request lần 1 đang chạy, 4 lần click sau bị hủy bỏ hoàn toàn! Chỉ gửi đúng 1 request!
btnSubmitClicks$.pipe(
  exhaustMap(() => checkoutApi())
).subscribe();
```

---

### 15. Kỹ Thuật Giải Phóng Bộ Nhớ (Unsubscribe)

```typescript
// 1. Cũ: takeUntil với Subject
private destroy$ = new Subject<void>();
data$.pipe(takeUntil(this.destroy$)).subscribe();
ngOnDestroy() { this.destroy$.next(); this.destroy$.complete(); }

// 2. Mới (Angular 16+ Khuyến nghị): takeUntilDestroyed
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

constructor() {
  // Tự động nhận diện lifecycle của Component/Service hiện tại để hủy
  data$.pipe(takeUntilDestroyed()).subscribe();
}
```

---

# C. DEPENDENCY INJECTION (DI) & PROVIDERS CHUYÊN SÂU

---

### 16. Cơ Chế Hoạt Động Của DI & Functional `inject()`

Angular sử dụng cơ chế **Hierarchical Dependency Injection** (Hệ thống phân cấp hình cây). Khi cần một dependency:
1. Injector tìm tại chính Component / Directive hiện tại (ElementInjector).
2. Nếu không thấy, tìm ngược lên Component cha $\rightarrow$ Component ông bà...
3. Nếu không thấy, tìm lên `EnvironmentInjector` (`root` / `platform`).
4. Nếu vẫn không thấy và không có `@Optional()` $\rightarrow$ Quăng lỗi `NullInjectorError`.

#### So sánh `constructor` vs `inject()`:
```typescript
// Cũ (Constructor-based): Phải khai báo dài dòng trong constructor, khó tái sử dụng
constructor(private http: HttpClient, private route: ActivatedRoute) {}

// Mới (v14+ Functional inject): Gọn gàng, type inference chính xác,
// có thể viết thành các custom composable helper functions dùng ở mọi nơi!
private http = inject(HttpClient);
private route = inject(ActivatedRoute);
```

---

### 17. Phân Biệt Toàn Diện Các Loại Provider (`useClass` vs `useValue` vs `useFactory` vs `useExisting`) & `InjectionToken`

Provider là "công thức chế biến" nói cho Angular Injector biết cách tạo ra hoặc cung cấp giá trị cho một DI Token.

```typescript
{ provide: DI_TOKEN, ...công_thức }
```

#### 17.1. Bảng so sánh 4 loại Provider chính (Cheat Sheet Phỏng Vấn)

| Loại Provider | Có tạo Instance mới không? | Nhận đầu vào | Trường hợp sử dụng kinh điển |
| :--- | :---: | :--- | :--- |
| **`useClass`** | ✅ **CÓ** (Tạo mới instance riêng) | Một Class (`Type<T>`) | **Mocking trong Unit Test**: Thay Service thật bằng Service giả; Hoán đổi class theo môi trường. |
| **`useValue`** | ❌ **KHÔNG** (Nhận trực tiếp giá trị) | Tĩnh: Object, String, Number | **Truyền cấu hình môi trường**: API Endpoint, API Key, theme config cố định. |
| **`useFactory`** | Tùy vào code bên trong hàm return | Function `(...deps) => value` | **Khởi tạo động theo điều kiện `if/else`**: Đọc Token từ LocalStorage/Cookie, nhận dependencies khác để tính toán. |
| **`useExisting`** | ❌ **KHÔNG** (Dùng chung instance đã có) | Một Token khác đã tồn tại | **Cầu nối `NG_VALUE_ACCESSOR` trong CVA** để dùng lại chính component đang render; Gom nhóm/rút gọn interface. |

---

#### 17.2. Phân tích chi tiết kèm Code ví dụ thực chiến

##### 1. `useClass` – Khởi tạo instance mới từ Class:
Mỗi khi injector resolve token này, nó sẽ gọi `new MyClass()`.
```typescript
export abstract class LoggerService {
  abstract log(msg: string): void;
}

@Injectable()
export class ConsoleLogger extends LoggerService {
  log(msg: string) { console.log('[Console]:', msg); }
}

@Injectable()
export class ServerLogger extends LoggerService {
  log(msg: string) { /* Gửi log lên Datadog/Sentry qua HTTP */ }
}

// Cấu hình: Thay thế class thực thi mà không sửa code của component
export const loggerProvider = {
  provide: LoggerService,
  useClass: isProduction ? ServerLogger : ConsoleLogger
};
```

##### 2. `useValue` – Cung cấp trực tiếp Object / Giá trị tĩnh:
Không cần Angular gọi hàm khởi tạo, đưa giá trị nào dùng đúng giá trị đó.
```typescript
export interface AppConfig {
  apiUrl: string;
  maxRetry: number;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG');

export const appConfigProvider = {
  provide: APP_CONFIG,
  useValue: {
    apiUrl: 'http://localhost:3000/api',
    maxRetry: 3
  }
};
```

##### 3. `useFactory` – Khởi tạo động bằng hàm (Có thể nhận Dependency):
Thực thi một hàm logic tại thời điểm runtime để quyết định trả về cái gì.
```typescript
export const authServiceProvider = {
  provide: AuthService,
  // Cách mới: Dùng trực tiếp inject() bên trong factory
  useFactory: () => {
    const http = inject(HttpClient);
    const config = inject(APP_CONFIG);
    const isMock = localStorage.getItem('MOCK_AUTH') === 'true';

    return isMock ? new MockAuthService() : new RealAuthService(http, config.apiUrl);
  }
};
```

##### 4. `useExisting` – Tạo bí danh (Alias) trỏ về instance ĐÃ TỒN TẠI:
> ⚠️ **Sự khác biệt chí mạng với `useClass`:**
> - Nếu dùng `useClass`: Angular sẽ `new` thêm một instance thứ 2 độc lập trong RAM $\rightarrow$ Bị lệch State dữ liệu!
> - Nếu dùng `useExisting`: Cả 2 Token cùng trỏ về **chính xác 1 instance duy nhất** trong RAM.

```typescript
// Cầu nối bắt buộc trong ControlValueAccessor (Custom Form Control):
providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    // "Hãy trỏ về chính component StarRatingComponent đang vẽ trên màn hình, không được new thêm!"
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
  }
]
```

##### 5. `InjectionToken` – Chìa khóa cho kiểu dữ liệu không phải Class:
Trong TypeScript, `interface` và `type` bị xóa sạch (tree-shaken) khi biên dịch sang JavaScript. Do đó không thể dùng interface làm DI token. `InjectionToken` tạo ra một đối tượng thực tế tồn tại trong JS runtime để làm định danh duy nhất.
```typescript
// Khởi tạo Tree-shakeable Token tự cung cấp giá trị mặc định:
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL', {
  providedIn: 'root',
  factory: () => 'https://api.devblog.com'
});

// Inject sử dụng:
const baseUrl = inject(API_BASE_URL);
```

---

### 18. Bốn Resolution Modifiers Kiểm Soát Cây Injector: `@Self`, `@SkipSelf`, `@Optional`, `@Host`

Mặc định, khi một Component yêu cầu một dependency, Angular sẽ tìm kiếm tại chính nó, sau đó leo ngược lên từng node cha cho đến tận root (`Bubble-up search`). 

**Resolution Modifiers** cho phép bạn bẻ lái hành vi tìm kiếm này:

```
                  [ Root Injector ]
                          ▲
                          │
                [ Parent Component ]
                          ▲
                          │
  [@Host Boundary] [ Host Component (Thẻ chứa) ]
                          ▲
                          │
                 [ Child Component ] ◄── Điểm bắt đầu inject
```

#### 18.1. Bảng đối chiếu 4 Resolution Modifiers (Cheat Sheet)

| Modifier | Hướng tìm kiếm | Hành vi khi KHÔNG tìm thấy | Use-case thực tế điển hình |
| :--- | :--- | :--- | :--- |
| **`@Self()`** | **CHỈ tìm tại chính phần tử hiện tại**. Tuyệt đối không leo lên cha. | Quăng lỗi `NullInjectorError` (trừ khi đi kèm `@Optional`). | Muốn chắc chắn Component đang dùng instance Service được cấp phát riêng cho chính nó (không dùng ké của cha). |
| **`@SkipSelf()`** | **BỎ QUA chính nó**, bắt đầu tìm từ phần tử cha trở lên. | Quăng lỗi nếu toàn bộ cây cha không ai có. | Tránh đệ quy lặp vô hạn (Infinite loop) khi viết Wrapper Service hoặc Decorator Service mở rộng. |
| **`@Optional()`** | Tìm bình thường (từ nó lên root). | **Không quăng lỗi**, trả về `null` an toàn. | Các tính năng tùy chọn (Plugin, Logger, Config) có thì dùng, không có thì chạy fallback. |
| **`@Host()`** | Tìm từ nó lên đến **Component chủ quản (Host Component)** chứa template đó thì dừng lại. | Không tìm ra ngoài phạm vi thẻ Host. | Thường dùng trong **Directive** để tìm Service của Component đang gắn Directive đó. |

---

#### 18.2. So sánh cú pháp Cũ (Decorator) vs Mới (`inject()` options - Angular 14+)

Từ Angular 14+, bạn không cần viết decorator `@Self`, `@Optional` lằng nhằng trong constructor nữa, mà truyền thẳng vào object options của hàm `inject()`:

```typescript
// =========================================================================
// 1. @Optional: Không có thì trả về null chứ không crash app
// =========================================================================
// Cũ:
constructor(@Optional() private logger: LoggerService) {}
// Mới:
private logger = inject(LoggerService, { optional: true });


// =========================================================================
// 2. @Self: Bắt buộc lấy service được khai báo ở providers của chính component này
// =========================================================================
// Cũ:
constructor(@Self() private formService: FormStateService) {}
// Mới:
private formService = inject(FormStateService, { self: true });


// =========================================================================
// 3. @SkipSelf: Bỏ qua chính nó, lấy service của cha
// =========================================================================
// Cũ:
constructor(@SkipSelf() private parentService: TreeService) {}
// Mới:
private parentService = inject(TreeService, { skipSelf: true });


// =========================================================================
// 4. @Host: Dừng lại ở ranh giới Host Component
// =========================================================================
// Cũ:
constructor(@Host() private hostCard: CardComponent) {}
// Mới:
private hostCard = inject(CardComponent, { host: true });
```

---

#### 18.3. Ví dụ thực chiến kinh điển về `@SkipSelf()`: Tránh lỗi đệ quy lặp vô hạn

Giả sử bạn muốn tạo một Service `CustomLoggerService` kế thừa từ `LoggerService` của cấp cha và ghi đè thêm tính năng, nếu không dùng `@SkipSelf` nó sẽ tự inject chính nó gây lỗi **Circular Dependency**:

```typescript
@Injectable()
export class CustomLoggerService {
  // Bắt buộc bỏ qua chính nó để lấy LoggerService của cha!
  private parentLogger = inject(LoggerService, { skipSelf: true });

  log(msg: string) {
    console.log('📌 [Custom Tag]: ' + msg);
    this.parentLogger.log(msg); // Gọi tiếp logger cha
  }
}
```

---

# D. CUSTOM FORM CONTROL & COMPONENT NÂNG CAO

---

### 19. ControlValueAccessor (CVA) Toàn Diện

> **Định nghĩa:** `ControlValueAccessor` là chiếc cầu nối 2 chiều biến bất kỳ Component tự tạo nào thành một Form Control chuẩn mực của Angular (tương thích `formControlName`, validation, `ngModel`).

#### 19.1. Sơ đồ giao tiếp 2 chiều
```
[ Angular Form Model ] ──── writeValue(val) ───► [ Custom Component UI ]
[ Angular Form Model ] ◄── onChange(newVal) ──── [ Custom Component UI ]
[ Angular Form Model ] ◄── onTouched() ───────── [ Custom Component UI (Blur) ]
```

#### 19.2. Bốn phương thức cốt lõi
1. **`writeValue(value)`**: Form Model đẩy giá trị vào Component $\rightarrow$ Cập nhật hiển thị.
2. **`registerOnChange(fn)`**: Lưu hàm callback để gọi `this.onChange(val)` khi user đổi dữ liệu.
3. **`registerOnTouched(fn)`**: Lưu hàm callback để gọi `this.onTouched()` khi user click ra ngoài (để hiện lỗi đỏ validation).
4. **`setDisabledState(isDisabled)`**: Khóa/mở khóa giao diện khi form bị disable.

#### 19.3. Code mẫu Đánh giá Sao (`<app-star-rating>`) chuẩn Signals
```typescript
@Component({
  selector: 'app-star-rating',
  standalone: true,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => StarRatingComponent),
    multi: true
  }],
  template: `
    @for (star of [1,2,3,4,5]; track star) {
      <span (click)="rate(star)">{{ star <= rating() ? '★' : '☆' }}</span>
    }
  `
})
export class StarRatingComponent implements ControlValueAccessor {
  rating = signal(0);
  private onChange = (v: number) => {};
  private onTouched = () => {};

  writeValue(v: number): void { this.rating.set(v || 0); }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  rate(val: number) {
    this.rating.set(val);
    this.onChange(val);   // Báo cho Form biết
    this.onTouched();     // Báo cho Form biết đã touched
  }
}
```

---

### 20. CDK Overlay (Thư Viện Angular Material CDK)

Công cụ mạnh mẽ để dựng: Tooltip, Dropdown, Modal Popup lơ lửng trên màn hình:
* **`Overlay`**: Service dùng để tính toán tọa độ và tạo ra `OverlayRef`.
* **`OverlayRef`**: Chiếc cổng portal bao quanh phần tử nổi.
* **`ComponentPortal`**: Gắn động một component TypeScript vào Overlay.

---

# E. ANGULAR SIGNALS & ASYNCHRONOUS RESOURCE MANAGEMENT

---

### 21. Angular Signals Toàn Diện (`signal` vs `computed` vs `linkedSignal`)

#### 21.1. Bảng so sánh 3 loại Signals (Cheat Sheet)

| Tiêu chí | `signal()` | `computed()` | `linkedSignal()` (v19+) |
| :--- | :--- | :--- | :--- |
| **Bản chất** | **State gốc (Source of truth)** | **State phái sinh (Read-only)** | **State phụ thuộc nhưng cho phép ghi đè** |
| **Khả năng ghi** | ✅ `.set()`, `.update()` | ❌ Không (Lỗi biên dịch) | ✅ `.set()`, `.update()` |
| **Khi nguồn đổi** | Độc lập, không bị ảnh hưởng | Tự tính toán ra giá trị mới | 🔄 **TỰ RESET VỀ GIÁ TRỊ MẶC ĐỊNH MỚI** |
| **Ứng dụng điển hình** | Dữ liệu gốc, input form | Lọc mảng, tính tổng tiền, đếm số lượng | Lựa chọn item, số trang pagination |

---

### 22. Bắt Cầu Tương Tác Giữa Signals và RxJS (RxJS Interop)

Kỹ thuật Debounce Tìm Kiếm (Signal $\rightarrow$ RxJS $\rightarrow$ Signal):
```typescript
export class BlogSearchComponent {
  // 1. Signal tức thời gắn vào ô input
  keyword = signal('');

  // 2. Chuyển sang Observable để debounce 400ms -> Ép ngược về Signal
  debouncedKeyword = toSignal(
    toObservable(this.keyword).pipe(
      debounceTime(400),
      distinctUntilChanged()
    ),
    { initialValue: '' }
  );

  // 3. computed chỉ chạy lọc khi người dùng đã dừng gõ đủ 400ms
  filteredBlogs = computed(() => {
    const q = this.debouncedKeyword().toLowerCase();
    return this.blogs().filter(b => b.title.toLowerCase().includes(q));
  });
}
```

---

### 23. Asynchronous State Toàn Diện Với `resource()` & `rxResource()` (Angular 19+)

Trước Angular 19, để tải dữ liệu bất đồng bộ từ API về UI, bạn phải dùng Observable kèm `async` pipe hoặc viết `effect()` thủ công rất cồng kềnh.

**`resource()` (dùng Promise/Fetch)** và **`rxResource()` (dùng Observable/HttpClient)** là API chính thức giúp bạn quản lý toàn bộ vòng đời của dữ liệu bất đồng bộ bằng Signals!

#### 23.1. Bảng tra cứu trạng thái chi tiết `ResourceStatus`

Thuộc tính `myResource.status()` trả về một enum `ResourceStatus`:

| Trạng thái Enum | Giá trị mô tả | Thời điểm xảy ra |
| :--- | :---: | :--- |
| **`ResourceStatus.Idle`** | `0` | Trạng thái rỗng ban đầu, loader chưa từng được gọi (ví dụ params trả về `undefined`). |
| **`ResourceStatus.Loading`** | `1` | Đang tải dữ liệu lần đầu tiên (hiện Skeleton hoặc Spinner chính). |
| **`ResourceStatus.Reloading`** | `2` | Đang tải lại dữ liệu (khi gọi `.reload()` hoặc params đổi giá trị mới). Dữ liệu cũ vẫn được giữ nguyên trên UI giúp màn hình không bị giật. |
| **`ResourceStatus.Resolved`** | `4` | Tải dữ liệu thành công, `myResource.value()` đang chứa dữ liệu thật. |
| **`ResourceStatus.Error`** | `5` | Gặp lỗi mạng hoặc HTTP error, `myResource.error()` chứa thông tin lỗi. |
| **`ResourceStatus.Local`** | `3` | Dữ liệu vừa bị ghi đè cục bộ trên UI thông qua `.value.set()` hoặc `.value.update()` (phục vụ kỹ thuật **Optimistic UI Update**). |

---

#### 23.2. Các phương thức và thuộc tính cốt lõi của Resource

* `value()`: Signal đọc dữ liệu trả về.
* `value.set(newValue)`: Ghi đè dữ liệu mới mà không cần gọi lại API.
* `value.update(fn)`: Cập nhật dữ liệu tức thì (Optimistic Update).
* `isLoading()`: Boolean Signal trả về `true` khi đang ở trạng thái `Loading` hoặc `Reloading`.
* `hasValue()`: Type guard kiểm tra an toàn xem dữ liệu đã có sẵn sàng chưa (tránh lỗi null/undefined).
* `error()`: Signal chứa lỗi (nếu có).
* `reload()`: Kích hoạt gọi lại API bằng tay.
* `destroy()`: Hủy resource và tự động ngắt kết nối mạng qua `abortSignal`.

---

#### 23.3. Code ví dụ toàn diện: Quản Lý Bài Viết Blog với `resource()` (Fetch & AbortSignal)

```typescript
import { Component, signal, resource, ResourceStatus } from '@angular/core';

interface BlogPost {
  id: number;
  title: string;
  category: string;
  favorite: boolean;
}

@Component({
  selector: 'app-blog-resource',
  standalone: true,
  template: `
    <div class="card">
      <div class="controls">
        <button (click)="changeBlogId(1)">Bài viết 1</button>
        <button (click)="changeBlogId(2)">Bài viết 2</button>
        <button (click)="blogResource.reload()">🔄 Tải Lại (Reload)</button>
      </div>

      <!-- Đọc status chi tiết -->
      <p>Trạng thái mạng: <strong>{{ getStatusText() }}</strong></p>

      <!-- 1. Trạng thái Loading -->
      @if (blogResource.isLoading()) {
        <p class="loading">⏳ Đang đồng bộ từ máy chủ...</p>
      }

      <!-- 2. Trạng thái Error -->
      @if (blogResource.error(); as err) {
        <div class="error-box">
          <p>❌ Có lỗi: {{ err.message }}</p>
          <button (click)="blogResource.reload()">Thử lại</button>
        </div>
      }

      <!-- 3. Trạng thái Resolved / Local (Đã có dữ liệu) -->
      @if (blogResource.hasValue()) {
        <div class="blog-detail">
          <h2>[{{ blogResource.value().id }}] {{ blogResource.value().title }}</h2>
          <p>Chuyên mục: {{ blogResource.value().category }}</p>
          <p>Yêu thích: {{ blogResource.value().favorite ? '❤️ Đã thích' : '🤍 Chưa thích' }}</p>

          <!-- Optimistic Update: Đổi tim ngay lập tức không cần chờ API -->
          <button (click)="toggleFavoriteOptimistic()">
            Đổi Tim Ngay (Optimistic Update)
          </button>
        </div>
      }
    </div>
  `
})
export class BlogResourceComponent {
  blogId = signal<number>(1);

  // Khởi tạo Resource
  blogResource = resource({
    // 1. params: Tự động lắng nghe Signal blogId. Hễ blogId đổi -> tự gọi lại loader!
    params: () => ({ id: this.blogId() }),

    // 2. loader: Hàm bất đồng bộ fetch dữ liệu
    loader: async ({ params, abortSignal }) => {
      // abortSignal tự động hủy HTTP request trước đó nếu user bấm chuyển nhanh sang bài khác!
      const res = await fetch(`http://localhost:3000/api/blogs/${params.id}`, {
        signal: abortSignal
      });

      if (!res.ok) {
        throw new Error(`Tải bài viết thất bại (HTTP ${res.status})`);
      }

      const json = await res.json();
      return json.data as BlogPost;
    }
  });

  changeBlogId(id: number) {
    this.blogId.set(id);
  }

  // Cập nhật Optimistic UI tại chỗ bằng value.update()
  toggleFavoriteOptimistic() {
    this.blogResource.value.update(currentPost => {
      if (!currentPost) return currentPost;
      return {
        ...currentPost,
        favorite: !currentPost.favorite
      };
    });
  }

  getStatusText(): string {
    switch (this.blogResource.status()) {
      case ResourceStatus.Idle: return 'Idle (Chờ kích hoạt)';
      case ResourceStatus.Loading: return 'Loading (Đang tải lần đầu)';
      case ResourceStatus.Reloading: return 'Reloading (Đang làm mới)';
      case ResourceStatus.Resolved: return 'Resolved (Tải thành công)';
      case ResourceStatus.Error: return 'Error (Gặp sự cố)';
      case ResourceStatus.Local: return 'Local (Đang xem bản sửa Optimistic)';
      default: return 'Không xác định';
    }
  }
}
```

---

#### 23.4. Hiểu Sâu Về `AbortSignal` Trong Signal Resource (Chống Race Condition)

> **`AbortSignal` là gì?**
> `AbortSignal` là một đối tượng chuẩn của trình duyệt (thuộc **Fetch API / AbortController DOM standard**). Nó đóng vai trò như một **"chiếc còi báo động"**: Khi một tín hiệu hủy được phát ra (`abort()`), mọi tác vụ mạng ngầm đang chạy liên kết với chiếc còi đó sẽ **lập tức bị ngắt kết nối (cancel request) ngay lập tức**.

##### 1. Vấn đề "Race Condition" kinh điển nếu KHÔNG có AbortSignal:
Hãy hình dung kịch bản sau:
1. Người dùng bấm xem bài viết **ID = 1** $\rightarrow$ Request 1 được gửi đi (mạng chập chờn, mất **3 giây**).
2. Ngay sau đó 0.5 giây, người dùng đổi ý bấm nhanh sang bài viết **ID = 2** $\rightarrow$ Request 2 gửi đi (mạng thông thoáng, về đích sau **0.5 giây**).
3. Giao diện hiển thị bài viết **ID = 2** (Đúng kỳ vọng).
4. **Bất thình lình 2.5 giây sau:** Request 1 ban đầu mới vừa xong và trả về kết quả $\rightarrow$ Giao diện bị đè ngược lại thành bài viết **ID = 1**!
❌ **Hậu quả:** Dữ liệu trên màn hình bị sai lệch hoàn toàn so với những gì người dùng đang chọn (lỗi **Race Condition / Stale Data**).

---

##### 2. Cách `resource()` của Angular giải quyết bằng `abortSignal`:
Trong hàm `loader` của `resource()`, Angular tự động cấp phát một đối tượng `abortSignal`:
```typescript
blogResource = resource({
  params: () => ({ id: this.blogId() }),
  loader: async ({ params, abortSignal }) => {
    // Truyền abortSignal vào fetch API:
    const res = await fetch(`/api/blogs/${params.id}`, { 
      signal: abortSignal 
    });
    return await res.json();
  }
});
```

*Cơ chế tự động dập tắt request:*
- Khi `blogId` đổi từ `1` sang `2`, Angular phát hiện dependency đã thay đổi.
- Angular **tự động kích hoạt `abortSignal` của request 1**.
- Trình duyệt **lập tức ngắt socket kết nối HTTP của request 1** (Trong tab Network của DevTools bạn sẽ thấy status: `(canceled)`).
- Chỉ có request 2 tồn tại và cập nhật dữ liệu vào Signal $\rightarrow$ **Triệt tiêu 100% nguy cơ Race Condition mà bạn không cần phải viết 1 dòng code hủy thủ công nào!**

##### 3. Tự kiểm tra `abortSignal.aborted` trong các tác vụ tính toán nặng:
Nếu loader của bạn không chỉ fetch API mà còn giải nén dữ liệu hoặc chạy vòng lặp CPU nặng, bạn có thể kiểm tra cờ này để dừng sớm tác vụ:
```typescript
loader: async ({ params, abortSignal }) => {
  const data = await fetchLargeFile(params.id, { signal: abortSignal });

  // Kiểm tra nếu request đã bị hủy thì dừng ngay, không tính toán tiếp:
  if (abortSignal.aborted) {
    return null;
  }

  return processHeavyData(data);
}
```

---

#### 23.5. Khác Biệt Giữa `resource()` và `rxResource()` (Angular 19+)

Angular cung cấp thêm `rxResource()` trong gói `@angular/core/rxjs-interop` để dùng riêng với **Angular `HttpClient` (trả về Observable)**:

```typescript
import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({...})
export class RxResourceDemoComponent {
  private http = inject(HttpClient);
  userId = signal(1);

  // rxResource nhận loader trả về một Observable thay vì Promise!
  userResource = rxResource({
    params: () => ({ id: this.userId() }),
    loader: ({ params }) => this.http.get<any>(`/api/users/${params.id}`)
  });
}
```

> 💡 **Tóm tắt quy tắc chọn:**
> - Nếu dùng hàm `fetch()` chuẩn trình duyệt $\rightarrow$ Dùng **`resource()`**.
> - Nếu dùng `HttpClient` của Angular $\rightarrow$ Dùng **`rxResource()`**.

---

# F. SERVICE WORKERS & PROGRESSIVE WEB APPS (PWAs)

---

### 24. Overview (Tổng Quan Về Service Worker & PWA)

#### 24.1. Progressive Web App (PWA) là gì?
**PWA (Progressive Web App)** là ứng dụng web được nâng cấp bằng các công nghệ web hiện đại để mang lại trải nghiệm mượt mà, tin cậy và có khả năng tương tác hệt như một ứng dụng Native di động (Android / iOS):
- **Cài đặt lên màn hình chính (Installable)**: Người dùng có thể nhấn nút "Thêm vào màn hình chính" (Add to Home Screen) mà không cần qua App Store hay Google Play.
- **Hoạt động Ngoại tuyến (Offline Capabilities)**: Khi mất mạng hoặc mạng chập chờn (Lie-fi), ứng dụng vẫn mở lên ngay lập tức và xem được các nội dung đã lưu tạm.
- **Nhận Thông Báo Đẩy (Web Push Notifications)**: Nhận tin nhắn thông báo kể cả khi người dùng đã tắt hẳn trình duyệt web.

---

#### 24.2. Service Worker Là Gì? Bản Chất Kiến Trúc "Người Gác Cổng"
Service Worker là một **Web Worker** đặc biệt — một file kịch bản JavaScript chạy hoàn toàn ngầm độc lập với luồng chính (Main Thread) của giao diện web và **không có quyền truy cập trực tiếp vào DOM**.

Service Worker đóng vai trò như một **Máy Chủ Ủy Quyền Cục Bộ (Client-side Network Proxy)** đứng chặn giữa Ứng dụng web và Mạng Internet:

```
[ Angular App (Giao diện DOM) ] 
              │
         HTTP Request (Tải ảnh, CSS, JS, API)
              │
              ▼
   ┌─────────────────────────────────────────────────────────────┐
   │         SERVICE WORKER (Proxy Chặn Mọi Request)             │
   │                                                             │
   │  ❓ Có file trong Cache Storage chưa?                       │
   │      ├─► [ ĐÃ CÓ ] ────► Trả về Cache tức thì (0ms) ⚡      │
   │      └─► [ CHƯA CÓ ] ──► Chuyển tiếp ra Internet lấy về     │
   └─────────────────────────────────────────────────────────────┘
              │
              ▼
        [ Internet / Backend API ]
```

##### 4 Đặc Tính Cốt Lõi Của Service Worker:
1. **Chỉ hoạt động qua giao thức HTTPS**: Do khả năng nghe lén và sửa đổi toàn bộ các request mạng, trình duyệt chỉ cho phép Service Worker chạy trên domain bảo mật `https://` (hoặc `http://localhost` lúc dev).
2. **Chạy ngầm độc lập (Independent Lifecycle)**: Service Worker có thể tự thức dậy khi có một Push Notification gửi tới và tự tắt đi khi xử lý xong, hoàn toàn không phụ thuộc vào việc tab trình duyệt còn mở hay không.
3. **Bộ nhớ lưu trữ riêng biệt**: Sử dụng `CacheStorage API` (lưu trữ file tĩnh assets, HTML, font) và `IndexedDB` (lưu dữ liệu có cấu trúc lớn).
4. **Angular Service Worker (`@angular/service-worker`)**: Angular cung cấp sẵn một Service Worker được tối ưu hóa cao (`ngsw-worker.js`), tự động tính toán mã băm SHA-1 cho từng file bundle để quản lý cập nhật phiên bản mượt mà mà lập trình viên không cần viết code low-level phức tạp.

---

### 25. Getting Started (Khởi Tạo & Cấu Hình Angular Service Worker)

#### 25.1. Thêm gói PWA vào dự án Angular
Chỉ với một câu lệnh Angular CLI chính thức:
```bash
ng add @angular/pwa
```

Lệnh này sẽ tự động:
1. Cài đặt package `@angular/service-worker`.
2. Tạo file cấu hình [`ngsw-config.json`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/ngsw-config.json) ở thư mục gốc.
3. Tạo file `manifest.webmanifest` (chứa tên app, màu sắc theme, icon các kích thước).
4. Bật cờ `"serviceWorker": "ngsw-config.json"` trong `angular.json` cho cấu hình production build.
5. Đăng ký Service Worker vào `app.config.ts`.

#### 25.2. Cấu hình đăng ký trong `app.config.ts`
```typescript
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    // Đăng ký Service Worker
    provideServiceWorker('ngsw-worker.js', {
      // Chỉ bật khi build Production (hoặc bật thủ công để test)
      enabled: !isDevMode(),
      
      // Chiến lược đăng ký: Chờ cho tới khi ứng dụng Angular khởi tạo xong và ổn định (IsStable)
      // hoặc tối đa sau 30 giây thì bắt buộc phải đăng ký để không làm chậm lúc mở trang đầu.
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
```

---

### 26. Custom Service Worker Scripts (Tự Tùy Biến Service Worker)

Mặc định, Angular sử dụng file `ngsw-worker.js` có sẵn. Tuy nhiên, nếu bạn muốn can thiệp sâu vào các tác vụ nâng cao như:
- Tự viết logic Web Push Notification với action click phức tạp.
- Lắng nghe sự kiện đồng bộ dữ liệu ngầm (`sync` event - Background Sync API).
- Chuyển hướng khi người dùng click vào thông báo đẩy.

Bạn có thể tự tạo file JavaScript tùy biến và nạp kèm vào cùng với Angular Service Worker!

#### Cách làm:
1. Tạo file `src/custom-service-worker.js`:
```javascript
// src/custom-service-worker.js

// 1. Nhập toàn bộ logic chuẩn của Angular Service Worker
importScripts('./ngsw-worker.js');

// 2. Viết thêm logic tùy biến riêng của bạn:
self.addEventListener('notificationclick', (event) => {
  console.log('[Custom SW] Người dùng click vào thông báo:', event.notification.tag);
  event.notification.close();

  // Mở hoặc chuyển tab tới trang đích
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('/blog') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('/blog');
      }
    })
  );
});

// Lắng nghe sự kiện Background Sync (Khi có mạng trở lại sẽ tự đẩy dữ liệu lên server)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-offline-blogs') {
    console.log('[Custom SW] 🔄 Có mạng trở lại -> Bắt đầu đồng bộ bài viết tạo lúc offline!');
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  // Logic đọc từ IndexedDB và gửi HTTP POST lên backend
}
```

2. Cập nhật `app.config.ts` để trỏ vào script mới:
```typescript
provideServiceWorker('custom-service-worker.js', {
  enabled: !isDevMode(),
  registrationStrategy: 'registerWhenStable:30000'
})
```

3. Khai báo file vào mảng `assets` trong `angular.json` để compiler copy vào thư mục `dist`:
```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/manifest.webmanifest",
  "src/custom-service-worker.js"
]
```

---

### 27. Configuration File (`ngsw-config.json` Chi Tiết Từng Thuộc Tính)

File `ngsw-config.json` là "trái tim" cấu hình của Angular Service Worker. Bạn không cần viết code JS dài dòng, mà chỉ cần khai báo quy tắc caching theo cú pháp JSON.

Có 2 nhóm tài nguyên chính: **`assetGroups`** (File tĩnh) và **`dataGroups`** (API Backend).

```json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": [
          "/favicon.ico",
          "/index.html",
          "/manifest.webmanifest",
          "/*.css",
          "/*.js"
        ]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": [
          "/assets/**",
          "/media/*.(svg|cur|jpg|jpeg|png|apng|webp|avif|gif|otf|ttf|woff|woff2)"
        ]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "blog-api-freshness",
      "urls": ["/api/blogs/**"],
      "cacheConfig": {
        "strategy": "freshness",
        "maxSize": 100,
        "maxAge": "1h",
        "timeout": "5s"
      }
    },
    {
      "name": "user-avatar-performance",
      "urls": ["https://api.dicebear.com/**"],
      "cacheConfig": {
        "strategy": "performance",
        "maxSize": 50,
        "maxAge": "1d"
      }
    }
  ]
}
```

---

#### 27.1. Phân Tích `assetGroups` (Quản Lý File Tĩnh)
Dùng để lưu trữ code HTML, CSS, JavaScript và hình ảnh, font chữ của ứng dụng.

* **`installMode` (Cách tải lúc cài đặt lần đầu):**
  - **`prefetch`**: Tải ngầm **ngay lập tức toàn bộ** các file này về lưu vào Cache Storage ngay khi Service Worker vừa cài đặt xong (Dùng cho: `index.html`, `main.js`, `styles.css` — những file cốt lõi để app có thể mở lên được lúc offline).
  - **`lazy`**: Chỉ khi nào người dùng lướt tới màn hình cần tải hình ảnh đó thì mới lưu file đó vào Cache (Dùng cho: banner, avatar, ảnh minh họa trong thư mục `/assets`).
* **`updateMode` (Cách tải khi có phiên bản mới của app phát hành):**
  - **`prefetch`**: Hễ phát hiện có version mới trên server, tự động tải ngầm phiên bản mới về đè vào cache.
  - **`lazy`**: Chờ người dùng truy cập tới tài nguyên đó mới tải bản mới.

---

#### 27.2. Phân Tích `dataGroups` (Quản Lý Dữ Liệu API Backend)
Dùng để lưu tạm các kết quả gọi HTTP GET API. Có **2 chiến lược Caching (strategy)** cực kỳ quan trọng:

##### 1. Chiến Lược `freshness` (Ưu tiên Dữ Liệu Mới Nhất - Network-First):
* **Cơ chế:** Service Worker ưu tiên bắn request ra Internet gọi API backend trước.
  - Nếu backend trả về kết quả trong thời gian cho phép (`timeout: 5s`) $\rightarrow$ Lưu kết quả đó vào Cache và trả về cho UI.
  - Nếu mạng rớt hoặc máy chủ bị sập/chậm quá thời gian quy định $\rightarrow$ Service Worker tự động móc dữ liệu cũ trong Cache ra thế mạng!
* **Ứng dụng thực tế:** Bảng giá chứng khoán, danh sách bài viết blog mới, thông tin giỏ hàng, thông báo người dùng.

##### 2. Chiến Lược `performance` (Ưu tiên Tốc Độ Tuyệt Đối - Cache-First):
* **Cơ chế:** Service Worker kiểm tra trong Cache Storage trước.
  - Nếu đã có trong Cache và chưa quá hạn (`maxAge: 1d`) $\rightarrow$ Trả về ngay lập tức (0ms). Hoàn toàn không tốn request mạng!
  - Chỉ khi trong Cache chưa có hoặc đã hết hạn thì mới ra mạng tải về.
* **Ứng dụng thực tế:** Ảnh Avatar người dùng, icon tĩnh, danh sách quốc gia/tỉnh thành (những dữ liệu gần như cả năm không đổi).

* **Các tham số cấu hình Cache:**
  - `maxSize`: Số lượng bản ghi tối đa được lưu tạm (vượt quá sẽ tự xóa bản ghi cũ nhất theo thuật toán LRU - Least Recently Used).
  - `maxAge`: Thời gian sống của cache (`"1h"`, `"30m"`, `"7d"`).
  - `timeout`: Thời gian tối đa chờ mạng trước khi bỏ cuộc để lôi cache ra dùng (chỉ áp dụng cho `freshness`).

---

### 28. Communicating with the Service Worker (`SwUpdate` & `SwPush`)

Angular cung cấp 2 Service chính thức để tương tác hai chiều với Service Worker từ code TypeScript:
1. **`SwUpdate`**: Quản lý cập nhật phiên bản mới của ứng dụng.
2. **`SwPush`**: Quản lý đăng ký và nhận Web Push Notifications.

#### 28.1. `SwUpdate`: Tự Động Báo Khi Có Phiên Bản Mới (Update Notification)
Khi bạn deploy một bản build mới lên production, người dùng đang mở web sẽ không hề hay biết trừ khi họ ấn F5. `SwUpdate` giúp bạn phát hiện phiên bản mới trong nền và hiện banner: *"Đã có bản cập nhật mới! Bạn có muốn làm mới trang ngay?"*:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { filter } from 'rxjs';

@Component({
  selector: 'app-update-banner',
  standalone: true,
  template: `
    @if (updateAvailable) {
      <div class="update-bar">
        <span>🚀 Ứng dụng đã có phiên bản mới!</span>
        <button (click)="activateUpdate()">Cập Nhật Ngay</button>
      </div>
    }
  `,
  styles: [`
    .update-bar {
      position: fixed; bottom: 0; left: 0; right: 0;
      background: #1e293b; color: white; padding: 12px;
      display: flex; justify-content: space-between; align-items: center; z-index: 9999;
    }
    button { background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; }
  `]
})
export class UpdateBannerComponent implements OnInit {
  private swUpdate = inject(SwUpdate);
  updateAvailable = false;

  ngOnInit() {
    // Chỉ lắng nghe nếu Service Worker đang được bật (Production)
    if (this.swUpdate.isEnabled) {
      // 1. Kiểm tra định kỳ mỗi 6 tiếng xem server có version mới không:
      setInterval(() => {
        this.swUpdate.checkForUpdate().then(hasUpdate => {
          if (hasUpdate) console.log('🔔 Phát hiện code mới trên server!');
        });
      }, 6 * 60 * 60 * 1000);

      // 2. Lắng nghe sự kiện VersionReady (Service worker đã tải ngầm bản mới về cache xong)
      this.swUpdate.versionUpdates
        .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
        .subscribe(evt => {
          console.log(`Phiên bản hiện tại: ${evt.currentVersion.hash}`);
          console.log(`Phiên bản mới nhất: ${evt.latestVersion.hash}`);
          this.updateAvailable = true;
        });
    }
  }

  // Người dùng bấm nút "Cập nhật"
  activateUpdate() {
    this.swUpdate.activateUpdate().then(() => {
      // Reload lại trang web để kích hoạt mã nguồn JavaScript mới nhất
      document.location.reload();
    });
  }
}
```

---

### 29. Push Notifications (Thông Báo Đẩy Với Web Push API)

Service Worker có thể nhận thông báo đẩy từ máy chủ gửi về thông qua **VAPID Keys** (Voluntary Application Server Identification) và dịch vụ `SwPush`.

#### Quy trình hoạt động của Web Push:
```
1. Client xin quyền User (Notification.requestPermission())
2. SwPush.requestSubscription() ──► Trình duyệt sinh ra PushSubscription (Endpoint + Auth Key)
3. Client gửi Subscription Object này lưu vào Database của Backend.
4. Khi có tin tức mới: Backend dùng WebPush Library gửi payload tới Endpoint của Google/Apple Push Service.
5. Google/Apple Push Service đánh thức Service Worker của trình duyệt ──► Hiển thị thông báo lên màn hình điện thoại/máy tính!
```

#### Code Angular Client đăng ký nhận Push Notification:
```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-push-toggle',
  standalone: true,
  template: `
    <button (click)="subscribeToNotifications()">
      🔔 Bật Nhận Thông Báo Bài Viết Mới
    </button>
  `
})
export class PushToggleComponent {
  private swPush = inject(SwPush);
  private http = inject(HttpClient);

  // VAPID Public Key (Tạo từ web-push library của backend)
  private readonly VAPID_PUBLIC_KEY = 'BCmR...Your_Public_Key...xyz';

  subscribeToNotifications() {
    if (!this.swPush.isEnabled) {
      alert('Service Worker không được hỗ trợ hoặc chưa bật!');
      return;
    }

    // 1. Xin quyền người dùng và lấy Subscription token
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(subscription => {
      console.log('✅ Đăng ký thành công Token:', JSON.stringify(subscription));

      // 2. Gửi subscription này lên Backend Server để lưu vào Database:
      this.http.post('/api/notifications/subscribe', subscription).subscribe({
        next: () => alert('Đã đăng ký nhận thông báo đẩy thành công!'),
        error: (err) => console.error('Lỗi lưu subscription lên server:', err)
      });
    })
    .catch(err => {
      console.warn('❌ Người dùng từ chối hoặc lỗi cấp quyền thông báo:', err);
    });

    // 3. Lắng nghe khi thông báo tới lúc đang mở web (In-app Notification)
    this.swPush.messages.subscribe(message => {
      console.log('📬 Nhận được thông báo đẩy mới:', message);
    });
  }
}
```

---

### 30. Service Worker DevOps (Deploy, Caching Invalidation & Safe Rollout)

Việc sử dụng Service Worker trên môi trường Production đòi hỏi sự cẩn trọng cao độ. Nếu cấu hình sai, người dùng có thể bị **"Kẹt ở phiên bản cũ vĩnh viễn" (Cache Trap)** dù bạn đã deploy code mới hàng chục lần!

#### 3 Quy Tắc Sống Còn Cho DevOps:

##### 1. File `ngsw.json` và `ngsw-worker.js` BẮT BUỘC KHÔNG ĐƯỢC CACHE Ở SERVER (No-Cache):
Trên máy chủ Web Server (Nginx, Apache, Cloudflare, Firebase Hosting), bạn phải cấu hình HTTP Header `Cache-Control` cho 2 file này là `no-cache`:
```nginx
# Cấu hình Nginx chuẩn:
location ~* (ngsw\.json|ngsw-worker\.js|manifest\.webmanifest)$ {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
    add_header Pragma "no-cache";
    expires 0;
}
```
*Tại sao?* Mỗi lần mở trang, trình duyệt phải luôn tải được file `ngsw.json` mới nhất từ server để so sánh mã băm SHA-1 của các file bundle. Nếu `ngsw.json` bị server CDN cache 1 năm, người dùng sẽ mãi mãi dùng bản cũ!

##### 2. Xử lý "Lỗi Không Khớp Hash" (Unrecoverable State Error):
Đôi khi bạn deploy bản mới và vô tình xóa mất các file chunk JS cũ trên server S3/Cloud Storage, trong khi người dùng cũ vẫn đang mở web và yêu cầu chunk cũ $\rightarrow$ Ứng dụng rơi vào trạng thái tê liệt.
Cách xử lý bằng code:
```typescript
this.swUpdate.unrecoverable.subscribe(event => {
  console.error('❌ Trạng thái không thể phục hồi:', event.reason);
  // Ép xóa sạch cache cũ và tải lại trang từ đầu:
  alert('Ứng dụng đã được cập nhật phiên bản lớn. Trang web sẽ tự làm mới!');
  window.location.reload();
});
```

##### 3. Quy trình "Nút Khẩn Cấp" (Kill Switch) Hủy Bỏ Service Worker:
Nếu bản deploy bị bug nghiêm trọng và bạn muốn lập tức vô hiệu hóa Service Worker của hàng triệu người dùng trên toàn cầu:
1. Đặt thuộc tính `"enabled": false` trong `provideServiceWorker`.
2. Hoặc tạo một file `ngsw-worker.js` rỗng và cho tự unregister:
```javascript
// ngsw-worker.js khẩn cấp:
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', () => {
  self.registration.unregister().then(() => {
    return self.clients.matchAll();
  }).then(clients => {
    clients.forEach(client => client.navigate(client.url));
  });
});
```

---

### 31. App Shell Pattern (Kiến Trúc Khung Ứng Dụng Tải Ngay Lập Tức)

#### 31.1. App Shell Architecture là gì?
**App Shell (Khung ứng dụng)** là lượng HTML, CSS và JavaScript tối thiểu nhất cần thiết để hiển thị được bộ khung xương giao diện tĩnh (Header, Navbar, Sidebar, Spinner/Skeleton) của trang web.

```
┌────────────────────────────────────────────────────────┐
│                   HEADER / NAVBAR                      │ ◄── THUỘC APP SHELL
├───────────────┬────────────────────────────────────────┤     (Lưu cố định trong Cache,
│               │                                        │      mở lên là thấy ngay lập
│   SIDEBAR     │            DYNAMIC CONTENT             │      tức 0ms)
│   (Menu)      │           (Dữ liệu bài viết,           │
│               │            bảng giá từ API)            │ ◄── NỘI DUNG ĐỘNG
│               │                                        │     (Tải sau qua mạng)
├───────────────┴────────────────────────────────────────┤
│                   FOOTER BANNER                        │ ◄── THUỘC APP SHELL
└────────────────────────────────────────────────────────┘
```

#### 31.2. Lợi ích vượt trội về điểm số Core Web Vitals
1. **FCP (First Contentful Paint) cực nhỏ**: Người dùng không phải nhìn thấy màn hình trắng tinh chớp giật. Khung trang web bật lên ngay lập tức kể cả khi ngồi trên tàu hỏa mất mạng hoàn toàn.
2. **Cảm giác tốc độ tức thì (Perceived Performance)**: Tạo cho người dùng cảm giác ứng dụng mượt mà và phản hồi nhanh như ứng dụng Native viết bằng Swift hay Kotlin.

#### 31.3. Cấu hình App Shell trong Angular CLI
Angular hỗ trợ sinh sẵn khung App Shell ngay từ lúc build SSR:
```bash
ng generate app-shell --route=app-shell-path
```
Lệnh này sẽ tạo ra một component đặc biệt chỉ chứa khung HTML/CSS tĩnh. Khi Angular biên dịch, nó sẽ render sẵn khung này vào `index.html` và Service Worker sẽ ưu tiên lưu khung này vào nhóm `prefetch` để hiển thị trước mắt người dùng trong tích tắc.

