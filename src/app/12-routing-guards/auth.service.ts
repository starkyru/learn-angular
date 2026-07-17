import { Injectable, signal } from '@angular/core';

/** Minimal auth state used by the route guard. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly loggedIn = signal(false);

  readonly isLoggedIn = this.loggedIn.asReadonly();

  login(): void {
    this.loggedIn.set(true);
  }

  logout(): void {
    this.loggedIn.set(false);
  }
}
