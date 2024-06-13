import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guardGuard: CanActivateFn = (route, state) => {
  return inject(AuthService).isAuth() ? true : inject(Router).parseUrl('/');
};
