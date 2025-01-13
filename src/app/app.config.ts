import { TuiRootModule } from "@taiga-ui/core";
import { APP_ID, ApplicationConfig, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from "./core/services/auth.service";

/**
 * funcion inicial de la app
 */
function initializeAppFactory(): void {

  // se valida que el token no ha expirado 
  const helper = new JwtHelperService();
  let token = localStorage.getItem('token');
  if (helper.isTokenExpired(token)) {
    inject(AuthService).logout();
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([
        authInterceptor
    ])),
    provideAnimations(),
    importProvidersFrom(TuiRootModule),
    {
        provide: APP_ID,
        useFactory: initializeAppFactory,
        multi: false,
    },
    provideAnimations(),
],
};


