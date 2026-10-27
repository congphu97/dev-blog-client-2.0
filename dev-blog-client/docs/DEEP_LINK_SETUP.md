# Hướng Dẫn Toàn Diện Về Deep Link (Dev Blog Client)

Tài liệu này bao gồm:
1. **Lý thuyết cốt lõi:** Khái niệm, phân loại các loại Deep Link và bảng so sánh chi tiết (*Traditional vs Deferred vs Universal/App Links*).
2. **Kiến trúc & Cài đặt thực tế:** Cấu hình trong source code dự án (Angular/Capacitor, Android, iOS).
3. **Hướng dẫn kiểm thử (Testing):** Các câu lệnh test qua CLI và trình duyệt.

---

## PHẦN 1: LÝ THUYẾT & PHÂN LOẠI DEEP LINK

### 1. Deep Link là gì?
Trên môi trường Web, mỗi trang hoặc bài viết đều có một URL cụ thể (`https://example.com/blog/123`). 

Trên ứng dụng di động (Mobile App), nếu người dùng click vào link mà App chỉ mở ra **Trang chủ (Home Screen)** thì họ sẽ mất dấu nội dung vừa xem. 
> **Deep Link (Liên kết sâu)** là kỹ thuật điều hướng cho phép một URL trỏ thẳng tới một màn hình cụ thể (specific screen/feature) và truyền dữ liệu trực tiếp vào bên trong ứng dụng di động.

---

### 2. Có bao nhiêu loại Deep Link?

Trong hệ sinh thái ứng dụng di động hiện đại, Deep Link được chia làm **4 loại cốt lõi**:

```
                              ┌─────────────────────────────────────────┐
                              │           HỆ THỐNG DEEP LINK            │
                              └────────────────────┬────────────────────┘
                                                   │
         ┌────────────────────────┬────────────────┴───────────────┬────────────────────────┐
         ▼                        ▼                                ▼                        ▼
┌──────────────────┐    ┌────────────────────┐          ┌──────────────────────┐   ┌───────────────────┐
│ 1. Traditional   │    │ 2. Universal Links │          │ 3. Deferred          │   │ 4. Contextual     │
│    Deep Links    │    │    / App Links     │          │    Deep Links        │   │    Deep Links     │
│ (Custom Schemes) │    │ (Standard HTTPS)   │          │ (Trì hoãn sau cài)   │   │ (Kèm metadata/UX) │
└──────────────────┘    └────────────────────┘          └──────────────────────┘   └───────────────────┘
```

#### 🔹 2.1. Traditional Deep Link (Custom URL Scheme)
*Hình thức sơ khai đời đầu (Legacy).*
- **Định dạng:** Dùng URI Scheme tùy chỉnh tự đặt thay vì `http/https`.
  - *Ví dụ:* `devblog://blog/123`, `fb://profile`, `zalo://qr`
- **Cơ chế:** Khai báo scheme trong file cấu hình (`AndroidManifest.xml` hoặc `Info.plist`). Khi click link, hệ điều hành (OS) tìm ứng dụng đã đăng ký scheme đó để mở.
- **Hạn chế lớn:**
  1. **Lỗi khi chưa cài App:** Nếu máy chưa cài app, trình duyệt sẽ báo lỗi (*"Safari cannot open page because the address is invalid"* / Chrome không phản hồi).
  2. **Dễ bị giả mạo (Scheme Hijacking):** Bất kỳ bên nào cũng có thể tạo app đặt trùng scheme với app của bạn, gây rủi ro bảo mật và tranh chấp quyền mở.

#### 🔹 2.2. Universal Links (iOS) & Android App Links
*Chuẩn Deep Link hiện đại do Apple (iOS 9+) & Google (Android 6.0+) phát triển.*
- **Định dạng:** Sử dụng URL web chuẩn `https://` hoàn toàn bình thường.
  - *Ví dụ:* `https://congphu97.github.io/dev-blog-client-2.0/blog/123`
- **Cơ chế (Xác thực 2 chiều - Two-way verification):**
  - Cần host một file cấu hình bảo mật trên website (`.well-known/apple-app-site-association` trên iOS hoặc `.well-known/assetlinks.json` trên Android).
  - Khi cài app, OS tự tải file này về để kiểm chứng quyền sở hữu domain.
- **Ưu điểm vượt trội:**
  - **Bảo mật tuyệt đối:** Không ai có thể nhái được link vì họ không sở hữu domain web của bạn.
  - **Fallback an toàn:** Nếu máy **chưa cài app**, link sẽ tự động mở trang web trên trình duyệt, không bao giờ xuất hiện màn hình báo lỗi hỏng link.

