# Hướng Dẫn Thiết Lập & Hoạt Động Của Deep Link (Dev Blog Client)

Hệ thống **Deep Link** trong dự án được thiết lập qua 3 thành phần chính:
1. **Logic xử lý trong Angular** (sử dụng `@capacitor/app` kết hợp Angular Router).
2. **Cấu hình Native Android** (`AndroidManifest.xml`).
3. **Cấu hình Native iOS** (`Info.plist`).

---

## 1. Phía Angular Logic (`src/app/app.component.ts`)

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

### Điểm kỹ thuật cần lưu ý:
- `App.getLaunchUrl()`: Bắt buộc cho **Cold Start**, nếu chỉ dùng listener `appUrlOpen` sẽ bị lỡ link khi người dùng mở app lúc app chưa chạy trong RAM.
- `this.zone.run()`: Bắt buộc bọc khi nhận event từ Capacitor listener ngoài luồng để Angular Zone nhận diện và render/điều hướng trang ngay lập tức.

---

## 2. Cấu hình Native trên Android (`android/app/src/main/AndroidManifest.xml`)

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

## 3. Cấu hình Native trên iOS (`ios/App/App/Info.plist`)

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

## 4. Hướng dẫn Test Deep Link

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
