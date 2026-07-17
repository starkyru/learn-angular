import { TestBed } from '@angular/core/testing';
import { CartStore } from './cart.store';

describe('CartStore', () => {
  it('derives totals and resets linked selection when the item source changes', async () => {
    const store = TestBed.inject(CartStore);
    store.add({ id: 1, name: 'Book', price: 12 });
    store.add({ id: 2, name: 'Pen', price: 3 });
    expect(store.total()).toBe(15);
    expect(store.selectedId()).toBe(1);

    store.selectedId.set(2);
    store.remove(2);
    expect(store.selectedId()).toBe(1);
    expect(store.selectedDetails.status()).toBeDefined();
  });
});
