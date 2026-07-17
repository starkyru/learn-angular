import { ChangeDetectionStrategy, Component, computed, input, model, output } from '@angular/core';

/**
 * Lesson 07 — Component I/O: inputs, outputs, two-way
 *
 * Parent → child data uses INPUTS; child → parent events use OUTPUTS. Modern Angular
 * uses signal-based functions instead of the `@Input()`/`@Output()` decorators:
 *
 *   input<T>()          → parent binds `[label]="..."`; read as a signal `label()`
 *   input.required<T>() → same, but the compiler enforces it is bound
 *   output<T>()         → parent listens `(changed)="..."`; fire with `.emit(v)`
 *   model<T>()          → TWO-WAY: `[(stars)]="parentSignal"` (an input + `xChange` output)
 */
@Component({
  selector: 'app-rating',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="label">{{ label() }}: {{ stars() }}/{{ max() }}</span>
    <button type="button" class="up" (click)="up()">▲</button>
    <button type="button" class="down" (click)="down()">▼</button>
  `,
})
export class RatingComponent {
  /** Required input — parent MUST bind `[label]` (compile-time enforced). */
  readonly label = input.required<string>();

  /** Optional input with a default. */
  readonly max = input(5);

  /** Two-way state: `[(stars)]="value"`. Writing it emits `starsChange`. */
  readonly stars = model(0);

  /** Plain event output. */
  readonly changed = output<number>();

  /** Derived value — recomputes only when its signals change. */
  readonly full = computed(() => this.stars() === this.max());

  up(): void {
    if (this.stars() < this.max()) {
      this.stars.update((s) => s + 1);
      this.changed.emit(this.stars());
    }
  }

  down(): void {
    if (this.stars() > 0) {
      this.stars.update((s) => s - 1);
      this.changed.emit(this.stars());
    }
  }
}
