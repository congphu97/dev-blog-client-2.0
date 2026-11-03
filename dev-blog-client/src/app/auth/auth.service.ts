import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../store/auth';

interface LoginApiResponse {
  success: boolean;
  message?: string;
  user?: AuthUser;
  token?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  // Mock data tài khoản quản trị viên Phú Cường
  public testAcount: AuthUser = {
    id: 'usr_congphu2210',
    name: 'Trần Công Phú (Admin)',
    email: 'congphu2210@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=congphu2210',
    role: 'admin',
    badge: '👑 Quản trị viên',
    provider: 'local',
  };

  /**
   * Đăng nhập: Hardcode congphu2210 / Phu9844136
   */
  login(email: string, password?: string): Observable<AuthUser> {
    const trimmedEmail = (email || '').trim();
    const trimmedPass = (password || '').trim();

    // Kiểm tra đăng nhập với tài khoản hardcode
    if (
      (trimmedEmail === 'congphu2210' || trimmedEmail.toLowerCase() === 'congphu2210@gmail.com') &&
      trimmedPass === 'Phu9844136'
    ) {
      const user: AuthUser = {
        ...this.testAcount,
        email: trimmedEmail.includes('@') ? trimmedEmail : 'congphu2210@gmail.com',
      };
      localStorage.setItem('dev_blog_token', 'mock_jwt_token_congphu2210');
      return of(user);
    }

    // Nếu thông tin không chính xác
    return throwError(
      () => new Error('Tài khoản hoặc mật khẩu không chính xác!')
    );
  }

  /**
   * Lấy thông tin user hiện tại
   */
  getAccountUser(email?: string): Observable<AuthUser> {
    return of(this.getFallbackAccount(email));
  }

  private getFallbackAccount(email?: string): AuthUser {
    if (email && email.includes('guest')) {
      return {
        id: 'usr_guest_02',
        name: 'Khách (Reader)',
        email: 'guest.reader@devblog.com',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=VanDoc',
        role: 'reader',
        badge: '👤 Độc giả',
        provider: 'local',
      };
    }
    return {
      ...this.testAcount,
      email: email || this.testAcount.email,
    };
  }
}
