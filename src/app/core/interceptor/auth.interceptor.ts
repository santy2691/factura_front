import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  let req: HttpRequest<unknown> = request;
  let token = inject(AuthService).getToken() ? inject(AuthService).getToken(): null;
  if (token) {
   req = request.clone({
      setHeaders :  {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
  return next(req).pipe(catchError((error)=>{
    return throwError(()=>error)
  }));
};
