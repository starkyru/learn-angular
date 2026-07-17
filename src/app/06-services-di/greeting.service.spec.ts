import { TestBed } from '@angular/core/testing';
import { GREETING_CONFIG, GreetingService } from './greeting.service';

describe('GreetingService', () => {
  it('greets using the default injected config', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.inject(GreetingService);
    expect(service.greet('Ada')).toBe('Hello, Ada!');
  });

  it('honours an overridden config token (DI substitution)', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: GREETING_CONFIG, useValue: { salutation: 'Hi' } }],
    });
    const service = TestBed.inject(GreetingService);
    expect(service.greet('Ada')).toBe('Hi, Ada!');
  });

  it('is a singleton within one injector (same instance, shared state)', () => {
    TestBed.configureTestingModule({});
    const a = TestBed.inject(GreetingService);
    const b = TestBed.inject(GreetingService);
    expect(a).toBe(b);

    a.greet('x');
    b.greet('y');
    expect(a.calls).toBe(2); // shared counter
  });
});