#### 🔹 2.3. Deferred Deep Link (Deep Link Trì Hoãn)
*Giải pháp cho bài toán người dùng CHƯA cài đặt ứng dụng.*

Cả Traditional và Universal Link đều gặp một vấn đề: Nếu người dùng chưa cài app, họ được dẫn lên Store để tải, nhưng **sau khi cài xong và mở app lần đầu, dữ liệu link ban đầu bị mất**, app quay về trang chủ.

> **Deferred Deep Link** sẽ "hoãn" (defer) việc điều hướng: Nó lưu lại ngữ cảnh click của người dùng trước khi vào App Store / Google Play, và **sau khi người dùng tải xong và mở app lần đầu tiên**, app sẽ tự động nhảy đến đúng màn hình đích ban đầu.

- **Cơ chế theo dõi:**
  - **Android:** Dùng **Google Play Install Referrer API** (truyền metadata từ URL store vào app khi cài đặt).
  - **iOS:** Dùng **Pasteboard/Clipboard** hoặc **Fingerprinting/Probabilistic Matching** (đối chiếu IP, User-Agent...).
  - Thường được triển khai qua các dịch vụ như **Branch.io**, **AppsFlyer**, **Adjust** (Firebase Dynamic Links trước đây cũng thuộc nhóm này nhưng đã bị Google khai tử).

#### 🔹 2.4. Contextual Deep Link (Deep Link Ngữ Cảnh)
*Biến thể nâng cao của Deferred/Universal Link mang theo dữ liệu ngữ cảnh phong phú (Metadata).*
- **Dữ liệu mang theo:** Ai là người chia sẻ link (`referrer_id`), mã giảm giá đi kèm (`coupon_code`), chiến dịch tiếp thị (`campaign_name`).
- **Ứng dụng:**
  - Tự động điền mã voucher giảm giá khi người dùng mới vừa mở app lần đầu.
  - Cá nhân hóa màn hình Onboarding: *"Chào Nam, bạn của Tuấn vừa tặng bạn 50.000đ!"*.

---

### 3. Bảng So Sánh Chi Tiết

| Tiêu chí | Traditional Deep Link (Custom Scheme) | Universal Links (iOS) / App Links (Android) | Deferred Deep Link |
| :--- | :--- | :--- | :--- |
| **Định dạng URL** | `devblog://path` | `https://domain.com/path` | `https://link.domain.com/xyz` (hoặc qua SDK) |
| **Khi ĐÃ cài App** | Mở thẳng màn hình trong App | Mở thẳng màn hình trong App | Mở thẳng màn hình trong App |
| **Khi CHƯA cài App** | ❌ **Báo lỗi hỏng link** | 🌐 Mở trang Web trên Safari/Chrome | 🏪 Dẫn vào App Store / Google Play để tải |
| **Sau khi tải & mở App lần đầu** | ❌ Về trang chủ (mất dữ liệu link) | ❌ Về trang chủ (mất dữ liệu link) | ✅ **Mở đúng màn hình đích** đã click ban đầu |
| **Độ an toàn / Bảo mật** | ⚠️ Thấp (Dễ bị app khác nhái Scheme) | 🔒 Rất cao (Chứng thực 2 chiều với domain web) | 🔒 Rất cao |
| **Yêu cầu hạ tầng** | Chỉ cấu hình Native App | Domain Web có HTTPS + Host file json xác thực | Cần hệ thống Backend tracking hoặc SDK (Branch, AppsFlyer) |
| **Mục đích chính** | Chuyển đổi giữa các App (vd: App Ngân hàng, MoMo redirect ngược lại) | Điều hướng từ Web, Email, Tin nhắn sang App chính thức | Chiến dịch Marketing, Ads, Referral, User Onboarding |

---

## PHẦN 2: THIẾT LẬP THỰC TẾ TRONG DỰ ÁN (DEV BLOG CLIENT)

Dự án hiện tại kết hợp song song cả 2 kỹ thuật:
1. **Traditional Deep Link (`devblog://`)**: Để mở nhanh và nhận callback từ app khác.
2. **Web App Links (`https://congphu97.github.io/dev-blog-client-2.0/...`)**: Để người dùng mở từ web/trình duyệt.

---

### 1. Phía Angular Logic (`src/app/app.component.ts`)

Trong `AppComponent`, phương thức `setupDeepLinks()` được khởi chạy trong vòng đời `ngOnInit()`:

