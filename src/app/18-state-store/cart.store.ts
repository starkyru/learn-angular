import { Injectable, computed, linkedSignal, resource, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
}

/** Lesson 18 — a small signal store. Keep state, derivations, and mutations together. */
@Injectable({ providedIn: 'root' })
export class CartStore {
  private readonly itemsState = signal<CartItem[]>([]);
  readonly items = this.itemsState.asReadonly();
  readonly total = computed(() => this.items().reduce((sum, item) => sum + item.price, 0));
  readonly selectedId = linkedSignal(() => this.items()[0]?.id ?? null);

  /** A read-only async resource; a new selected id cancels the previous request. */
  readonly selectedDetails = resource<string, number | null>({
    params: () => this.selectedId(),
    loader: async ({ params: id }) => (id === null ? 'No item selected' : `Details for item ${id}`),
  });

  add(item: CartItem): void {
    this.itemsState.update((items) => [...items, item]);
  }

  remove(id: number): void {
    this.itemsState.update((items) => items.filter((item) => item.id !== id));
  }
}
