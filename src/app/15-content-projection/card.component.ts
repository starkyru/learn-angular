import { Component } from '@angular/core';

/**
 * Lesson 15 — Content projection
 *
 * `<ng-content>` renders markup the PARENT passes between the component's tags — like
 * `children` in other frameworks. It lets you build reusable shells (cards, dialogs, layouts).
 *
 *   <ng-content />                 — default slot: everything not matched elsewhere.
 *   <ng-content select="[attr]" /> — named slot: projects nodes matching a CSS selector.
 *   fallback content               — nodes INSIDE <ng-content>…</ng-content> show when the
 *                                    slot receives nothing.
 *
 * Projection differs from `@Input`: inputs pass DATA; projection passes TEMPLATE/markup.
 * Projected content keeps the PARENT's injector and change-detection context.
 */
@Component({
  selector: 'app-card',
  template: `
    <header class="title">
      <ng-content select="[card-title]">Untitled</ng-content>
    </header>
    <section class="body">
      <ng-content />
    </section>
  `,
})
export class CardComponent {}
