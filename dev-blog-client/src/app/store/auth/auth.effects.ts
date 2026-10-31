import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { exhaustMap, map, catchError, tap, delay } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  /**
   * Effect 1: Bắt action AuthActions.login
   * -> Gọi API từ AuthService (Side Effect)
   * -> Trả về AuthActions.loginSuccess hoặc AuthActions.loginFailure
   */
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(err =>
            of(AuthActions.loginFailure({ error: err?.message || 'Đăng nhập không thành công!' }))
          )
        )
      )
    )
  );

  /**
   * Effect 2: Bắt action AuthActions.loginSuccess
   * -> Delay 1s rồi chuyển hướng sang trang /blog (Side Effect không dispatch thêm action)
   */
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        delay(1000),
        tap(() => {
          this.router.navigate(['/blog']);
        })
      ),
    { dispatch: false }
  );
}

