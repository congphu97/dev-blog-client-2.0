import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { NgcAvatarModule } from 'ngc-library';
import { Store } from '@ngrx/store';
import { OAuthService } from '../auth/oauth.service';
import { ThemeService } from '../shared/theme.service';
import { AuthActions, authFeature } from '../store/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonHeader, IonToolbar, IonButtons, NgcAvatarModule, RouterLink, RouterLinkActive],
})
export class HeaderComponent {
  private store = inject(Store);
  public authUser = this.store.selectSignal(authFeature.selectUser);
  public oauthService = inject(OAuthService);
  public themeService = inject(ThemeService);

  public currentUser = computed(() => this.authUser() || this.oauthService.currentUser());

  public onLogout() {
    this.store.dispatch(AuthActions.logout());
    this.oauthService.logout();
  }
}
