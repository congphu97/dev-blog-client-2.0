# Cẩm Nang Toàn Diện Về Xác Thực (Authentication): JWT, OAuth 2.0 & Auth0

> **Mục tiêu tài liệu:** Giúp bạn nắm vững bản chất, phân biệt rõ ràng và biết cách triển khai luồng **Đăng nhập (Login)** với **JWT**, **OAuth 2.0** và **Auth0** thông qua sơ đồ hình ảnh trực quan và code mẫu đơn giản.

---

## Mục lục

1. [Bức tranh tổng quan: Ai là ai?](#1-bức-tranh-tổng-quan-ai-là-ai)
2. [Phần 1: JWT (JSON Web Token) - Chiếc vé vào cổng](#2-phần-1-jwt-json-web-token---chiếc-vé-vào-cổng)
   - [2.1. Cấu trúc của JWT](#21-cấu-trúc-của-jwt)
   - [2.2. Sơ đồ luồng Login bằng JWT](#22-sơ-đồ-luồng-login-bằng-jwt)
   - [2.3. Code mẫu đơn giản (Backend & Angular Frontend)](#23-code-mẫu-đơn-giản-backend--angular-frontend)
3. [Phần 2: OAuth 2.0 - Giao thức ủy quyền chuẩn quốc tế](#3-phần-2-oauth-20---giao-thức-ủy-quyền-chuẩn-quốc-tế)
   - [3.1. Bản chất của OAuth 2.0](#31-bản-chất-của-oauth-20)
   - [3.2. 4 Vai trò chính trong OAuth 2.0](#32-4-vai-trò-chính-trong-oauth-20)
   - [3.3. Luồng Authorization Code Flow with PKCE (Chuẩn cho Angular SPA)](#33-luồng-authorization-code-flow-with-pkce-chuẩn-cho-angular-spa)
4. [Phần 3: Auth0 - Nền tảng Identity-as-a-Service (IDaaS)](#4-phần-3-auth0---nền-tảng-identity-as-a-service-idaas)
   - [4.1. Auth0 là gì?](#41-auth0-là-gì)
   - [4.2. Sơ đồ luồng đăng nhập với Auth0 Universal Login](#42-sơ-đồ-luồng-đăng-nhập-với-auth0-universal-login)
   - [4.3. Code mẫu tích hợp Auth0 vào Angular Standalone](#43-code-mẫu-tích-hợp-auth0-vào-angular-standalone)
5. [Bảng so sánh & Mối liên hệ: JWT vs OAuth 2.0 vs Auth0](#5-bảng-so-sánh--mối-liên-hệ-jwt-vs-oauth-20-vs-auth0)
6. [Best Practices: Lưu trữ Token ở đâu an toàn nhất?](#6-best-practices-lưu-trữ-token-ở-đâu-an-toàn-nhất)
7. [Hướng dẫn Apply Code thực tế vào Dự án Angular 22 & Ionic (Từ A - Z)](#7-hướng-dẫn-apply-code-thực-tế-vào-dự-án-angular-22--ionic-từ-a---z)
   - [7.1. Cài đặt SDK chính thức](#71-cài-đặt-sdk-chính-thức)
   - [7.2. Cấu hình biến môi trường (`environment.ts`)](#72-cấu-hình-biến-môi-trường-environmentts)
   - [7.3. Cấu hình Provider & Interceptor (`app.config.ts`)](#73-cấu-hình-provider--interceptor-appconfigts)
   - [7.4. Bảo vệ Router bằng `authGuard`](#74-bảo-vệ-router-bằng-authguard)
   - [7.5. Xây dựng Component Đăng nhập & Thông tin User](#75-xây-dựng-component-đăng-nhập--thông-tin-user)
   - [7.6. Xử lý trên Mobile App với Capacitor (Deep Link Callback)](#76-xử-lý-trên-mobile-app-với-capacitor-deep-link-callback)
   - [7.7. Backend Verify JWT Token bằng JWKS (Node.js Express)](#77-backend-verify-jwt-token-bằng-jwks-nodejs-express)

---

## 1. Bức tranh tổng quan: Ai là ai?

Rất nhiều lập trình viên nhầm lẫn giữa 3 khái niệm này. Đây là mối liên hệ dễ hiểu nhất:

```mermaid
flowchart LR
    OAuth["OAuth 2.0 / OIDC: Bộ luật & Giao thức ủy quyền"]
    JWT["JWT: Tấm vé / Bằng lái xe mang thông tin"]
    Auth0["Auth0: Cơ quan cấp bằng lái & Trạm kiểm soát bảo mật"]

    OAuth -. "Quy định cách thức trao đổi" .-> JWT
    Auth0 -- "Áp dụng bộ luật" --> OAuth
    Auth0 -- "Tạo ra và ký chữ ký số cho" --> JWT
```

- **OAuth 2.0**: Là **Giao thức / Luật lệ** quy định cách các ứng dụng xin quyền truy cập mà không làm lộ mật khẩu người dùng (ví dụ: *"Đăng nhập bằng Google"*).
- **JWT (JSON Web Token)**: Là **Định dạng dữ liệu của chiếc vé** (Token format). Chứa thông tin người dùng được mã hóa và có chữ ký số để chống giả mạo.
- **Auth0**: Là **Dịch vụ trọn gói (Cloud Service)** dựng sẵn toàn bộ hệ thống đăng nhập, đăng ký, quên mật khẩu, Google/GitHub login, 2FA/MFA tuân thủ 100% chuẩn OAuth 2.0 và sinh ra vé JWT cho bạn.

---

## 2. Phần 1: JWT (JSON Web Token) - Chiếc vé vào cổng

### 2.1. Cấu trúc của JWT
Một chuỗi JWT gồm 3 phần ngăn cách bởi dấu chấm `.`: **`Header.Payload.Signature`**

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMiLCJuYW1lIjoiUGjDuiBDxrDhu51uZyJ9.4zR9-8vXWpYq9k7
└───────────────┬──────────────────┘ └──────────────────────┬──────────────────────┘ └──────────┬──────────┘
             HEADER                                      PAYLOAD                             SIGNATURE
    (Thuật toán mã hóa)                     (Dữ liệu người dùng: id, role, exp)         (Chữ ký chống giả mạo)
```

- **Header**: Khai báo loại token (`JWT`) và thuật toán ký (vd: `HS256` hoặc `RS256`).
- **Payload**: Chứa thông tin thực tế (**Claims**) như `userId`, `email`, `role`, thời hạn hết hạn `exp`. Payload chỉ được encode Base64 chứ **KHÔNG mã hóa bí mật** (bất kỳ ai cũng decode đọc được, nên tuyệt đối không để password vào đây!).
- **Signature (Chữ ký số)**: Được tạo bằng cách lấy `HMACSHA256(Base64(Header) + "." + Base64(Payload), SecretKey)`. Nếu hacker sửa bất kỳ chữ nào trong Payload, Signature sẽ sai ngay lập tức ➔ Server từ chối.

---

### 2.2. Sơ đồ luồng Login bằng JWT

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant Client as Angular Client
    participant Server as Backend Server (Node/Java/C#)
    participant DB as Cơ sở dữ liệu

    User->>Client: Nhập username + password và nhấn Login
    Client->>Server: POST /api/login { username, password }
    Server->>DB: Tìm kiếm user & kiểm tra hash mật khẩu
    DB-->>Server: Mật khẩu chính xác!

    Note over Server: Server dùng Secret Key ký chữ ký số<br/>tạo ra Access Token (JWT)
    
    Server-->>Client: Trả về HTTP 200 OK: { accessToken: "eyJhbGciOi..." }
    Client->>Client: Lưu Token vào Storage (hoặc HttpOnly Cookie)

    Note over Client,Server: CÁC REQUEST TIẾP THEO (Vd: Lấy danh sách blog cá nhân)
    Client->>Server: GET /api/my-blogs <br/> Headers: { Authorization: "Bearer eyJhbGciOi..." }
    
    Note over Server: Server kiểm tra Signature của JWT bằng Secret Key.<br/>Không cần query Database để biết user là ai!
    
    Server-->>Client: Trả về dữ liệu bài viết hợp lệ!
```

---

### 2.3. Code mẫu đơn giản (Backend & Angular Frontend)

#### Backend (Node.js Express):
```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const SECRET_KEY = 'bi_mat_khong_the_bat_mi';

// API Đăng nhập
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // 1. Kiểm tra tài khoản (giả lập)
  if (username === 'phu' && password === '123456') {
    // 2. Tạo JWT Token có hạn trong 1 giờ
    const token = jwt.sign(
      { userId: 99, username: 'phu', role: 'admin' },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.json({ accessToken: token });
  }

  return res.status(401).json({ message: 'Sai tài khoản hoặc mật khẩu' });
});

// Middleware xác thực bảo vệ API
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Token hết hạn hoặc sai chữ ký
    req.user = user;
    next();
  });
}
```

#### Frontend (Angular HttpInterceptor tự động gửi Token):
```typescript
// auth.interceptor.ts (Angular Standalone)
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  // Nếu có token, clone request và gắn Header Authorization
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
```

---

## 3. Phần 2: OAuth 2.0 - Giao thức ủy quyền chuẩn quốc tế

### 3.1. Bản chất của OAuth 2.0
OAuth 2.0 sinh ra để giải quyết bài toán: **Làm sao để ứng dụng của bạn (App đọc Blog) có thể xem ảnh của User trên Google Drive mà User KHÔNG PHẢI ĐƯA PASSWORD Google cho App?**

> **Tương tự thẻ phòng khách sạn:** Bạn đến lễ tân (Authorization Server), lễ tân xác nhận bạn là ai rồi đưa cho bạn một chiếc **Thẻ từ (Access Token)**. Bạn dùng thẻ từ này để mở cửa phòng (Resource Server). Khách sạn không cần giao chìa khóa vạn năng cho bạn!

### 3.2. 4 Vai trò chính trong OAuth 2.0:
1. **Resource Owner (Chủ tài nguyên):** Chính là Người dùng (End User).
2. **Client (Ứng dụng cần quyền):** Ứng dụng Angular của bạn (`dev-blog-client`).
3. **Authorization Server (Máy chủ cấp quyền):** Google Accounts, GitHub, Facebook,...
4. **Resource Server (Máy chủ chứa tài nguyên):** Google Drive API, GitHub Repos API,...

---

### 3.3. Luồng Authorization Code Flow with PKCE (Chuẩn cho Angular SPA)

Trước đây với web truyền thống có backend server, người ta dùng `Authorization Code Flow` kèm `Client Secret`.  
Tuy nhiên với Single Page Application (Angular/React), **code chạy hoàn toàn trên trình duyệt của người dùng nên không thể giấu Client Secret** (F12 là lộ).  
Vì vậy, chuẩn thế giới bắt buộc dùng biến thể: **PKCE (Proof Key for Code Exchange - phát âm là "pixie")**.

```mermaid
sequenceDiagram
    autonumber
    actor User as Người dùng
    participant Browser as Angular App (Client)
    participant AuthServer as OAuth Server (Google / Auth0)
    participant API as Backend API

    Note over Browser: 1. Tạo chuỗi ngẫu nhiên Code Verifier<br/>và băm mã SHA-256 thành Code Challenge

    User->>Browser: Bấm "Đăng nhập bằng Google"
    Browser->>AuthServer: Chuyển hướng trình duyệt tới Google Auth<br/>(kèm ClientId, RedirectURI, code_challenge)
    
    AuthServer->>User: Hiển thị màn hình đăng nhập Google & Hỏi cấp quyền
    User->>AuthServer: Đồng ý đăng nhập & cấp quyền
    
    AuthServer-->>Browser: Chuyển hướng về Angular kèm mã tạm: ?code=ABC123XYZ
    
    Note over Browser: 2. Trao đổi Code lấy Token an toàn
    Browser->>AuthServer: POST /oauth/token <br/>(Gửi mã ?code=ABC123XYZ + code_verifier gốc)
    
    Note over AuthServer: AuthServer băm code_verifier gửi lên<br/>so sánh với code_challenge đã lưu ban đầu.<br/>Nếu khớp -> Chứng minh đúng là Client gốc!
    
    AuthServer-->>Browser: Trả về { id_token, access_token, refresh_token }
    
    Browser->>API: Gọi API kèm access_token
    API-->>Browser: Trả về dữ liệu!
```

---

## 4. Phần 3: Auth0 - Nền tảng Identity-as-a-Service (IDaaS)

### 4.1. Auth0 là gì?
Tự xây dựng hệ thống Auth từ đầu rất phức tạp và tiềm ẩn nhiều rủi ro bảo mật:
- Phải mã hóa password an toàn (Bcrypt/Argon2).
- Phải chống brute-force, rate-limiting tấn công DDOS.
- Phải tự code luồng Quên mật khẩu, Xác thực Email, Reset Password.
- Phải tự tích hợp SDK của từng bên: Google, Apple, Facebook, GitHub, SAML/Enterprise SSO.
- Phải tự xây dựng tính năng 2FA / MFA (Mã OTP, Google Authenticator).

👉 **Auth0 làm sẵn 100% các thứ trên.** Bạn chỉ cần cắm SDK của Auth0 vào Angular là có ngay hệ thống đăng nhập chuẩn ngân hàng quốc tế!

---

### 4.2. Sơ đồ luồng đăng nhập với Auth0 Universal Login

Auth0 khuyến nghị sử dụng **Universal Login**: Người dùng được chuyển hướng an toàn đến trang đăng nhập tập trung do Auth0 host (có thể gắn domain riêng của bạn: `login.yourcompany.com`).

```mermaid
flowchart TD
    A["Angular App"] -- "1. Bấm nút Login" --> B["auth0.loginWithRedirect()"]
    B --> C["Chuyển hướng sang Auth0 Universal Login Page"]
    
    subgraph Auth0_Cloud ["Auth0 Cloud Server"]
        C --> D{"User chọn phương thức"}
        D -- "Username / Password" --> E["Kiểm tra bảo mật + 2FA"]
        D -- "Nút Google / Apple / GitHub" --> F["Kết nối nhà cung cấp Social"]
    end

    E --> G["Đăng nhập thành công! Ký JWT Token"]
    F --> G
    G -- "2. Chuyển hướng ngược về" --> H["Angular App: https://myapp.com/callback?code=..."]
    H -- "3. SDK tự đổi code lấy JWT ngầm" --> I["Lưu User Profile & Token vào memory"]
    I --> J["Giao diện Angular tự động chuyển sang trạng thái Logged In"]

    style Auth0_Cloud fill:#ffeedd,stroke:#f57c00
    style A fill:#e1f5fe,stroke:#0288d1
    style J fill:#e8f5e9,stroke:#2e7d32
```

---

### 4.3. Code mẫu tích hợp Auth0 vào Angular Standalone

#### Bước 1: Cài đặt SDK chính thức của Auth0
```bash
npm install @auth0/auth0-angular
```

#### Bước 2: Cấu hình trong `src/main.ts`
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAuth0 } from '@auth0/auth0-angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-yourdomain.us.auth0.com', // Lấy trên Auth0 Dashboard
      clientId: 'your_client_id_here',       // Lấy trên Auth0 Dashboard
      authorizationParams: {
        redirect_uri: window.location.origin, // Sau khi login xong chuyển về đâu
        audience: 'https://api.myblog.com',   // Identifier của Backend API
      },
      useRefreshTokens: true,                // Tự động làm mới token ngầm
      cacheLocation: 'localstorage',         // Giữ đăng nhập khi F5 hoặc mở tab mới
    }),
  ],
});
```

#### Bước 3: Sử dụng trong Component (Login / Logout / Hiển thị Avatar)
```typescript
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- 1. Khi chưa đăng nhập: Hiện nút Login -->
    <ng-container *ngIf="(auth.isAuthenticated$ | async) === false">
      <button (click)="login()">🔑 Đăng Nhập / Đăng Ký</button>
    </ng-container>

    <!-- 2. Khi đã đăng nhập: Hiện thông tin user & nút Logout -->
    <ng-container *ngIf="auth.user$ | async as user">
      <div class="user-profile">
        <img [src]="user.picture" alt="Avatar" width="40" height="40" style="border-radius: 50%" />
        <span>Xin chào, <strong>{{ user.name }}</strong> ({{ user.email }})</span>
        <button (click)="logout()">🚪 Đăng Xuất</button>
      </div>
    </ng-container>
  `,
})
export class AuthButtonComponent {
  // Inject trực tiếp AuthService của Auth0
  public auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
```

---

## 5. Bảng so sánh & Mối liên hệ: JWT vs OAuth 2.0 vs Auth0

| Đặc điểm | JWT (JSON Web Token) | OAuth 2.0 | Auth0 |
| :--- | :--- | :--- | :--- |
| **Bản chất** | **Định dạng dữ liệu** (Data Token Format). | **Giao thức ủy quyền** (Authorization Protocol). | **Nhà cung cấp dịch vụ xác thực** (Identity Platform / SaaS). |
| **Nhiệm vụ** | Mang theo thông tin user và chữ ký số để server xác minh danh tính. | Quy định quy trình trao đổi quyền giữa Client, Server và User. | Cung cấp sẵn cơ sở hạ tầng, trang login, bảo mật, user database. |
| **Có cần Server tự code không?** | Tự viết code ký và verify token. | Tự thiết lập các endpoint `/authorize`, `/token`. | Không cần, dùng Dashboard cấu hình và gọi SDK. |
| **Tính năng đi kèm** | Chỉ là 1 chuỗi string, không có tính năng gì thêm. | Xác thực Social (Google, Facebook), cấp quyền hạn mức (Scope). | MFA, Quên mật khẩu, Anomaly Detection (cảnh báo đăng nhập lạ), Social Login, Enterprise SSO. |

---

## 6. Best Practices: Lưu trữ Token ở đâu an toàn nhất?

Trong ứng dụng Web / SPA (Angular), việc cất giữ Token là bài toán bảo mật rất quan trọng:

| Vị trí lưu trữ | Nguy cơ bảo mật | Ưu / Nhược điểm | Đánh giá khuyến nghị |
| :--- | :--- | :--- | :--- |
| **`localStorage`** | Bị tấn công **XSS** (Cross-Site Scripting). Nếu hacker chèn được mã JS độc vào web, chúng đọc được `localStorage.getItem()` và cướp mất token. | Rất dễ code, F5 trang web không bị mất token. | ⚠️ Phù hợp cho app nội bộ, dự án học tập, hoặc app kiểm soát chặt chẽ XSS. |
| **In-Memory (Biến JavaScript trong RAM)** | Hacker XSS không đọc trực tiếp được dễ dàng. | F5 trang web là mất phiên đăng nhập (phải dùng Silent Refresh để lấy lại). | 🛡️ Chuẩn mặc định của SDK Auth0 khi cấu hình `cacheLocation: 'memory'`. |
| **`HttpOnly Cookie`** | Hacker chạy mã JavaScript trên trình duyệt **hoàn toàn KHÔNG THỂ đọc được cookie này**. | Chống được XSS 100%. Tuy nhiên phải cấu hình `SameSite=Strict` để chống thêm tấn công **CSRF**. | 🏆 **Lựa chọn an toàn số 1** cho các hệ thống ngân hàng, thương mại điện tử lớn. |

---

## 7. Hướng dẫn Apply Code thực tế vào Dự án Angular 22 & Ionic (Từ A - Z)

Để tích hợp hoàn chỉnh hệ thống xác thực Auth0 vào dự án `dev-blog-client` (Angular 22 + Ionic Standalone), bạn thực hiện theo các bước chuẩn mực sau:

### 7.1. Cài đặt SDK chính thức
Chạy lệnh cài đặt gói chính chủ `@auth0/auth0-angular`:
```bash
npm install @auth0/auth0-angular
```

---

### 7.2. Cấu hình biến môi trường (`src/environments/environment.ts`)
Tách riêng thông số Auth0 vào file cấu hình môi trường để bảo mật và dễ chuyển đổi giữa Dev/Prod:

```typescript
export const environment = {
  production: false,
  firebase: {
    projectId: 'blog-dev-33836',
    databaseURL: 'https://blog-dev-33836-default-rtdb.asia-southeast1.firebasedatabase.app'
  },
  auth0: {
    domain: 'dev-blog.jp.auth0.com',               // Domain từ Auth0 Dashboard
    clientId: 'a8b7c6d5e4f3g2h1',                   // Client ID từ Auth0 Application
    redirectUri: window.location.origin,            // Callback URL sau khi đăng nhập
    audience: 'https://api.devblog.com'             // Identifier của Backend API (để xin Access Token)
  }
};
```

---

### 7.3. Cấu hình Provider & Interceptor (`src/app/app.config.ts`)
Đăng ký `provideAuth0` và `authHttpInterceptorFn` để tự động đính kèm Access Token vào mọi HTTP request gửi đến backend:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';
import { routes } from './app.routes';
import { environment } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // 1. Kích hoạt HTTP Interceptor của Auth0
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),

    // 2. Cung cấp cấu hình Auth0 toàn ứng dụng
    provideAuth0({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience
      },
      useRefreshTokens: true,            // Bật Refresh Token tự động làm mới ngầm
      cacheLocation: 'localstorage',     // Duy trì đăng nhập khi refresh F5
      httpInterceptor: {
        allowedList: [
          // Tự động gắn Authorization: Bearer <token> cho endpoint backend API
          {
            uri: `${environment.auth0.audience}/*`,
            tokenOptions: {
              authorizationParams: {
                audience: environment.auth0.audience
              }
            }
          }
        ]
      }
    })
  ]
};
```

---

### 7.4. Bảo vệ Router bằng `authGuard`
Chỉ cho phép người dùng đã đăng nhập mới được truy cập các trang nhạy cảm (như trang tạo/sửa bài viết):

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  {
    path: 'blog',
    loadComponent: () => import('./blog/blog-container/blog-container.component').then(m => m.BlogContainerComponent)
  },
  {
    path: 'blog/create',
    canActivate: [authGuard], // 🛡️ BẢO VỆ ROUTE: Chưa đăng nhập sẽ tự chuyển hướng sang Auth0
    loadComponent: () => import('./blog/blog-form/blog-form.component').then(m => m.BlogFormComponent)
  },
  {
    path: '',
    redirectTo: 'blog',
    pathMatch: 'full'
  }
];
```

---

### 7.5. Xây dựng Component Đăng nhập & Thông tin User
Tạo component giao diện hiển thị trạng thái đăng nhập, Avatar và nút Logout:

```typescript
// src/app/shared/auth-button.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-auth-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="auth-wrapper">
      <!-- Trạng thái 1: Chưa đăng nhập -->
      <button 
        *ngIf="(auth.isAuthenticated$ | async) === false" 
        (click)="login()" 
        class="shadcn-btn shadcn-btn--primary">
        🔑 Đăng Nhập
      </button>

      <!-- Trạng thái 2: Đang tải thông tin xác thực -->
      <span *ngIf="auth.isLoading$ | async" class="loading-spinner">
        ⏳ Đang kiểm tra...
      </span>

      <!-- Trạng thái 3: Đã đăng nhập thành công -->
      <div *ngIf="auth.user$ | async as user" class="user-badge">
        <img [src]="user.picture" [alt]="user.name" class="user-avatar" />
        <div class="user-info">
          <span class="user-name">{{ user.name }}</span>
          <span class="user-email">{{ user.email }}</span>
        </div>
        <button (click)="logout()" class="logout-btn" title="Đăng xuất">
          🚪
        </button>
      </div>
    </div>
  `,
  styles: [`
    .auth-wrapper { display: flex; align-items: center; gap: 8px; }
    .user-badge { display: flex; align-items: center; gap: 8px; background: #f4f4f5; padding: 4px 10px; border-radius: 9999px; }
    .user-avatar { width: 30px; height: 30px; border-radius: 50%; object-fit: cover; }
    .user-info { display: flex; flex-direction: column; }
    .user-name { font-size: 0.8rem; font-weight: 600; color: #18181b; }
    .user-email { font-size: 0.7rem; color: #71717a; }
    .logout-btn { background: none; border: none; cursor: pointer; font-size: 1rem; }
  `]
})
export class AuthButtonComponent {
  public auth = inject(AuthService);

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: { returnTo: window.location.origin }
    });
  }
}
```

---

### 7.6. Xử lý trên Mobile App với Capacitor (Deep Link Callback)

Khi chạy ứng dụng trên điện thoại (Android / iOS qua Capacitor), Auth0 không thể redirect về `http://localhost:4200` mà cần redirect về **Custom URL Scheme**:

1. **Thêm Callback URL trong Auth0 Dashboard**:
   ```
   devblog://dev-blog.jp.auth0.com/capacitor/devblog/callback
   ```
2. **Lắng nghe Deep Link Callback trong `AppComponent`**:
   Kết hợp với hệ thống Deep Link sẵn có trong dự án:

```typescript
import { Component, OnInit, inject } from '@angular/core';
import { App } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  template: `<ion-app><ion-router-outlet></ion-router-outlet></ion-app>`
})
export class AppComponent implements OnInit {
  private auth = inject(AuthService);

  ngOnInit() {
    App.addListener('appUrlOpen', ({ url }) => {
      // Khi Auth0 chuyển hướng về app qua deep link: devblog://...
      if (url.startsWith('devblog://')) {
        if (url.includes('state=') && (url.includes('code=') || url.includes('error='))) {
          this.auth.handleRedirectCallback(url).subscribe(() => {
            Browser.close(); // Đóng trình duyệt in-app sau khi login thành công
          });
        }
      }
    });
  }
}
```

---

### 7.7. Backend Verify JWT Token bằng JWKS (Node.js Express)
Backend chỉ cần Public Key (JWKS) do Auth0 cung cấp để kiểm tra chữ ký của Access Token mà không cần chia sẻ Secret Key bí mật:

```javascript
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

const app = express();

// Middleware xác minh tính hợp lệ của Token
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-blog.jp.auth0.com/.well-known/jwks.json' // Tự động lấy Public Key
  }),
  audience: 'https://api.devblog.com',
  issuer: 'https://dev-blog.jp.auth0.com/',
  algorithms: ['RS256']
});

// Endpoint cần đăng nhập: Lấy thông tin & tạo blog mới
app.post('/api/blogs', checkJwt, (req, res) => {
  // req.auth chứa thông tin Payload của JWT sau khi verify thành công
  const userId = req.auth.sub;
  console.log('✅ Token hợp lệ! User ID:', userId);

  res.json({
    message: 'Tạo bài viết thành công!',
    createdBy: userId
  });
});

app.listen(3000, () => console.log('🚀 API Backend đang chạy tại http://localhost:3000'));
```

---

> [!TIP]
> **Tóm tắt quy trình áp dụng:**
> 1. Cài thư viện `@auth0/auth0-angular`.
> 2. Đăng ký `provideAuth0` trong `app.config.ts`.
> 3. Dùng `authGuard` bảo vệ route nhạy cảm.
> 4. `authHttpInterceptorFn` tự động gửi Access Token cho backend qua header `Authorization: Bearer <token>`.
