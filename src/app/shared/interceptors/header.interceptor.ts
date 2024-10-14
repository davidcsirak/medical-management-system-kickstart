import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationController } from '../../authentication/controllers/authentication.controller';
import { switchMap, tap } from 'rxjs';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authController = inject(AuthenticationController);

  if (req.url.includes('authenticate')) {
    return next(req);
  } else if (req.url.includes('refresh')) {
    return next(
      req.clone({ setHeaders: { Authorization: `Bearer ${authController.getRefreshToken()}` } }),
    );
  }
  return authController.refresh().pipe(
    tap((response) => {
      authController.saveTokens(response.accessToken, response.refreshToken);
    }),
    switchMap(() =>
      next(
        req.clone({ setHeaders: { Authorization: `Bearer ${authController.getSessionToken()}` } }),
      ),
    ),
  );
};
