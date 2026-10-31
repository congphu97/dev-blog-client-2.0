# HƯỚNG DẪN TẠO VÀ SỬ DỤNG CUSTOM CAPACITOR PLUGIN: FIREBASE GA4 ANALYTICS

Tài liệu này ghi lại toàn bộ quy trình từ con số 0 để xây dựng một **Standalone Custom Capacitor Plugin (Cách 2)** tích hợp **Google Analytics 4 (GA4) qua Firebase Analytics** hỗ trợ cả 3 nền tảng: **Android (Kotlin)**, **iOS (Swift)** và **Web/PWA (TypeScript)**.

---

## MỤC LỤC TỔNG QUAN (OVERVIEW)

- [1. Cấu Trúc Tổng Thể Thư Mục](#1-cấu-trúc-tổng-thể-thư-mục)
- [2. Quy Trình Các Bước Xây Dựng Plugin](#2-quy-trình-các-bước-đã-thực-hiện)
  - [Bước 1: Khởi tạo Plugin Scaffold](#bước-1-khởi-tạo-plugin-scaffold)
  - [Bước 2: Định nghĩa API trong TypeScript (definitions.ts)](#bước-2-định-nghĩa-api-trong-typescript-definitionsts)
  - [Bước 3: Viết Native Code cho Android (Kotlin)](#bước-3-viết-native-code-cho-android-firebaseanalyticspluginkt)
  - [Bước 4: Viết Native Code cho iOS (Swift & CocoaPods)](#bước-4-viết-native-code-cho-ios-firebaseanalyticspluginswift)
  - [Bước 5: Viết Web Fallback (web.ts)](#bước-5-viết-web-fallback-webts)
  - [Bước 6: Khởi Tạo Entry Point (index.ts)](#bước-6-khởi-tạo-entry-point-indexts)
- [3. Cách Link (Cài Đặt) Plugin Vào Project Capacitor](#3-cách-link-cài-đặt-plugin-vào-project-capacitor)
  - [Cách 1: Dùng Local Path npm install (Khuyên dùng nội bộ)](#cách-1-dùng-local-path-npm-install-cách-đang-dùng-trong-project)
  - [Cách 2: Dùng npm link (Symlink khi đang code dở)](#cách-2-dùng-npm-link-symlink---thích-hợp-khi-đang-vừa-code-plugin-vừa-test-app)
  - [Cách 3: Xuất bản lên npm (Public Package)](#cách-3-xuất-bản-lên-npm-khi-phát-hành-chính-thức)
- [4. Cách Sử Dụng Trong Dự Án Angular / Ionic](#4-cách-sử-dụng-trong-dự-án-angular--ionic)
  - [Tạo Service bọc: AnalyticsService](#4-cách-sử-dụng-trong-dự-án-angular--ionic)
  - [Ví dụ gọi từ Component](#4-cách-sử-dụng-trong-dự-án-angular--ionic)
- [5. Cách Build & Sync Lại Khi Có Thay Đổi Trong Plugin](#5-cách-build--sync-lại-khi-có-thay-đổi-trong-plugin)

---

## 1. Cấu Trúc Tổng Thể Thư Mục

Plugin được tạo thành một package độc lập nằm cạnh app:
```
dev-blog-client-2.0/
├── capacitor-plugin-firebase-analytics/    <-- Thư mục Standalone Plugin riêng biệt
│   ├── android/                             <-- Mã nguồn Native Android (Kotlin)
│   │   ├── build.gradle                     <-- Khai báo Firebase Analytics BOM & KTX
│   │   └── src/main/kotlin/.../FirebaseAnalyticsPlugin.kt
│   ├── ios/                                 <-- Mã nguồn Native iOS (Swift)
│   │   ├── Sources/FirebaseAnalyticsPlugin/FirebaseAnalyticsPlugin.swift
│   │   └── CapacitorPluginFirebaseAnalytics.podspec  <-- Khai báo dependency 'FirebaseAnalytics'
│   ├── src/                                 <-- Giao diện TypeScript & Web fallback
│   │   ├── definitions.ts                   <-- Định nghĩa TypeScript Interfaces & Methods
│   │   ├── web.ts                           <-- Fallback chạy trên Web browser (hỗ trợ window.gtag)
│   │   └── index.ts                         <-- Export plugin qua registerPlugin()
│   └── package.json                         <-- npm package config
│
└── dev-blog-client/                         <-- App Angular/Capacitor của bạn
    ├── package.json                         <-- Cài plugin: "capacitor-plugin-firebase-analytics": "../capacitor-plugin-firebase-analytics"
    └── src/app/core/services/analytics.service.ts  <-- Service Angular bọc lại để sử dụng toàn app
```

---

## 2. Quy Trình Các Bước Đã Thực Hiện

### Bước 1: Khởi tạo Plugin Scaffold
Sử dụng công cụ chính thức của Ionic Capacitor:
```bash
npx --yes @capacitor/create-plugin@latest capacitor-plugin-firebase-analytics \
  --name "capacitor-plugin-firebase-analytics" \
  --package-id "com.devblog.plugins.firebaseanalytics" \
  --class-name "FirebaseAnalytics" \
  --author "Phu Tran" \
  --license "MIT" \
  --description "Capacitor custom plugin for Google Analytics 4 (GA4) with Firebase Analytics" \
  --android-lang "kotlin"
```

### Bước 2: Định nghĩa API trong TypeScript ([`definitions.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/capacitor-plugin-firebase-analytics/src/definitions.ts))

File `definitions.ts` là "bản hợp đồng" (Contract) giữa TypeScript trong Web và mã Native (Android/iOS). Mọi method viết ở đây sẽ quy định:
- Web có thể gọi những hàm nào.
- Dữ liệu truyền vào (input parameters) gồm kiểu gì.
- Dữ liệu trả về (Promise resolution) là gì.

#### Chi tiết Code và Giải Thích:
```typescript
// 1. Định nghĩa kiểu dữ liệu cho từng phương thức
export interface LogEventOptions {
  name: string; // Tên sự kiện GA4 (ví dụ: 'share_post', 'purchase')
  params?: Record<string, string | number | boolean>; // Object chứa các key-value tùy ý đính kèm
}

export interface SetUserIdOptions {
  userId: string | null; // ID user (truyền null khi logout để xóa tracking cá nhân)
}

export interface SetCurrentScreenOptions {
  screenName: string; // Tên màn hình hiển thị trong báo cáo GA4
  screenClassOverride?: string;
}

// 2. Interface chính của Plugin
export interface FirebaseAnalyticsPlugin {
  logEvent(options: LogEventOptions): Promise<void>;
  setUserId(options: SetUserIdOptions): Promise<void>;
  setUserProperty(options: SetUserPropertyOptions): Promise<void>;
  setCurrentScreen(options: SetCurrentScreenOptions): Promise<void>;
  resetAnalyticsData(): Promise<void>;
  setAnalyticsCollectionEnabled(options: SetAnalyticsCollectionEnabledOptions): Promise<void>;
}
```

> 💡 **Cơ chế Capacitor Bridge:** Tất cả các method trong Interface này **bắt buộc phải trả về `Promise`**. Khi gọi từ JavaScript, Capacitor sẽ mã hóa tham số thành chuỗi JSON và gửi qua cầu nối (Bridge) tới Native runtime.

---

### Bước 3: Viết Native Code cho Android ([`FirebaseAnalyticsPlugin.kt`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/capacitor-plugin-firebase-analytics/android/src/main/kotlin/com/devblog/plugins/firebaseanalytics/FirebaseAnalyticsPlugin.kt))

Trên Android, Capacitor Plugin là một class kế thừa từ `com.getcapacitor.Plugin`.

#### 1. Khai báo dependency trong `android/build.gradle`:
```groovy
dependencies {
    // Sử dụng Firebase BOM để tự quản lý phiên bản tương thích giữa các thư viện Firebase
    implementation platform('com.google.firebase:firebase-bom:33.7.0')
    implementation 'com.google.firebase:firebase-analytics-ktx'
}
```

#### 2. Chi tiết Code Kotlin và Giải Thích Từng Khối:
```kotlin
package com.devblog.plugins.firebaseanalytics

import android.os.Bundle
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.firebase.analytics.FirebaseAnalytics

// @CapacitorPlugin: Đăng ký tên định danh Plugin với Capacitor Bridge.
// Tên "FirebaseAnalytics" này PHẢI TRÙNG KHỚP với tên đăng ký trong registerPlugin('FirebaseAnalytics') ở TypeScript.
@CapacitorPlugin(name = "FirebaseAnalytics")
class FirebaseAnalyticsPlugin : Plugin() {

    private lateinit var firebaseAnalytics: FirebaseAnalytics

    // load(): Chạy một lần duy nhất khi Plugin được nạp vào bộ nhớ lúc khởi động app
    override fun load() {
        super.load()
        // Khởi tạo instance FirebaseAnalytics với Android Context của ứng dụng
        firebaseAnalytics = FirebaseAnalytics.getInstance(context)
    }

    // @PluginMethod: Đánh dấu hàm này cho phép JavaScript từ Web gọi xuống
    // Mọi hàm phải nhận tham số duy nhất là `call: PluginCall`
    @PluginMethod
    fun logEvent(call: PluginCall) {
        // 1. Đọc dữ liệu từ JavaScript gửi xuống qua call.getString(), call.getObject()...
        val name = call.getString("name")
        if (name.isNullOrEmpty()) {
            call.reject("Event name is required") // ❌ Báo lỗi ngược lại cho Promise phía TypeScript
            return
        }

        val paramsObject = call.getObject("params")
        val bundle = Bundle() // Firebase Android nhận tham số dạng Android Bundle

        // 2. Chuyển đổi từ JSObject (JSON) sang Android Bundle kiểu động
        if (paramsObject != null) {
            val iterator = paramsObject.keys()
            while (iterator.hasNext()) {
                val key = iterator.next()
                val value = paramsObject.opt(key)
                when (value) {
                    is String -> bundle.putString(key, value)
                    is Int -> bundle.putInt(key, value)
                    is Long -> bundle.putLong(key, value)
                    is Double -> bundle.putDouble(key, value)
                    is Boolean -> bundle.putBoolean(key, value)
                    else -> bundle.putString(key, value?.toString() ?: "")
                }
            }
        }

        // 3. Gọi SDK Native Firebase thực tế
        firebaseAnalytics.logEvent(name, bundle)

        // 4. Báo thành công cho Promise phía TypeScript kết thúc
        call.resolve()
    }

    @PluginMethod
    fun setUserId(call: PluginCall) {
        val userId = call.getString("userId")
        firebaseAnalytics.setUserId(userId)
        call.resolve()
    }

    @PluginMethod
    fun setCurrentScreen(call: PluginCall) {
        val screenName = call.getString("screenName")
        if (screenName.isNullOrEmpty()) {
            call.reject("screenName is required")
            return
        }

        val screenClass = call.getString("screenClassOverride") ?: screenName

        // Với GA4 Firebase hiện đại: Event SCREEN_VIEW thay thế cho setCurrentScreen cũ đã deprecated
        val bundle = Bundle().apply {
            putString(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
            putString(FirebaseAnalytics.Param.SCREEN_CLASS, screenClass)
        }
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW, bundle)
        call.resolve()
    }

    @PluginMethod
    fun resetAnalyticsData(call: PluginCall) {
        firebaseAnalytics.resetAnalyticsData()
        call.resolve()
    }

    @PluginMethod
    fun setAnalyticsCollectionEnabled(call: PluginCall) {
        val enabled = call.getBoolean("enabled", true) ?: true
        firebaseAnalytics.setAnalyticsCollectionEnabled(enabled)
        call.resolve()
    }
}
```

---

### Bước 4: Viết Native Code cho iOS ([`FirebaseAnalyticsPlugin.swift`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/capacitor-plugin-firebase-analytics/ios/Sources/FirebaseAnalyticsPlugin/FirebaseAnalyticsPlugin.swift))

Trên iOS, Capacitor Plugin kế thừa từ `CAPPlugin` và `CAPBridgedPlugin` để Objective-C runtime có thể gọi được các hàm Swift.

#### 1. Khai báo dependency trong `CapacitorPluginFirebaseAnalytics.podspec`:
```ruby
Pod::Spec.new do |s|
  # ...
  s.dependency 'Capacitor'
  s.dependency 'FirebaseAnalytics' # CocoaPods sẽ tự tải GoogleAppMeasurement, FirebaseCore...
  s.swift_version = '5.1'
end
```

#### 2. Chi tiết Code Swift và Giải Thích:
```swift
import Foundation
import Capacitor
import FirebaseAnalytics // Import SDK Native Firebase iOS

// @objc(FirebaseAnalyticsPlugin): Cung cấp tên class cho Objective-C Runtime của Capacitor Bridge
@objc(FirebaseAnalyticsPlugin)
public class FirebaseAnalyticsPlugin: CAPPlugin, CAPBridgedPlugin {
    // Định danh duy nhất của plugin trên iOS
    public let identifier = "FirebaseAnalyticsPlugin"
    // Tên JS Name ánh xạ với phía TypeScript
    public let jsName = "FirebaseAnalytics"
    
    // pluginMethods: Bắt buộc khai báo danh sách method để Capacitor iOS đăng ký vào Bridge
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "logEvent", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserId", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setUserProperty", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setCurrentScreen", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "resetAnalyticsData", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setAnalyticsCollectionEnabled", returnType: CAPPluginReturnPromise)
    ]

    // @objc func: Hàm phải có tiền tố @objc để Capacitor gọi qua reflection
    @objc func logEvent(_ call: CAPPluginCall) {
        // Đọc string từ call
        guard let name = call.getString("name"), !name.isEmpty else {
            call.reject("Event name is required")
            return
        }

        // Lấy Dictionary object từ JSON
        let params = call.getObject("params") ?? [:]
        
        // Gọi hàm của Firebase iOS SDK
        Analytics.logEvent(name, parameters: params)
        call.resolve()
    }

    @objc func setUserId(_ call: CAPPluginCall) {
        let userId = call.getString("userId")
        Analytics.setUserID(userId)
        call.resolve()
    }

    @objc func setCurrentScreen(_ call: CAPPluginCall) {
        guard let screenName = call.getString("screenName"), !screenName.isEmpty else {
            call.reject("screenName is required")
            return
        }

        let screenClass = call.getString("screenClassOverride") ?? screenName
        // Chuẩn GA4 cho iOS: Dùng AnalyticsEventScreenView
        Analytics.logEvent(AnalyticsEventScreenView, parameters: [
            AnalyticsParameterScreenName: screenName,
            AnalyticsParameterScreenClass: screenClass
        ])
        call.resolve()
    }

    @objc func resetAnalyticsData(_ call: CAPPluginCall) {
        Analytics.resetAnalyticsData()
        call.resolve()
    }

    @objc func setAnalyticsCollectionEnabled(_ call: CAPPluginCall) {
        let enabled = call.getBool("enabled") ?? true
        Analytics.setAnalyticsCollectionEnabled(enabled)
        call.resolve()
    }
}
```

---

### Bước 5: Viết Web Fallback ([`web.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/capacitor-plugin-firebase-analytics/src/web.ts))

File `web.ts` kế thừa từ `WebPlugin`. Khi ứng dụng chạy trên trình duyệt (hoặc lúc dev bằng `ionic serve` / `ng serve`), Capacitor sẽ tự động trỏ vào class này thay vì gọi Native.

#### Chi tiết Code Web và Giải Thích:
```typescript
import { WebPlugin } from '@capacitor/core';
import type { FirebaseAnalyticsPlugin, LogEventOptions, ... } from './definitions';

export class FirebaseAnalyticsWeb extends WebPlugin implements FirebaseAnalyticsPlugin {
  private collectionEnabled = true;

  async logEvent(options: LogEventOptions): Promise<void> {
    if (!this.collectionEnabled) return;

    // Tự động kiểm tra: Nếu trang web có nhúng Google Tag (gtag.js), tự động bắn event lên GA4 Web
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', options.name, options.params || {});
    }

    // In log ra DevTools Console để developer dễ debug
    console.log(`[FirebaseAnalytics Web] 📊 logEvent:`, options.name, options.params);
  }

  async setUserId(options: SetUserIdOptions): Promise<void> {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('set', { user_id: options.userId });
    }
    console.log(`[FirebaseAnalytics Web] 👤 setUserId:`, options.userId);
  }

  async setCurrentScreen(options: SetCurrentScreenOptions): Promise<void> {
    const win = window as any;
    if (typeof win.gtag === 'function') {
      win.gtag('event', 'screen_view', {
        screen_name: options.screenName,
        screen_class: options.screenClassOverride || options.screenName,
      });
    }
    console.log(`[FirebaseAnalytics Web] 📱 setCurrentScreen:`, options.screenName);
  }

  async resetAnalyticsData(): Promise<void> {
    console.log(`[FirebaseAnalytics Web] 🔄 resetAnalyticsData`);
  }

  async setAnalyticsCollectionEnabled(options: SetAnalyticsCollectionEnabledOptions): Promise<void> {
    this.collectionEnabled = options.enabled;
    console.log(`[FirebaseAnalytics Web] ⚙️ setAnalyticsCollectionEnabled:`, options.enabled);
  }
}
```

---

### Bước 6: Khởi Tạo Entry Point ([`index.ts`](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/capacitor-plugin-firebase-analytics/src/index.ts))

Đây là nơi xuất phát điểm của toàn bộ package:
```typescript
import { registerPlugin } from '@capacitor/core';
import type { FirebaseAnalyticsPlugin } from './definitions';

// registerPlugin():
// - Tham số 1: Tên định danh plugin ("FirebaseAnalytics"), khớp với @CapacitorPlugin(name = "FirebaseAnalytics") trên Android/iOS.
// - Tham số 2: Object cấu hình web fallback: Khi chạy trên Web, nạp lười (lazy-load) class FirebaseAnalyticsWeb.
const FirebaseAnalytics = registerPlugin<FirebaseAnalyticsPlugin>('FirebaseAnalytics', {
  web: () => import('./web').then(m => new m.FirebaseAnalyticsWeb()),
});

export * from './definitions';
export { FirebaseAnalytics };
```

---

## 3. Cách Link (Cài Đặt) Plugin Vào Project Capacitor

Sau khi đã code xong plugin ở thư mục riêng, làm sao để app Capacitor nhận và liên kết được plugin này? Có **3 cách link phổ biến**:

### Cách 1: Dùng Local Path `npm install <đường-dẫn>` (Cách đang dùng trong project)
Đây là cách chuẩn nhất khi phát triển plugin nội bộ mà chưa publish lên npm.

1. **Build plugin trước:**
   ```bash
   cd capacitor-plugin-firebase-analytics
   npm run build
   ```
2. **Cài đặt vào app bằng đường dẫn tương đối:**
   ```bash
   cd ../dev-blog-client
   npm install ../capacitor-plugin-firebase-analytics
   ```
   Lệnh trên sẽ tự động thêm vào `package.json` của app:
   ```json
   "dependencies": {
     "capacitor-plugin-firebase-analytics": "file:../capacitor-plugin-firebase-analytics"
   }
   ```
3. **Đồng bộ Plugin vào Native Android & iOS (Bắt buộc):**
   ```bash
   npx cap sync
   ```
   > 💡 **Cơ chế hoạt động:** Lệnh `npx cap sync` sẽ tự động quét file `package.json` của app, tìm thấy `capacitor-plugin-firebase-analytics` có khai báo Capacitor Plugin:
   > - **Trên Android:** Tự động inject plugin vào `android/app/build.gradle` và `settings.gradle`.
   > - **Trên iOS:** Tự động thêm dòng `pod 'CapacitorPluginFirebaseAnalytics', :path => ...` vào `ios/App/Podfile` và chạy `pod install`.

---

### Cách 2: Dùng `npm link` (Symlink - Thích hợp khi đang vừa code plugin vừa test app)
Nếu bạn không muốn mỗi lần sửa plugin lại phải gõ `npm install`:
1. Tại thư mục plugin:
   ```bash
   cd capacitor-plugin-firebase-analytics
   npm link
   ```
2. Tại thư mục app:
   ```bash
   cd ../dev-blog-client
   npm link capacitor-plugin-firebase-analytics
   npx cap sync
   ```
*Mỗi khi sửa code TS của plugin, chỉ cần chạy `npm run build` ở plugin là app tự nhận code mới mà không cần cài lại.*

---

### Cách 3: Xuất bản lên npm (Khi phát hành chính thức)
1. Đăng nhập npm và publish:
   ```bash
   cd capacitor-plugin-firebase-analytics
   npm publish --access public
   ```
2. App cài đặt như một thư viện thông thường:
   ```bash
   cd ../dev-blog-client
   npm install capacitor-plugin-firebase-analytics
   npx cap sync
   ```

---

## 4. Cách Sử Dụng Trong Dự Án Angular / Ionic

Đã tạo sẵn service [AnalyticsService](file:///Users/congphu2210/Desktop/Phu/dev-blog-client-2.0/dev-blog-client/src/app/core/services/analytics.service.ts). Bạn có thể inject vào bất kỳ Component nào:

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { AnalyticsService } from 'src/app/core/services/analytics.service';

@Component({
  selector: 'app-blog-detail',
  template: `...`
})
export class BlogDetailComponent implements OnInit {
  private analytics = inject(AnalyticsService);

  ngOnInit() {
    // 1. Bắn sự kiện xem trang
    this.analytics.setCurrentScreen('BlogDetailPage');

    // 2. Bắn sự kiện đọc bài viết
    this.analytics.logEvent('read_blog_post', {
      post_id: 123,
      category: 'Angular',
      title: 'Học Capacitor Plugin'
    });
  }

  onUserLogin(user: any) {
    // 3. Gắn User ID và thuộc tính
    this.analytics.setUserId(user.id);
    this.analytics.setUserProperty('user_role', user.role);
  }
}
```

---

## 5. Cách Build & Sync Lại Khi Có Thay Đổi Trong Plugin

Nếu sau này bạn sửa thêm tính năng trong plugin:
1. **Build plugin:**
   ```bash
   cd capacitor-plugin-firebase-analytics
   npm run build
   ```
2. **Sync sang app:**
   ```bash
   cd ../dev-blog-client
   npx cap sync
   ```

