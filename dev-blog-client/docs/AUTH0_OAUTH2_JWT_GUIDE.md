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
   - [3.1. Bản chất của OAuth 2.0: Ví dụ đời thực dễ hiểu](#31-bản-chất-của-oauth-20-ví-dụ-đời-thực-dễ-hiểu)
   - [3.2. 4 Vai trò chính trong OAuth 2.0](#32-4-vai-trò-chính-trong-oauth-20)
   - [3.3. Cơ chế PKCE là gì? Ví dụ trò chơi Câu đố mật](#33-cơ-chế-pkce-là-gì-ví-dụ-trò-chơi-câu-đố-mật)
   - [3.4. Dòng thời gian 6 bước chi tiết (Flow Timeline từng ly từng tí)](#34-dòng-thời-gian-6-bước-chi-tiết-flow-timeline-từng-ly-từng-tí)
   - [3.5. Bảng giải mã từ điển thuật ngữ thực tế (Cheat Sheet)](#35-bảng-giải-mã-từ-điển-thuật-ngữ-thực-tế-cheat-sheet)
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

### 3.1. Bản chất của OAuth 2.0: Ví dụ đời thực dễ hiểu

OAuth 2.0 sinh ra để giải quyết bài toán cốt lõi: **Làm sao để ứng dụng bên thứ 3 (như Dev Blog) có thể nhận dạng người dùng hoặc lấy dữ liệu mà người dùng KHÔNG CẦN PHẢI GIAO MẬT KHẨU GỐC cho ứng dụng?**

> [!TIP]
> **Ví dụ Khách sạn & Chiếc chìa khóa nhà:**
> - **Cách cũ (Đăng nhập mật khẩu truyền thống):** Bạn giao luôn chùm chìa khóa nhà của bạn cho nhân viên lễ tân. Nếu khách sạn bị trộm, kẻ gian có chìa khóa vào mở toàn bộ nhà bạn (Gmail, Drive, Facebook, Ngân hàng).
> - **Cách mới (OAuth 2.0):** Bạn đến quầy lễ tân Google, Google cấp cho ứng dụng Dev Blog một chiếc **Thẻ từ quẹt cửa tạm thời (Access Token)**. Chiếc thẻ từ này:
>   1. Chỉ mở được đúng 1 cánh cửa cho phép: *"Xem tên và email"*.
>   2. Không bao giờ mở được két sắt (không đọc tin nhắn, không đổi được mật khẩu).
>   3. Tự động hết hạn sau 1 tiếng. Hết giờ thẻ thành vô dụng!

---

### 3.2. 4 Vai trò chính trong OAuth 2.0

Để dễ nhớ, hãy hình dung 4 nhân vật trong một buổi tiệc:

| Thuật ngữ OAuth 2.0 | Tên đời thực | Vai trò trong hệ thống |
| :--- | :--- | :--- |
| **1. Resource Owner** | **Chủ sở hữu** (Chính là Bạn / End User) | Người sở hữu tài khoản Google, có quyền quyết định *"Cho phép"* hay *"Từ chối"* cấp quyền. |
| **2. Client** | **Ứng dụng xin quyền** (Angular Dev Blog) | Ứng dụng chạy trên trình duyệt của bạn, muốn biết bạn là ai để cho phép viết bài. |
| **3. Authorization Server** | **Máy chủ cấp phép** (Google Accounts / Auth0) | Nơi lưu giữ mật khẩu thật, hiển thị màn hình đăng nhập, xác thực 2FA và cấp thẻ Token. |
| **4. Resource Server** | **Máy chủ tài nguyên** (Backend API / Firebase) | Nơi cất giữ bài viết, danh sách user. Chỉ phục vụ khi nhận được Thẻ từ hợp lệ. |

---

### 3.3. Cơ chế PKCE là gì? Ví dụ trò chơi Câu đố mật

Trước đây, các ứng dụng web truyền thống có Server backend riêng sẽ giữ một mã bí mật gọi là `Client Secret`.  
Tuy nhiên, với ứng dụng **Single Page Application (Angular / React / Vue)** hoặc **Mobile App (Ionic / Capacitor)**, mã nguồn chạy hoàn toàn ở phía thiết bị người dùng:
- Mọi người đều có thể mở F12 Developer Tools hoặc decompile file `.apk` để đọc lén mã bí mật.
- Do đó, **tuyệt đối không được lưu Client Secret ở Frontend**.

Để giải quyết vấn đề này, chuẩn bảo mật quốc tế sinh ra **PKCE (Proof Key for Code Exchange - phát âm là "pixie")**.

> [!IMPORTANT]
> **Hình dung PKCE qua "Trò chơi câu đố mật":**
> 1. **Đáp án bí mật (`code_verifier`):** Khi bạn bấm nút đăng nhập, Angular App tự nghĩ ra một từ khóa bí mật ngẫu nhiên trong bộ nhớ (ví dụ: `"cho_xanh_khat_bia"`). App cất kỹ từ này vào túi, không gửi ra ngoài.
> 2. **Câu đố mã hóa (`code_challenge`):** App dùng thuật toán băm 1 chiều (SHA-256) biến `"cho_xanh_khat_bia"` thành một chuỗi mã hóa loằng ngoằng `"9a8f...bc"`. App gửi câu đố này cho Google giữ trước.
> 3. **Nhận vé tạm thời (`Authorization Code`):** Sau khi bạn đăng nhập xong, Google trả về một chiếc vé bốc số qua URL.
> 4. **Kẻ trộm cướp vé thì sao?** Giả sử có mã độc trên máy cướp được chiếc vé này đem sang Google đòi đổi Token. Google sẽ hỏi: *"Đâu, đáp án gốc của câu đố ban đầu là gì?"*. Kẻ trộm **chịu thua** vì không biết đáp án trong túi của App!
> 5. **Chính chủ nhận thẻ:** Chỉ có Angular App của bạn mới giữ đáp án gốc `"cho_xanh_khat_bia"`. App gửi cả Vé + Đáp án gốc lên. Google băm lại thấy đúng `"9a8f...bc"` ➔ Xác nhận chính chủ và cấp Token!

---

### 3.4. Dòng thời gian 6 bước chi tiết (Flow Timeline từng ly từng tí)

```
[1. User Bấm Nút] ──► [2. Màn Hình Google] ──► [3. Trả Về Vé Tạm]
        ▲                                              │
        │                                              ▼
[6. Gọi API Blog] ◄── [5. Đăng Nhập Xong] ◄── [4. Đổi Token Ngầm]
```

#### Sơ đồ trình tự chi tiết (Mermaid Sequence):

```mermaid
sequenceDiagram
    autonumber
    actor User as 👤 Người dùng
    participant App as 💻 Angular App (Client)
    participant Google as 🛡️ Google Auth Server
    participant API as 🚀 Backend API (Resource)

    Note over App: BƯỚC 1: CHUẨN BỊ MẬT MÃ<br/>- Sinh code_verifier (Bí mật)<br/>- Băm SHA256 ra code_challenge<br/>- Sinh state chống CSRF
    User->>App: 1. Bấm nút "Đăng nhập với Google"
    App->>Google: 2. Redirect sang Google kèm:<br/>clientId, redirectUri, scope, code_challenge, state

    Note over Google: BƯỚC 2: XÁC THỰC NGƯỜI DÙNG
    Google->>User: 3. Hiển thị form login Google & Màn hình Consent
    User->>Google: 4. Nhập mật khẩu Google & bấm "Cho phép"

    Note over Google: BƯỚC 3: CẤP VÉ TẠM
    Google-->>App: 5. Redirect về redirectUri kèm:<br/>?code=AUTH_CODE_XYZ&state=...

    Note over App: BƯỚC 4: ĐỔI TOKEN NGẦM (PKCE)<br/>App so khớp state hợp lệ,<br/>gửi code + code_verifier gốc
    App->>Google: 6. POST /oauth/token<br/>(code + code_verifier + clientId)
    Note over Google: Google băm code_verifier,<br/>khớp với code_challenge -> HỢP LỆ!
    Google-->>App: 7. Trả về Token Bundle:<br/>{ access_token, id_token, refresh_token }

    Note over App: BƯỚC 5: HOÀN TẤT ĐĂNG NHẬP<br/>- Lưu token vào LocalStorage/Signals<br/>- Lấy info từ id_token (Tên, Avatar)<br/>- Chuyển hướng vào trang /blog
    App-->>User: 8. Hiển thị Avatar & Tên User trên Header

    Note over App,API: BƯỚC 6: SỬ DỤNG TOKEN GỌI DỮ LIỆU
    App->>API: 9. Gọi API kèm Header:<br/>Authorization: Bearer <access_token>
    API-->>App: 10. Trả về dữ liệu bài viết an toàn!
```

---

#### Diễn giải chi tiết từng bước:

#### Bước 1: Chuẩn bị & Chuyển hướng (App của bạn)
* **Hành động của Bạn:** Bấm nút **"Đăng nhập với Google"** trên giao diện Blog.
* **App làm gì ở hậu trường:**
  1. Tạo 1 mật khẩu bí mật: `code_verifier` (giữ lại trong máy).
  2. Mã hóa nó thành câu đố: `code_challenge`.
  3. Mở trình duyệt chuyển sang trang Google bằng đường link có kèm thông tin:
     ```http
     https://accounts.google.com/o/oauth2/v2/auth?
        client_id=devblog.apps.google.com   <-- Tên App của bạn
        &redirect_uri=http://localhost:4200/auth/callback <-- Chỗ quay về
        &scope=email profile                <-- Quyền muốn xin
        &code_challenge=abc123xyz           <-- Gửi câu đố cho Google giữ
        &state=random_anti_csrf             <-- Mã chống lừa đảo
     ```

#### Bước 2: Đăng nhập & Cấp quyền (Tại trang của Google)
* **Trình duyệt lúc này:** Đang ở trên máy chủ của Google (`accounts.google.com`).
* **Hành động của Bạn:**
  1. Nhập email & mật khẩu tài khoản Google. (App Blog **không hề biết** mật khẩu này).
  2. Màn hình hiện lên: *"Ứng dụng Dev Blog muốn xem tên và email của bạn. Bạn có đồng ý không?"*
  3. Bạn bấm: **"Cho phép / Đồng ý"**.

#### Bước 3: Google gửi "Vé tạm" quay về App
* Sau khi bạn bấm "Đồng ý", Google biết đã xong việc. Google lập tức **redirect (chuyển hướng)** trình duyệt quay trở lại địa chỉ `redirect_uri` của Blog kèm theo một cái mã tạm gọi là `code`:
  ```http
  http://localhost:4200/auth/callback?code=4/0AY0e-g...&state=random_anti_csrf
  ```
* **App của bạn làm gì:**
  - Bắt lấy cái URL này.
  - So sánh `state` xem có đúng là phiên do chính mình gửi đi lúc nãy không (nếu đúng thì đi tiếp, nếu không thì cảnh báo có kẻ đang giả mạo).
  - Rút lấy cái mã tạm `code=4/0AY0e-g...`.

#### Bước 4: Đổi Vé Tạm lấy Token Thật (Giai đoạn PKCE cốt lõi)
* Lúc này App vẫn **chưa** có thông tin đăng nhập. Cái `code` ở Bước 3 chỉ là vé tạm thời (sống được khoảng 30 - 60 giây).
* **App âm thầm gửi 1 request POST** ngầm từ phía sau (User không nhìn thấy) lên máy chủ Google:
  ```http
  POST https://oauth2.googleapis.com/token
  Dữ liệu gửi lên:
    - code: "4/0AY0e-g..."              (Vé tạm vừa nhận)
    - code_verifier: "mat_khau_bi_mat"   (Đáp án bí mật app giữ từ Bước 1)
    - client_id: "devblog.apps.google.com"
  ```
* **Google kiểm tra:**
  1. Cái vé `code` này có đúng do Google vừa phát ra không? 👉 Đúng.
  2. Lấy `code_verifier` đem hash lại xem có ra đúng câu đố `code_challenge` gửi từ Bước 1 không? 👉 Đúng chính chủ App gửi!
  3. Google lập tức trả về gói dữ liệu gồm:
     - **`access_token`**: Chìa khóa vào cửa (chuỗi JWT).
     - **`id_token`**: Chứa thông tin của bạn (Tên: Phú Cường, Email: phu.cuong@gmail.com, Avatar...).
     - **`refresh_token`**: Chìa khóa dùng để gia hạn khi `access_token` hết hạn.

#### Bước 5: Hoàn tất đăng nhập trên App
* App nhận được gói Token từ Google:
  - Bóc tách `id_token` để lấy: Tên, Email, Ảnh avatar.
  - Cập nhật giao diện: Header hiện *"Chào Phú Cường"*, ẩn nút Đăng nhập, hiện nút Đăng xuất.
  - Lưu `access_token` vào bộ nhớ an toàn (`localStorage` / `sessionStorage`).
  - Chuyển hướng người dùng vào trang chủ `/blog`.

#### Bước 6: Sử dụng Token để gọi API (Hậu OAuth)
Sau khi đã có `access_token`, mỗi lần bạn bấm "Tạo bài viết mới" hoặc "Đọc bài viết VIP", App chỉ cần gửi kèm token vào Header:
```http
GET https://api.devblog.com/posts
Header:
   Authorization: Bearer <access_token_vừa_lấy_ở_bước_4>
```
Server của bạn nhìn thấy Header này:
* Nhận diện: *"À, token hợp lệ của Phú Cường!"* ➔ Cho phép xem và lưu bài viết.

> [!NOTE]
> **Tóm tắt trong 1 câu:**  
> **OAuth 2.0 PKCE** là quy trình: Bạn sang Google đăng nhập ➔ Google phát cho bạn 1 cái **vé tạm** đưa về App ➔ App dùng vé tạm kèm **đáp án mật** để đổi lấy **Thẻ Token thật** ➔ Dùng Thẻ Token đó để hoạt động trong suốt quá trình dùng App mà **không bao giờ để lộ mật khẩu Google**.

---

### 3.5. Bảng giải mã từ điển thuật ngữ thực tế (Cheat Sheet)

Khi đọc tài liệu hoặc code OAuth 2.0, bạn sẽ gặp các từ khóa sau:

| Thuật ngữ | Ý nghĩa kỹ thuật | Ví dụ giá trị thực tế |
| :--- | :--- | :--- |
| **`client_id`** | Mã định danh duy nhất của App đăng ký trên Google/Auth0. | `83921948123-devblog.apps.googleusercontent.com` |
| **`redirect_uri`** | Địa chỉ đường link Google sẽ đưa người dùng quay về sau khi đăng nhập xong. | `http://localhost:4200/auth/callback` |
| **`scope`** | Danh sách các quyền mà App muốn xin từ người dùng. | `openid profile email` (Xin định danh OIDC, họ tên, email) |
| **`state`** | Chuỗi ngẫu nhiên sinh ra để chống tấn công giả mạo CSRF (Request Forgery). | `c9afb4e293104c758c34151b6dcc22dd` |
| **`code_verifier`** | Chuỗi bí mật gốc ngẫu nhiên sinh ra bởi trình duyệt (chỉ Client biết). | `dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk` |
| **`code_challenge`** | Chuỗi băm SHA-256 từ `code_verifier` (câu đố gửi trước cho Auth Server). | `E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM` |
| **`authorization_code`** | Mã vé tạm thời sống 30-60 giây do Auth Server cấp để đổi lấy Token. | `4/0AY0e-g7Qx_8p9Lq91A...` |
| **`access_token`** | Chiếc thẻ từ quyền năng (Bearer Token) dùng kẹp vào Header gọi API. | `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...` |
| **`id_token`** | Thẻ căn cước chứa thông tin người dùng (Họ tên, Email, Avatar) chuẩn OpenID Connect. | `eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...` |
| **`refresh_token`** | Chìa khóa dự phòng dài hạn dùng để lấy `access_token` mới khi token cũ hết hạn 1 tiếng. | `rt_98ab710ef67cd890...` |

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
