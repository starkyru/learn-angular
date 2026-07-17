import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';

/**
 * Lesson 08 — Signals: `signal` / `computed` / `effect`
 *
 * Signals are Angular's reactive primitive (v16+), the foundation of zoneless change
 * detection.
 *
 *   signal(v)    — writable state. Read `s()`, write `s.set(v)` / `s.update(fn)`.
 *   computed(fn) — DERIVED, read-only, memoised. Recomputes lazily only when a signal it
 *                  read has changed. Never write to it.
 *   effect(fn)   — a SIDE EFFECT that re-runs when its tracked signals change (logging,
 *                  syncing to storage). Runs in an injection context; auto-cleaned up.
 *
 * Tracking is automatic: a computed/effect depends on exactly the signals it *reads* while
 * running — no dependency arrays.
 */
@Component({
  selector: 'app-cart',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="count">Items: {{ count() }}</p>
    <p class="total">Total: {{ total() }}</p>
    <p class="pricey">{{ pricey() ? 'pricey' : 'ok' }}</p>
  `,
})
export class CartComponent {
  /** Source of truth. */
  readonly prices = signal<number[]>([]);

  /** Derived, memoised. */
  readonly count = computed(() => this.prices().length);
  readonly total = computed(() => this.prices().reduce((sum, p) => sum + p, 0));
  readonly pricey = computed(() => this.total() > 100);

  /**
   * Teaching hook: records `total` at each change-detection flush.
   * NOTE: effects COALESCE — several synchronous writes before the next flush
   * produce ONE run with the latest value, so intermediate values are dropped
   * (e.g. two synchronous `add()`s record only the final total, not both).
   */
  readonly totalHistory: number[] = [];

  constructor() {
    // Runs once initially, then once per flush in which a signal it reads changed.
    effect(() => {
      this.totalHistory.push(this.total());
    });
  }

  add(price: number): void {
    // Return a NEW array — signals compare by reference, so in-place mutation
    // (this.prices().push(...)) would not notify dependents.
    this.prices.update((list) => [...list, price]);
  }

  clear(): void {
    this.prices.set([]);
  }
}
