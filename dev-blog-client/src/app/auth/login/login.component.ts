import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, FormsModule, RouterLink, IonContent, HeaderComponent],
})
export class LoginComponent {
  private router = inject(Router);

  public email = signal<string>('phu.cuong@devblog.com');
  public password = signal<string>('Developer@2026');
  public rememberMe = signal<boolean>(true);
  public showPassword = signal<boolean>(false);
  public isLoading = signal<boolean>(false);
  public errorMessage = signal<string>('');
  public loginSuccess = signal<boolean>(false);

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

    this.isLoading.set(true);

    // Giả lập xác thực (Authentication)
    setTimeout(() => {
      this.isLoading.set(false);
      this.loginSuccess.set(true);

      // Chuyển hướng về trang Blog sau 1.2s
      setTimeout(() => {
        this.router.navigate(['/blog']);
      }, 1200);
    }, 900);
  }
}
