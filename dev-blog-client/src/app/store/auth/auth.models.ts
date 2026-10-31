import { EntityState } from '@ngrx/entity';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'editor' | 'reader';
  provider?: 'google' | 'github' | 'local';
  badge?: string;
}

export interface AuthState extends EntityState<AuthUser> {
  selectedUserId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
