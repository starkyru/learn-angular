import { TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';

/**
 * Exercise specs for lesson 01 — one `it` per README exercise.
 *
 * These are the TDD driver for the exercises: a spec is RED until you implement the
 * exercise and GREEN once you finish. `it.todo` marks open-ended exercises with no single
 * correct assertion. Run only these:  npm run test:exercises -- 01-components
 */
describe('Lesson 01 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HelloComponent] });
  });

  // Exercise 1: reset() sets volume back to 0.
  it('exercise 1: reset() returns volume to 0', () => {
    const hello = TestBed.createComponent(HelloComponent).componentInstance as HelloComponent & {
      reset(): void;
    };
    hello.shout();
    hello.shout();
    expect(hello.volume()).toBe(2); // sanity: shout incremented first
    hello.reset(); // throws until you add reset()
    expect(hello.volume()).toBe(0);
  });

  // Exercise 2: whisper() decrements but never drops below 0.
  it('exercise 2: whisper() never drops below 0', () => {
    const hello = TestBed.createComponent(HelloComponent).componentInstance as HelloComponent & {
      whisper(): void;
    };
    hello.whisper(); // from 0 — must clamp at 0, not go to -1 (throws until you add whisper())
    expect(hello.volume()).toBe(0);
  });

  // Exercise 3: changing `name` updates both greet() and the rendered `.greeting`.
  it('exercise 3: greet() and .greeting react to a name change', async () => {
    const fixture = TestBed.createComponent(HelloComponent);
    fixture.componentInstance.name.set('Grace');
    await fixture.whenStable();
    expect(fixture.componentInstance.greet()).toBe('Hello, Grace!');
    const greeting = fixture.nativeElement.querySelector('.greeting') as HTMLElement;
    expect(greeting.textContent?.trim()).toBe('Hello, Grace!');
  });
});
