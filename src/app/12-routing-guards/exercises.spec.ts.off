import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

/**
 * Exercise specs for lesson 12 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 12-routing-guards
 */
describe('Lesson 12 — exercises', () => {
  // Regression guard: the state the guard reads toggles with login/logout.
  it('AuthService reflects login/logout state', () => {
    const auth = TestBed.inject(AuthService);
    expect(auth.isLoggedIn()).toBe(false);
    auth.login();
    expect(auth.isLoggedIn()).toBe(true);
    auth.logout();
    expect(auth.isLoggedIn()).toBe(false);
  });

  it.todo('exercise 1: write a roleGuard factory (role) => CanActivateFn and test both branches');
  it.todo('exercise 2: add a ResolveFn<User> and assert it via runInInjectionContext');
  it.todo('exercise 3: wire two lazy loadComponent routes and a CanMatch that toggles them');
});
