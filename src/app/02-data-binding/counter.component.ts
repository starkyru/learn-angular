import { Component, signal } from '@angular/core';

/**
 * Lesson 02 — Data binding
 *
 * Four flavours, all shown below:
 *   1. Interpolation      {{ value }}            class → text
 *   2. Property binding    [prop]="value"        class → element/DOM property
 *   3. Event binding       (event)="handler()"   DOM  → class
 *   4. Class/style binding [class.x] [style.y]   conditional presentation
 *
 * Two-way binding `[(x)]="v"` is just sugar for `[x]="v" (xChange)="v = $event"`
 * — covered with `model()` in lesson 07.
 */
@Component({
  selector: 'app-counter',
  template: `
    <!-- 1. interpolation -->
    <p class="count">Count: {{ count() }}</p>

    <!-- 3. event binding -->
    <button type="button" (click)="increment()">+1</button>

    <!-- 2. property binding: the button is disabled while count is 0 -->
    <button type="button" (click)="reset()" [disabled]="count() === 0">Reset</button>

    <!-- 4. class + style binding driven by state -->
    <p
      class="status"
      [class.positive]="count() > 0"
      [style.font-weight]="count() > 5 ? 'bold' : 'normal'"
    >
      {{ label() }}
    </p>
  `,
})
export class CounterComponent {
  readonly count = signal(0);

  /** Derived text used by interpolation. */
  label(): string {
    return this.count() === 0 ? 'empty' : `${this.count()} clicks`;
  }

  increment(): void {
    this.count.update((n) => n + 1);
  }

  reset(): void {
    this.count.set(0);
  }
}
