import { Component, inject, signal } from '@angular/core';

/** A collaborator we can spy on in tests. */
export class NotifierService {
  notify(_message: string): void {
    /* real impl would toast/log; irrelevant to the unit under test */
  }
}

/**
 * Lesson 16 — Testing patterns
 *
 * A component with (a) a timer, so we exercise fake timers, and (b) an injected dependency,
 * so we exercise DI substitution + spies.
 */
@Component({
  selector: 'app-delayed',
  template: `
    <button type="button" (click)="schedule()">go</button>
    <p class="status">{{ status() }}</p>
  `,
})
export class DelayedComponent {
  private readonly notifier = inject(NotifierService);
  readonly status = signal('idle');

  schedule(): void {
    this.status.set('pending');
    setTimeout(() => {
      this.status.set('done');
      this.notifier.notify('done');
    }, 1000);
  }
}
