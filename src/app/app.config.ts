import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { AuthService } from '../core/auth/auth-service';
import { authReducer } from '../core/auth/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

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
    },
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
