import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthService } from '../core/auth/auth-service';
import { authReducer } from '../core/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ auth: authReducer }),
    provideEffects(),
    provideAnimations(),
    provideToastr(),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (authService: AuthService) => () => authService.loadAuthFromStorage(),
      deps: [AuthService]
    }
  ]
};
