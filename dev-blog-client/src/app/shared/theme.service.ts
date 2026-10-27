import { Injectable, signal, computed, effect } from '@angular/core';

export type AppTheme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'dev_blog_theme';

  // State Signal quản lý theme hiện tại
  public currentTheme = signal<AppTheme>(this.getInitialTheme());

  // Computed Signal kiểm tra có đang là Dark Mode không
  public isDark = computed(() => this.currentTheme() === 'dark');

  constructor() {
    // Tự động áp dụng class lên document.documentElement mỗi khi Signal thay đổi
    effect(() => {
      const theme = this.currentTheme();
      this.applyTheme(theme);
    });
  }

  private getInitialTheme(): AppTheme {
    const saved = localStorage.getItem(this.THEME_KEY) as AppTheme | null;
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    // Mặc định ban đầu chọn Dark Mode (phù hợp với thiết kế hiện đại)
    return 'dark';
  }

  public toggleTheme(): void {
    const nextTheme: AppTheme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  public setTheme(theme: AppTheme): void {
    this.currentTheme.set(theme);
    try {
      localStorage.setItem(this.THEME_KEY, theme);
    } catch {
      // Bỏ qua lỗi nếu local storage bị chặn
    }
  }

  private applyTheme(theme: AppTheme): void {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark', 'ion-palette-dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark', 'ion-palette-dark');
      root.setAttribute('data-theme', 'light');
      root.style.colorScheme = 'light';
    }
  }
}
