import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/**
 * Lesson 12 — Routing & guards
 *
 * A guard decides whether navigation may proceed. Modern guards are plain FUNCTIONS
 * (`CanActivateFn`), so they use `inject()` and are easy to test in isolation.
 *
 * Return `true` to allow, `false` to block, or a `UrlTree` (e.g. `router.parseUrl('/login')`)
 * to REDIRECT. Guards can also return an `Observable`/`Promise` of those.
 */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoggedIn() ? true : router.parseUrl('/login');
};
