import { isDevMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { I18nTranslateModule } from 'ngc-library';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { authFeature, AuthEffects } from './app/store/auth';

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideHttpClient(withFetch()),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideStore({
      [authFeature.name]: authFeature.reducer,
    }),
    provideEffects(AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(I18nTranslateModule)
  ],
});

