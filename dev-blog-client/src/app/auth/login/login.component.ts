import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { NgcButtonModule } from 'ngc-library';
import { OAuthService } from '../oauth.service';
import { AuthService } from '../auth.service';
import { AuthActions, authFeature, AuthUser } from '../../store/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonContent, NgcButtonModule],
})
export class LoginComponent {
  private router = inject(Router);
  public oauthService = inject(OAuthService);
  public authService = inject(AuthService);
  private store = inject(Store);

  // Lắng nghe trạng thái user từ NgRx Global Store bằng Signal
  public authUser = this.store.selectSignal(authFeature.selectUser);
  public isAuthenticated = this.store.selectSignal(authFeature.selectIsAuthenticated);
  public isStoreLoading = this.store.selectSignal(authFeature.selectLoading);
  public storeError = this.store.selectSignal(authFeature.selectError);

  public email = signal<string>('phu.cuong@devblog.com');
  public password = signal<string>('Developer@2026');
  public rememberMe = signal<boolean>(true);
  public showPassword = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public loginSuccess = signal<boolean>(false);

  // Danh sách tài khoản mẫu để test OAuth2 Consent Screen
  public testAccounts = [
    {
      name: 'Phú Cường (Admin)',
      email: 'phu.cuong@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PhuCuong',
      role: 'admin' as const,
      badge: '👑 Quản trị viên'
    },
    {
      name: 'Nguyễn Văn Đọc (Reader)',
      email: 'van.doc@gmail.com',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=VanDoc',
      role: 'reader' as const,
      badge: '👤 Độc giả'
    }
  ];
  public selectedAccount = signal(this.testAccounts[0]);
  public showPkceInspectorTab = signal<boolean>(true);

  public togglePasswordVisibility() {
    this.showPassword.update(v => !v);
  }

  public fillDemoAccount(role: 'admin' | 'guest') {
    if (role === 'admin') {
      this.email.set('phu.cuong@devblog.com');
      this.password.set('DevBlog@Admin2026');
    } else {
      this.email.set('guest.reader@devblog.com');
      this.password.set('Guest123456');
    }
    this.errorMessage.set('');
  }

  /**
   * Bắt đầu luồng OAuth2 PKCE
   */
  public onLoginWithOAuth(provider: 'google' | 'github') {
    this.oauthService.startOAuthFlow(provider);
  }

  /**
   * Cấp quyền trên Consent Screen và tiến hành Token Exchange
   */
  public async onAuthorizeOAuth() {
    const selected = this.selectedAccount();
    await this.oauthService.confirmConsentAndExchange(selected);

    // Lưu thông tin account test vào NgRx Global Store
    this.store.dispatch(
      AuthActions.loginSuccess({
        user: {
          id: `usr_${Date.now()}`,
          name: selected.name,
          email: selected.email,
          avatar: selected.avatar,
          role: selected.role,
          provider: this.oauthService.pkceInspector()?.provider || 'google',
          badge: selected.badge,
        },
      })
    );

    this.loginSuccess.set(true);

    setTimeout(() => {
      this.oauthService.closeConsent();
      this.router.navigate(['/blog']);
    }, 1800);
  }

  public onCloseOAuth() {
    this.oauthService.closeConsent();
  }

  public onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.oauthService.logout();
  }

  public onLogin(event: Event) {
    event.preventDefault();
    this.errorMessage.set('');

    const emailVal = this.email().trim();
    const passVal = this.password().trim();

    if (!emailVal) {
      this.errorMessage.set('Vui lòng nhập Email hoặc tên tài khoản!');
      return;
    }
    if (!passVal) {
      this.errorMessage.set('Vui lòng nhập Mật khẩu!');
      return;
    }
    if (passVal.length < 6) {
      this.errorMessage.set('Mật khẩu phải chứa ít nhất 6 ký tự!');
      return;
    }

    // 👉 CHUẨN KIẾN TRÚC NGRX EFFECTS:
    // Component CHỈ dispatch action 'Login', KHÔNG cần gọi service hay subscribe!
    // AuthEffects sẽ:
    // 1. Tự bắt action Login
    // 2. Gọi AuthService.getAccountUser(emailVal)
    // 3. Dispatch 'Login Success' để cập nhật Store
    // 4. Tự động chuyển hướng về /blog sau 1s
    this.store.dispatch(AuthActions.login({ email: emailVal, password: passVal }));
  }
}
