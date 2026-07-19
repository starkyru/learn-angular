import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';

/**
 * Exercise specs for lesson 08 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 08-signals
 */
describe('Lesson 08 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CartComponent] });
  });

  // Regression guard: the derived signals stay correct.
  it('total and count derive from prices; pricey flips past 100', () => {
    const cart = TestBed.createComponent(CartComponent).componentInstance;
    cart.add(40);
    cart.add(80);
    expect(cart.count()).toBe(2);
    expect(cart.total()).toBe(120);
    expect(cart.pricey()).toBe(true);
  });

  // Exercise 1: discounted = computed(() => total() * 0.9).
  it('exercise 1: discounted is 90% of total', () => {
    const cart = TestBed.createComponent(CartComponent).componentInstance as CartComponent & {
      discounted: () => number;
    };
    cart.add(100);
    expect(cart.discounted()).toBe(90); // add a `discounted` computed to make this pass
  });

  it.todo('exercise 2: use linkedSignal for a "selected price" that defaults to the last added');
  it.todo('exercise 3: replace the effect-based history with toSignal(toObservable(total))');
});
