import { TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

/**
 * Exercise specs for lesson 07 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 07-inputs-outputs
 */
describe('Lesson 07 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [RatingComponent] });
  });

  // Exercise 1: readonly disabled = input(false) disables both buttons when set.
  it('exercise 1: disabled input disables the up/down buttons', async () => {
    const fixture = TestBed.createComponent(RatingComponent);
    fixture.componentRef.setInput('label', 'Stars');
    fixture.componentRef.setInput('disabled', true); // throws until you add the input
    await fixture.whenStable();
    const buttons = fixture.nativeElement.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
    expect(buttons.length).toBe(2);
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].disabled).toBe(true);
  });

  // Exercise 2: output `maxed` fires only when stars reaches max.
  it('exercise 2: maxed emits when stars hits max', () => {
    const fixture = TestBed.createComponent(RatingComponent);
    fixture.componentRef.setInput('label', 'Stars');
    fixture.componentRef.setInput('max', 2);
    const rating = fixture.componentInstance as RatingComponent & {
      maxed: { subscribe(fn: (v: unknown) => void): { unsubscribe(): void } };
    };
    let fires = 0;
    rating.maxed.subscribe(() => fires++); // throws until you add the output
    rating.up(); // 1 — below max, must NOT fire
    expect(fires).toBe(0);
    rating.up(); // 2 === max — fires exactly once
    expect(fires).toBe(1);
  });

  // Exercise 3: convert label/max to legacy @Input() decorators and compare usage.
  it.todo('exercise 3: rewrite label/max as @Input() decorators and note what changes');
});
