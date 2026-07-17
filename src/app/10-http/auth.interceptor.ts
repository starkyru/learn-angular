import { HttpInterceptorFn } from '@angular/common/http';

/**
 * A functional interceptor (modern style). It sits in the request pipeline and can clone
 * the request to add headers, log, retry, or handle errors centrally.
 *
 * Register with `provideHttpClient(withInterceptors([authInterceptor]))`.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({ setHeaders: { Authorization: 'Bearer test-token' } });
  return next(authReq);
};
