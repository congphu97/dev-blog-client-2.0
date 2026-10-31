import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError, map } from 'rxjs';
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

  // Mock data tài khoản dự phòng nếu server offline
  public testAcount: AuthUser = {
    id: 'usr_admin_01',
    name: 'Phú Cường (Admin)',
    email: 'phu.cuong@gmail.com',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=PhuCuong',
    role: 'admin',
    badge: '👑 Quản trị viên',
    provider: 'local',
  };

  /**
   * Gọi API POST http://localhost:3000/api/auth/login
   */
  login(email: string, password?: string): Observable<AuthUser> {
    return this.http.post<LoginApiResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(res => {
        if (res.success && res.user) {
          console.log('✅ Đăng nhập thành công từ server :3000:', res.user);
          if (res.token) {
            localStorage.setItem('dev_blog_token', res.token);
          }
          return res.user;
        }
        throw new Error('Dữ liệu trả về không hợp lệ');
      }),
      catchError(err => {
        console.warn('⚠️ Lỗi kết nối server :3000, sử dụng tài khoản mẫu nội bộ:', err);
        return of(this.getFallbackAccount(email));
      })
    );
  }

  /**
   * Gọi API GET http://localhost:3000/api/auth/account
   */
  getAccountUser(email?: string): Observable<AuthUser> {
    const url = `${this.apiUrl}/account${email ? `?email=${encodeURIComponent(email)}` : ''}`;
    return this.http.get<{ success: boolean; user?: AuthUser }>(url).pipe(
      map(res => res.user || this.getFallbackAccount(email)),
      catchError(() => of(this.getFallbackAccount(email)))
    );
  }

  private getFallbackAccount(email?: string): AuthUser {
    if (email && email.includes('guest')) {
      return {
        id: 'usr_guest_02',
        name: 'Nguyễn Văn Đọc (Reader)',
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
