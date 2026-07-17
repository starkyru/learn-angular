# Lesson 04 — Directives

A directive adds behaviour to an element. Three kinds:

1. **Components** — a directive *with* a template (lessons 01–03).
2. **Attribute directives** — change appearance/behaviour of the host (`appHighlight`,
   `ngClass`, `ngStyle`). This lesson.
3. **Structural directives** — change layout by adding/removing DOM (`*ngIf`; the modern
   replacement is the `@if`/`@for` control flow from lesson 03).

## Concepts

- **`selector: '[appHighlight]'`** — attribute selector, so `<span appHighlight>` matches.
- **`host: { ... }`** — declarative host listeners `'(event)': 'handler()'` and host
  bindings `'[class.x]': 'expr'` / `'[style.y]': 'expr'` / `'[attr.z]': 'expr'`. Preferred
  over the older `@HostListener` / `@HostBinding` decorators.
- **`inject(ElementRef)`** — reference to the host DOM node for imperative work.
- **`input()` on a directive** — same bindable-input API components use.

## Interview Q&A

- **Q: Component vs directive?** A component is a directive that owns a template. Directives
  with no template just augment an existing element.
- **Q: How do you talk to the host element?** `inject(ElementRef)` (or `Renderer2` for
  SSR-safe DOM writes), plus host bindings for declarative reflection.
- **Q: Why prefer `Renderer2` over `ElementRef.nativeElement`?** `Renderer2` abstracts the
  platform (works under server-side rendering / web workers where `nativeElement` may not
  exist). Direct DOM access is fine for browser-only apps and demos.

## Exercises

1. Add a second input `[appHighlight]` default and an alias input for the text colour.
2. Rewrite the DOM writes using `Renderer2.setStyle` and keep the spec green.
3. Add a `[attr.data-active]` host binding reflecting `active()` and assert it.

## Run

```bash
npm test -- 04-directives
```
