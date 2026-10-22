import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
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

    // 2. Xử lý Warm Start / Background: Khi App đang mở hoặc chạy nền
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.handleUrl(event.url);
    });
  }

  private handleUrl(url: string) {
    this.zone.run(() => {
      console.log('🔗 Nhận Deep Link URL:', url);
      let targetPath = '';

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
      } else if (url.includes('://')) {
        // Xử lý Custom URL Scheme (devblog://blog/123 hoặc devblog://home)
        const pathAfterScheme = url.split('://')[1] || '';
        targetPath = pathAfterScheme.startsWith('/') ? pathAfterScheme : '/' + pathAfterScheme;
      }

      if (targetPath) {
        console.log('🚀 Điều hướng Angular Router đến:', targetPath);
        this.router.navigateByUrl(targetPath);
      }
    });
  }
}

