import { Injectable, signal, computed } from '@angular/core';

export interface OAuthUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  provider: 'google' | 'github';
  role: 'admin' | 'editor' | 'reader';
}

export interface OAuthTokens {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  scope: string;
}

export interface PKCEInspectorData {
  step: 'initialized' | 'challenge_created' | 'code_issued' | 'tokens_exchanged';
  provider: 'google' | 'github';
  clientId: string;
  redirectUri: string;
  scope: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
  authorizationCode?: string;
  tokens?: OAuthTokens;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class OAuthService {
  private readonly STORAGE_KEY_USER = 'dev_blog_oauth_user';
  private readonly STORAGE_KEY_TOKENS = 'dev_blog_oauth_tokens';

  public currentUser = signal<OAuthUser | null>(this.getStoredUser());
  public currentTokens = signal<OAuthTokens | null>(this.getStoredTokens());
  public isAuthenticated = computed(() => !!this.currentUser());

  // Trạng thái modal Consent Screen (mô phỏng màn hình chấp thuận của Google / GitHub)
  public isConsentOpen = signal<boolean>(false);
  public isExchanging = signal<boolean>(false);
  public pkceInspector = signal<PKCEInspectorData | null>(null);

  constructor() { }

  /**
   * Sinh chuỗi ngẫu nhiên cryptographic chuẩn PKCE code_verifier (từ 43 đến 128 ký tự)
   */
  public generateCodeVerifier(length = 64): string {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const randomValues = new Uint8Array(length);
    window.crypto.getRandomValues(randomValues);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    return result;
  }

  /**
   * Tính SHA-256 hash và Base64URL encode để tạo code_challenge
   */
  public async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    
    // Chuyển ArrayBuffer thành Base64URL (bỏ padding '=', thay '+' thành '-', '/' thành '_')
    const bytes = new Uint8Array(digest);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  /**
   * Sinh chuỗi ngẫu nhiên state để chống tấn công CSRF
   */
  public generateState(): string {
    const array = new Uint32Array(4);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => dec.toString(16)).join('');
  }

  /**
   * Bước 1: Bắt đầu luồng OAuth2 Authorization Code with PKCE
   */
  public async startOAuthFlow(provider: 'google' | 'github'): Promise<void> {
    const clientId = provider === 'google' 
      ? '83921948123-devblogpkce.apps.googleusercontent.com'
      : 'gh_client_devblog_pkce_2026';
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = provider === 'google' ? 'openid profile email' : 'read:user user:email';
    
    // Sinh PKCE verifier và challenge
    const codeVerifier = this.generateCodeVerifier(64);
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    const state = this.generateState();

    const inspectorData: PKCEInspectorData = {
      step: 'challenge_created',
      provider,
      clientId,
      redirectUri,
      scope,
      state,
      codeVerifier,
      codeChallenge,
      codeChallengeMethod: 'S256',
      timestamp: new Date().toLocaleTimeString('vi-VN')
    };

    this.pkceInspector.set(inspectorData);
    this.isConsentOpen.set(true);
  }

  /**
   * Bước 2 & 3: User xác nhận trên Consent Screen -> Cấp Authorization Code -> Đổi Token
   */
  public async confirmConsentAndExchange(accountChoice: { email: string; name: string; avatar: string; role: 'admin' | 'reader' }): Promise<void> {
    const currentInspector = this.pkceInspector();
    if (!currentInspector) return;

    this.isExchanging.set(true);

    // Mô phỏng Server cấp Authorization Code
    const simulatedAuthCode = `auth_code_${Math.random().toString(36).substring(2, 12)}_${Date.now()}`;
    
    this.pkceInspector.set({
      ...currentInspector,
      step: 'code_issued',
      authorizationCode: simulatedAuthCode,
      timestamp: new Date().toLocaleTimeString('vi-VN')
    });

    // Mô phỏng độ trễ Token Endpoint POST /oauth/token (Exchange code_verifier + code)
    await new Promise(resolve => setTimeout(resolve, 800));

    // Tạo JWT Token chuẩn OIDC mô phỏng
    const tokens = this.createMockJWTTokens(accountChoice, currentInspector);
    const user: OAuthUser = {
      id: `usr_${Math.random().toString(36).substring(2, 8)}`,
      name: accountChoice.name,
      email: accountChoice.email,
      avatar: accountChoice.avatar,
      provider: currentInspector.provider,
      role: accountChoice.role
    };

    // Lưu trữ
    this.currentUser.set(user);
    this.currentTokens.set(tokens);
    localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(user));
    localStorage.setItem(this.STORAGE_KEY_TOKENS, JSON.stringify(tokens));

    this.pkceInspector.set({
      ...currentInspector,
      step: 'tokens_exchanged',
      authorizationCode: simulatedAuthCode,
      tokens,
      timestamp: new Date().toLocaleTimeString('vi-VN')
    });

    this.isExchanging.set(false);
  }

  public closeConsent(): void {
    this.isConsentOpen.set(false);
  }

  public logout(): void {
    this.currentUser.set(null);
    this.currentTokens.set(null);
    this.pkceInspector.set(null);
    localStorage.removeItem(this.STORAGE_KEY_USER);
    localStorage.removeItem(this.STORAGE_KEY_TOKENS);
  }

  /**
   * Tạo JWT Header.Payload.Signature chuẩn OIDC để có thể giải mã và test Interceptor
   */
  private createMockJWTTokens(account: { email: string; name: string; avatar: string; role: string }, pkce: PKCEInspectorData): OAuthTokens {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    
    const now = Math.floor(Date.now() / 1000);
    const payload = btoa(JSON.stringify({
      iss: pkce.provider === 'google' ? 'https://accounts.google.com' : 'https://github.com/login/oauth',
      sub: `oauth2|${account.email}`,
      aud: pkce.clientId,
      email: account.email,
      name: account.name,
      picture: account.avatar,
      role: account.role,
      scope: pkce.scope,
      iat: now,
      exp: now + 3600 // 1 hour
    }));

    const mockSignature = btoa(`sig_${pkce.codeVerifier.substring(0, 16)}`);
    const jwt = `${header}.${payload}.${mockSignature}`;

    return {
      accessToken: jwt,
      idToken: jwt,
      refreshToken: `rt_${Math.random().toString(36).substring(2, 18)}_${now}`,
      tokenType: 'Bearer',
      expiresIn: 3600,
      scope: pkce.scope
    };
  }

  private getStoredUser(): OAuthUser | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  private getStoredTokens(): OAuthTokens | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_TOKENS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
