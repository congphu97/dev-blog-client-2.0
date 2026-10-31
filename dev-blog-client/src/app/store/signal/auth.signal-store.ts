import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  signalStore,
  withState,
  withComputed,
  withMethods,
  withHooks,
  patchState,
} from '@ngrx/signals';
import { withEntities, setAllEntities, upsertEntity, removeEntity } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, of, firstValueFrom } from 'rxjs';
import { exhaustMap, tap, catchError } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthUser } from '../auth/auth.models';

export interface AuthSignalState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialAuthSignalState: AuthSignalState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

/**
 * ============================================================================
 * NGRX SIGNALSTORE (THẾ HỆ MỚI): ZERO BOILERPLATE STATE MANAGEMENT
 * ============================================================================
 * Không cần Action, không cần Reducer, không cần Effect tách rời!
 * Toàn bộ State, Computed, Methods (Async / RxJS), Entity và Hooks nằm gọn trong 1 Store.
 */
export const AuthSignalStore = signalStore(
  { providedIn: 'root' }, // Tự động inject được ở mọi nơi như Global Service Singleton

  // 1. KHAI BÁO STATE
  withState(initialAuthSignalState),

  // 2. TÍCH HỢP QUẢN LÝ DANH SÁCH ENTITY (@ngrx/signals/entities)
  withEntities<AuthUser>(),

  // 3. COMPUTED SIGNALS (Tương đương Selectors trong Global Store nhưng đơn giản hơn rất nhiều)
  withComputed((store) => ({
    // Kiểm tra xem tài khoản hiện tại có quyền Admin không
    isAdmin: computed(() => store.user()?.role === 'admin'),

    // Tên hiển thị đầy đủ kèm huy hiệu
    displayNameWithBadge: computed(() => {
      const u = store.user();
      if (!u) return 'Khách vãng lai';
      return `${u.name} ${u.badge ? `(${u.badge})` : ''}`;
    }),

    // Tổng số lượng tài khoản đã lưu trong bộ nhớ Entity
    totalSavedAccounts: computed(() => store.entities().length),
  })),

  // 4. METHODS (Gộp chung Action + Reducer + Effect vào các hàm trực tiếp)
  withMethods((store, authService = inject(AuthService), router = inject(Router)) => ({
    /**
     * Cách 1: Đăng nhập bằng async / await hiện đại
     * Không cần Action constants hay Effect riêng!
     */
    async login(email: string, password?: string): Promise<boolean> {
      patchState(store, { loading: true, error: null });

      try {
        const user = await firstValueFrom(authService.login(email, password));

        // Cập nhật State & đồng thời lưu vào Entity collection
        patchState(
          store,
          {
            user,
            isAuthenticated: true,
            loading: false,
            error: null,
          },
          upsertEntity(user)
        );

        try {
          localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));
        } catch {}

        setTimeout(() => {
          router.navigate(['/blog']);
        }, 1000);

        return true;
      } catch (err: any) {
        patchState(store, {
          loading: false,
          error: err?.message || 'Đăng nhập không thành công!',
        });
        return false;
      }
    },

    /**
     * Cách 2: Đăng nhập bằng rxMethod (dành cho ai quen dùng RxJS Stream & Operators)
     */
    loginWithRx: rxMethod<{ email: string; password?: string }>(
      pipe(
        tap(() => patchState(store, { loading: true, error: null })),
        exhaustMap(({ email, password }) =>
          authService.login(email, password).pipe(
            tap((user) => {
              patchState(
                store,
                {
                  user,
                  isAuthenticated: true,
                  loading: false,
                  error: null,
                },
                upsertEntity(user)
              );

              try {
                localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));
              } catch {}

              router.navigate(['/blog']);
            }),
            catchError((err) => {
              patchState(store, {
                loading: false,
                error: err?.message || 'Đăng nhập thất bại!',
              });
              return of(null);
            })
          )
        )
      )
    ),

    /**
     * Set account trực tiếp (ví dụ tài khoản test hoặc OAuth consent)
     */
    setAccount(account: AuthUser): void {
      patchState(
        store,
        {
          user: account,
          isAuthenticated: true,
          loading: false,
          error: null,
        },
        upsertEntity(account)
      );

      try {
        localStorage.setItem('dev_blog_auth_user', JSON.stringify(account));
      } catch {}
    },

    /**
     * Xóa một account trong Entity theo ID
     */
    removeAccount(id: string): void {
      patchState(store, removeEntity(id));
    },

    /**
     * Nạp danh sách accounts mẫu vào Entity
     */
    loadDemoAccounts(accounts: AuthUser[]): void {
      patchState(store, setAllEntities(accounts));
    },

    /**
     * Đăng xuất
     */
    logout(): void {
      try {
        localStorage.removeItem('dev_blog_auth_user');
        localStorage.removeItem('dev_blog_oauth_user');
      } catch {}

      patchState(store, {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      });
    },
  })),

  // 5. HOOKS: Vòng đời tự động của Store
  withHooks({
    onInit(store) {
      // Tự động khôi phục user từ localStorage khi ứng dụng khởi chạy
      try {
        const raw =
          localStorage.getItem('dev_blog_auth_user') ||
          localStorage.getItem('dev_blog_oauth_user');
        if (raw) {
          const user: AuthUser = JSON.parse(raw);
          patchState(
            store,
            {
              user,
              isAuthenticated: true,
            },
            upsertEntity(user)
          );
        }
      } catch {}
    },
  })
);

