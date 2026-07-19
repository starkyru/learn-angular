import { Component, InjectionToken, inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { GREETING_CONFIG, GreetingService, type GreetingConfig } from './greeting.service';

/**
 * Exercise specs for lesson 06 — one `it` per README exercise.
 * These teach DI wiring patterns; they pass once written correctly (regression guards).
 * Run only these:  npm run test:exercises -- 06-services-di
 */
@Component({ providers: [GreetingService], template: '' })
class ScopedHost {
  readonly svc = inject(GreetingService);
}

describe('Lesson 06 — exercises', () => {
  // Regression guard: the singleton formats with its config and counts calls.
  it('greet formats with the config salutation and counts calls', () => {
    const service = TestBed.inject(GreetingService);
    expect(service.greet('Ada')).toBe('Hello, Ada!');
    expect(service.greet('Grace')).toBe('Hello, Grace!');
    expect(service.calls).toBe(2);
  });

  // Exercise 1: component-level providers create independent instances.
  it('exercise 1: component-scoped providers give each component its own counter', () => {
    const a = TestBed.createComponent(ScopedHost).componentInstance;
    const b = TestBed.createComponent(ScopedHost).componentInstance;
    a.svc.greet('x');
    a.svc.greet('y');
    b.svc.greet('z');
    expect(a.svc.calls).toBe(2);
    expect(b.svc.calls).toBe(1); // separate instance, separate count
  });

  // Exercise 2: swap the service for a fake via useClass.
  it('exercise 2: useClass substitutes a fake greeting', () => {
    class FakeGreeting {
      greet(name: string): string {
        return `Yo ${name}`;
      }
      get calls(): number {
        return 0;
      }
    }
    TestBed.configureTestingModule({
      providers: [{ provide: GreetingService, useClass: FakeGreeting }],
    });
    expect(TestBed.inject(GreetingService).greet('Ada')).toBe('Yo Ada');
  });

  // Exercise 3: useFactory + deps builds GREETING_CONFIG from another token.
  it('exercise 3: useFactory assembles config from an injected token', () => {
    const SALUTATION = new InjectionToken<string>('SALUTATION');
    TestBed.configureTestingModule({
      providers: [
        { provide: SALUTATION, useValue: 'Hi' },
        {
          provide: GREETING_CONFIG,
          useFactory: (s: string): GreetingConfig => ({ salutation: s }),
          deps: [SALUTATION],
        },
      ],
    });
    expect(TestBed.inject(GreetingService).greet('Ada')).toBe('Hi, Ada!');
  });
});
