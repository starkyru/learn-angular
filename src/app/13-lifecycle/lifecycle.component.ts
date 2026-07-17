import {
  Component,
  DestroyRef,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Lesson 13 — Lifecycle hooks
 *
 * Angular calls hook methods at defined moments of a component's life. The order that
 * matters most in interviews:
 *
 *   constructor  → ngOnChanges (if it has bound inputs) → ngOnInit → … → ngOnDestroy
 *
 *   ngOnChanges — runs before ngOnInit and on every bound-input change (gets SimpleChanges).
 *                 Only fires when a PARENT binds inputs.
 *   ngOnInit    — once, after the first ngOnChanges. Put initialization here, not in the
 *                 constructor (inputs aren't set yet in the constructor).
 *   ngOnDestroy — cleanup (unsubscribe, clear timers).
 *   DestroyRef  — `inject(DestroyRef).onDestroy(fn)` registers cleanup without implementing
 *                 the interface; also powers `takeUntilDestroyed()`.
 *
 * This component records each event so tests can assert ordering.
 */
@Component({
  selector: 'app-lifecycle',
  template: `<p class="log">{{ log().join(',') }}</p>`,
})
export class LifecycleComponent implements OnChanges, OnInit, OnDestroy {
  readonly value = input(0);
  readonly log = signal<string[]>([]);

  constructor() {
    this.record('construct');
    inject(DestroyRef).onDestroy(() => this.record('destroyRef'));
  }

  ngOnChanges(_changes: SimpleChanges): void {
    this.record('ngOnChanges');
  }

  ngOnInit(): void {
    this.record('ngOnInit');
  }

  ngOnDestroy(): void {
    this.record('ngOnDestroy');
  }

  private record(event: string): void {
    this.log.update((l) => [...l, event]);
  }
}
