import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AuthUser } from './auth.models';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ email: string; password?: string }>(),
    loginSuccess: props<{ user: AuthUser }>(),
    loginFailure: props<{ error: string }>(),
    setTestAccount: props<{ account: AuthUser }>(),
    loadAccountsSuccess: props<{ accounts: AuthUser[] }>(),
    removeAccount: props<{ id: string }>(),
    logout: emptyProps(),
  },
});
