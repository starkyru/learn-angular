import { TestBed } from '@angular/core/testing';
import { CartStore } from './cart.store';

/**
 * Exercise specs for lesson 18 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 18-state-store
 */
describe('Lesson 18 — exercises', () => {
  // Regression guard: total sums prices, selection defaults to the first item.
  it('total sums prices and selectedId defaults to the first item', () => {
    const store = TestBed.inject(CartStore);
    store.add({ id: 1, name: 'Book', price: 12 });
    store.add({ id: 2, name: 'Pen', price: 3 });
    expect(store.total()).toBe(15);
    expect(store.selectedId()).toBe(1);
  });

  // Regression guard: removing the selected item relinks selection to the first remaining.
  it('removing the selected item relinks selection to the first remaining', () => {
    const store = TestBed.inject(CartStore);
    store.add({ id: 1, name: 'Book', price: 12 });
    store.add({ id: 2, name: 'Pen', price: 3 });
    store.selectedId.set(2);
    store.remove(2);
    expect(store.selectedId()).toBe(1);
  });

  // Exercise 1: quantity-aware total (price * quantity).
  it('exercise 1: total accounts for item quantity', () => {
    const store = TestBed.inject(CartStore);
    // `quantity` isn't on CartItem yet — add it to the interface and multiply it in `total`.
    store.add({ id: 1, name: 'Book', price: 10, quantity: 2 } as unknown as Parameters<CartStore['add']>[0]);
    expect(store.total()).toBe(20);
  });

  it.todo('exercise 2: render selectedDetails.status() with loading/error UI in a component');
  it.todo('exercise 3: replace the mock loader with a typed HttpClient request');
});
