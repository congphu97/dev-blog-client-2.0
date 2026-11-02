import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  // Mặc định khởi tạo FALSE để tuyệt đối không bao giờ mở trên Mobile khi mới load trang
  public isOpen = signal<boolean>(false);

  constructor() {
    this.checkInitialScreen();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => {
        // Khi resize về màn hình mobile (<= 768px), tự động đóng sidebar lại
        if (window.innerWidth <= 768) {
          this.isOpen.set(false);
        }
      });
    }
  }

  private checkInitialScreen() {
    if (typeof window !== 'undefined') {
      // Chỉ mở trên Desktop (> 768px), trên Mobile (<= 768px) luôn luôn đóng
      const isDesktop = window.innerWidth > 768;
      this.isOpen.set(isDesktop);
    }
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  close() {
    this.isOpen.set(false);
  }

  open() {
    this.isOpen.set(true);
  }
}
