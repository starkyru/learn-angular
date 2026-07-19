import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

/**
 * Exercise specs for lesson 02 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 02-data-binding
 */
describe('Lesson 02 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CounterComponent] });
  });

  // Exercise 1: [style.color] turns the status red when count > 10.
  it('exercise 1: status text goes red past 10', async () => {
    const fixture = TestBed.createComponent(CounterComponent);
    for (let i = 0; i < 11; i++) fixture.componentInstance.increment(); // count = 11
    await fixture.whenStable();
    const status = fixture.nativeElement.querySelector('.status') as HTMLElement;
    expect(status.style.color).toBe('red');
  });

  // Exercise 2: [attr.aria-live]="'polite'" on .count.
  it('exercise 2: .count announces politely via aria-live', async () => {
    const fixture = TestBed.createComponent(CounterComponent);
    await fixture.whenStable();
    const count = fixture.nativeElement.querySelector('.count') as HTMLElement;
    expect(count.getAttribute('aria-live')).toBe('polite');
  });

  // Exercise 3: double() button using count.update(n => n * 2).
  it('exercise 3: double() doubles the count', () => {
    const counter = TestBed.createComponent(CounterComponent).componentInstance as CounterComponent & {
      double(): void;
    };
    counter.increment();
    counter.increment(); // count = 2
    counter.double(); // -> 4  (throws until you add double())
    expect(counter.count()).toBe(4);
  });
});
