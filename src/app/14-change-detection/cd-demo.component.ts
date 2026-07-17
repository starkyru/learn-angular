import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';

/**
 * Lesson 14 — Change detection
 *
 * Change detection (CD) is Angular syncing the DOM with your state. WHEN it runs:
 *   - Zone.js apps: after any async event (click, timer, XHR) monkey-patched by zone.js.
 *   - Zoneless apps (this workspace): when a SIGNAL read in a template changes, on template
 *     events, on `AsyncPipe` emissions, or an explicit `markForCheck()`.
 *
 * `ChangeDetectionStrategy.OnPush` narrows checks further: a component is checked only when
 * an input reference changes, a template event fires, a signal it reads changes, or it is
 * explicitly marked. It's the performant default posture.
 *
 * This component contrasts a SIGNAL field (auto-tracked) with a PLAIN field (invisible to
 * CD until you `markForCheck()`), so the difference is observable in a test.
 */
@Component({
  selector: 'app-cd-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="signal">signal: {{ sig() }}</p>
    <p class="plain">plain: {{ plain }}</p>
  `,
})
export class CdDemoComponent {
  readonly sig = signal(0);
  plain = 0;

  private readonly cdr = inject(ChangeDetectorRef);

  /** Tracked: the view updates automatically. */
  bumpSignal(): void {
    this.sig.update((n) => n + 1);
  }

  /** Untracked mutation: the value changes but the view stays STALE under OnPush/zoneless. */
  bumpPlainSilently(): void {
    this.plain += 1;
  }

  /** Same mutation, but we tell Angular to re-check this component. */
  bumpPlainAndNotify(): void {
    this.plain += 1;
    this.cdr.markForCheck();
  }
}