```typescript
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.setupDeepLinks();
  }

  private async setupDeepLinks() {
    // 1. Xử lý Cold Start: Khi App đang đóng hoàn toàn và được mở lên từ 1 link
    try {
      const launchUrl = await App.getLaunchUrl();
      if (launchUrl?.url) {
        this.handleUrl(launchUrl.url);
      }
    } catch (err) {
      console.warn('Lỗi kiểm tra Launch URL:', err);
    }

    // 2. Xử lý Warm Start / Background: Khi App đang chạy ngầm hoặc mở sẵn
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.handleUrl(event.url);
    });
  }

  private handleUrl(url: string) {
    this.zone.run(() => {
      console.log('🔗 Nhận Deep Link URL:', url);
      let targetPath = '';

      // Trường hợp 1: Web Link / App Links (HTTP/HTTPS)
      if (url.startsWith('http://') || url.startsWith('https://')) {
        try {
          const urlObj = new URL(url);
          // Loại bỏ base href khi host trên GitHub Pages /dev-blog-client-2.0
          targetPath = urlObj.pathname.replace('/dev-blog-client-2.0', '') || '/';
          if (urlObj.search) {
            targetPath += urlObj.search;
          }
          if (urlObj.hash) {
            targetPath += urlObj.hash;
          }
        } catch {
          targetPath = '/';
        }
      // Trường hợp 2: Custom URL Scheme (devblog://...)
      } else if (url.includes('://')) {
        const pathAfterScheme = url.split('://')[1] || '';
        targetPath = pathAfterScheme.startsWith('/') ? pathAfterScheme : '/' + pathAfterScheme;
      }

      // Điều hướng Router
      if (targetPath) {
        console.log('🚀 Điều hướng Angular Router đến:', targetPath);
        this.router.navigateByUrl(targetPath);
      }
    });
  }
}
```

#### Điểm kỹ thuật cần lưu ý:
- `App.getLaunchUrl()`: Bắt buộc cho **Cold Start**, nếu chỉ dùng listener `appUrlOpen` sẽ bị lỡ link khi người dùng mở app lúc app chưa chạy trong RAM.
- `this.zone.run()`: Bắt buộc bọc khi nhận event từ Capacitor listener ngoài luồng để Angular Zone nhận diện và render/điều hướng trang ngay lập tức.

---

### 2. Cấu hình Native trên Android (`android/app/src/main/AndroidManifest.xml`)

Trong thẻ `<activity android:name=".MainActivity">`, khai báo 2 bộ `<intent-filter>`:

```xml
<!-- 1. Deep Linking: Custom URL Scheme (devblog://...) -->
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="devblog" />
</intent-filter>

<!-- 2. Deep Linking: Web App Links (https://congphu97.github.io/dev-blog-client-2.0/...) -->
<intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data
        android:scheme="https"
        android:host="congphu97.github.io"
        android:pathPrefix="/dev-blog-client-2.0"
    />
</intent-filter>
```

---

### 3. Cấu hình Native trên iOS (`ios/App/App/Info.plist`)

Khai báo schema `devblog` trong block `CFBundleURLTypes`:

```xml
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleURLName</key>
        <string>com.devblog.client</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>devblog</string>
        </array>
    </dict>
</array>
```

---

## PHẦN 3: HƯỚNG DẪN KIỂM THỬ (TESTING)

### Cách 1: Test trên Android (qua Terminal / adb)
```bash
# Test trang danh sách Blog
adb shell am start -W -a android.intent.action.VIEW -d "devblog://blog" io.ionic.starter

# Test mở trang chi tiết 1 bài blog (ví dụ id: 123)
adb shell am start -W -a android.intent.action.VIEW -d "devblog://blog/123" io.ionic.starter

# Test link Web (App Links)
adb shell am start -W -a android.intent.action.VIEW -d "https://congphu97.github.io/dev-blog-client-2.0/blog" io.ionic.starter
```

### Cách 2: Test trên iOS Simulator (Terminal)
```bash
# Mở app qua custom scheme
xcrun simctl openurl booted "devblog://blog"

# Mở chi tiết bài blog
xcrun simctl openurl booted "devblog://blog/123"
```

### Cách 3: Test trên Trình duyệt thiết bị (Mobile Safari / Chrome)
Tạo 1 file HTML hoặc nhắn link qua tin nhắn / note rồi bấm vào:
```html
<a href="devblog://blog">Mở App - Trang Blog</a>
<a href="devblog://blog/123">Mở App - Chi Tiết Blog 123</a>
<a href="https://congphu97.github.io/dev-blog-client-2.0/blog">Mở bằng Web Link</a>
```
