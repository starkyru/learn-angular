import { Directive, ElementRef, inject, input, signal } from '@angular/core';

/**
 * Lesson 04 — Attribute directives
 *
 * A directive attaches behaviour to an existing element WITHOUT its own template.
 * (`@Component` is actually a directive that *also* has a template.)
 *
 * This one highlights its host on hover:
 *   - `input()`      — a bindable property, set as `[appHighlight]="'lime'"`.
 *   - `host: {}`     — declarative host bindings/listeners. `(mouseenter)` / `(mouseleave)`
 *                      call handlers; `[class.highlighted]` reflects a signal to the DOM.
 *   - `inject(ElementRef)` — the host element, for imperative DOM tweaks.
 *
 * Prefer the `host` metadata object over the older `@HostBinding` / `@HostListener`
 * decorators — it is the current recommended style.
 */
@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onEnter()',
    '(mouseleave)': 'onLeave()',
    '[class.highlighted]': 'active()',
    '[attr.data-active]': 'active()',
  },
})
export class HighlightDirective {
  /** The highlight colour; defaults to yellow. Bound as `[appHighlight]="color"`. */
  readonly appHighlight = input('yellow');

  /** Whether the host is currently highlighted (reflected to `.highlighted`). */
  readonly active = signal(false);

  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  onEnter(): void {
    this.active.set(true);
    this.el.nativeElement.style.backgroundColor = this.appHighlight();
  }

  onLeave(): void {
    this.active.set(false);
    this.el.nativeElement.style.backgroundColor = '';
  }
}
