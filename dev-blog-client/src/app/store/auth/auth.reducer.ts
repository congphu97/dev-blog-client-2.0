import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthState, AuthUser } from './auth.models';
import { AuthActions } from './auth.actions';

// 1. Tạo Entity Adapter cho AuthUser
export const authAdapter: EntityAdapter<AuthUser> = createEntityAdapter<AuthUser>({
  selectId: (user: AuthUser) => user.id,
  sortComparer: false,
});

const getInitialUser = (): AuthUser | null => {
  try {
    const raw = localStorage.getItem('dev_blog_auth_user') || localStorage.getItem('dev_blog_oauth_user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const initialUser = getInitialUser();

// 2. Khởi tạo State ban đầu thông qua authAdapter.getInitialState()
export const initialAuthState: AuthState = authAdapter.getInitialState({
  selectedUserId: initialUser ? initialUser.id : null,
  isAuthenticated: !!initialUser,
  loading: false,
  error: null,
  ...(initialUser
    ? {
        ids: [initialUser.id],
        entities: { [initialUser.id]: initialUser },
      }
    : { ids: [], entities: {} }),
});

// Selector helper của Adapter
const { selectAll, selectTotal } = authAdapter.getSelectors();

// 3. Khai báo Feature với Reducer và extraSelectors
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialAuthState,
    on(AuthActions.login, state => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(AuthActions.loginFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    // Lưu user vào Entity State bằng adapter.upsertOne (thêm mới hoặc cập nhật O(1))
    on(AuthActions.loginSuccess, (state, { user }) => {
      try {
        localStorage.setItem('dev_blog_auth_user', JSON.stringify(user));
      } catch {}

      return authAdapter.upsertOne(user, {
        ...state,
        selectedUserId: user.id,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    }),
    on(AuthActions.setTestAccount, (state, { account }) => {
      try {
        localStorage.setItem('dev_blog_auth_user', JSON.stringify(account));
      } catch {}

      return authAdapter.upsertOne(account, {
        ...state,
        selectedUserId: account.id,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
    }),
    // Nạp nhiều account cùng lúc (Entity CRUD: setAll)
    on(AuthActions.loadAccountsSuccess, (state, { accounts }) =>
      authAdapter.setAll(accounts, state)
    ),
    // Xóa một account theo ID (Entity CRUD: removeOne)
    on(AuthActions.removeAccount, (state, { id }) =>
      authAdapter.removeOne(id, state)
    ),
    on(AuthActions.logout, state => {
      try {
        localStorage.removeItem('dev_blog_auth_user');
        localStorage.removeItem('dev_blog_oauth_user');
      } catch {}

      return {
        ...state,
        selectedUserId: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    })
  ),
  extraSelectors: ({ selectAuthState, selectEntities: selectFeatureEntities, selectSelectedUserId }) => ({
    // Lấy user đang đăng nhập hiện tại theo selectedUserId từ Entities (truy xuất O(1))
    selectUser: createSelector(
      selectFeatureEntities,
      selectSelectedUserId,
      (entities, selectedUserId) => (selectedUserId ? entities[selectedUserId] ?? null : null)
    ),
    // Lấy danh sách tất cả các user đã lưu trong entity
    selectAllUsers: createSelector(
      selectAuthState,
      selectAll
    ),
    // Lấy tổng số user
    selectTotalUsers: createSelector(
      selectAuthState,
      selectTotal
    ),
  }),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectAuthState,
  selectUser,
  selectAllUsers,
  selectTotalUsers,
  selectEntities: selectAuthEntities,
  selectIds: selectAuthIds,
  selectIsAuthenticated,
  selectLoading,
  selectError,
  selectSelectedUserId,
} = authFeature;
