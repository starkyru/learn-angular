import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * Lesson 01 — Components
 *
 * A component is a TypeScript class with an `@Component` decorator. The decorator
 * turns the class into an element the browser can render.
 *
 * - `selector`  — the custom HTML tag that mounts this component (`<app-hello>`).
 * - `template`  — the view. Inline here to keep the lesson in one file; real apps
 *                 often use `templateUrl` for large templates.
 * - class body  — the component's state and behaviour (the "logic").
 *
 * Modern Angular (v17+) components are *standalone* by default: no NgModule, you
 * just list what a template needs in `imports`. State is held in *signals*.
 */
@Component({
  selector: 'app-hello',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="greeting">{{ greet() }}</p>
    <button type="button" (click)="shout()">Shout</button>
    <p class="volume">Volume: {{ volume() }}</p>
  `,
})
export class HelloComponent {
  /** Reactive state. Read with `name()`, write with `name.set(...)`. */
  readonly name = signal('Angular');
  readonly volume = signal(0);

  /** A plain method the template can call. */
  greet(): string {
    return `Hello, ${this.name()}!`;
  }

  /** Event handlers mutate signals; the view re-renders automatically. */
  shout(): void {
    this.volume.update((v) => v + 1);
  }
}
