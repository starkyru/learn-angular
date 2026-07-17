import { Injectable, InjectionToken, inject } from '@angular/core';

/**
 * Lesson 06 — Services & Dependency Injection
 *
 * A service is a plain injectable class for logic/state shared across components.
 * `@Injectable({ providedIn: 'root' })` registers it as an app-wide **singleton** in the
 * root injector (and makes it tree-shakable — dropped from the bundle if never used).
 *
 * DI resolves dependencies by TOKEN. A class is its own token; for values/config you make
 * an `InjectionToken`. Consume dependencies with the `inject()` function.
 */

export interface GreetingConfig {
  salutation: string;
}

/** A token for injectable *config*. The `factory` is the default provider. */
export const GREETING_CONFIG = new InjectionToken<GreetingConfig>('GREETING_CONFIG', {
  providedIn: 'root',
  factory: () => ({ salutation: 'Hello' }),
});

@Injectable({ providedIn: 'root' })
export class GreetingService {
  private readonly config = inject(GREETING_CONFIG);
  private count = 0;

  greet(name: string): string {
    this.count++;
    return `${this.config.salutation}, ${name}!`;
  }

  /** How many times greet() ran — proves singleton state persists. */
  get calls(): number {
    return this.count;
  }
}
