# Lesson 02 — Data binding

How class state and the DOM stay in sync. Direction is the key mental model.

## Concepts

| Syntax | Name | Direction |
| --- | --- | --- |
| `{{ value }}` | interpolation | class → view (text) |
| `[prop]="value"` | property binding | class → view (DOM property) |
| `(event)="handler()"` | event binding | view → class |
| `[(x)]="value"` | two-way binding | both (sugar for `[x]` + `(xChange)`) |
| `[class.name]`, `[style.prop]` | class/style binding | class → view (presentation) |

- **Property vs attribute** — `[disabled]="cond"` sets the DOM *property*; use `[attr.x]`
  only for real HTML attributes with no property (e.g. `[attr.aria-label]`).
- **`$event`** — inside an event binding, `$event` is the DOM event (or the emitted value
  for a component's `@Output`).

## Interview Q&A

- **Q: `[disabled]="false"` vs `disabled="false"`?** The binding sets the boolean property
  (enabled). The plain string attribute `disabled="false"` is *present* → the element is
  **disabled** (attribute presence, not value). Always bind booleans.
- **Q: What does `[(ngModel)]` desugar to?** `[ngModel]="x"` + `(ngModelChange)="x = $event"`.
- **Q: When do you need `[attr.*]`?** For attributes without a matching DOM property —
  `aria-*`, `colspan`, SVG attributes, `data-*` via `attr.data-x`.

## Exercises

1. Add a `[style.color]` binding that turns the status red when `count > 10`.
2. Add `[attr.aria-live]="'polite'"` to `.count` and assert it via `getAttribute`.
3. Add a `double()` button using `count.update(n => n * 2)`.

## Docs

- [Binding dynamic text, properties and attributes](https://angular.dev/guide/templates/binding)
- [Adding event listeners](https://angular.dev/guide/templates/event-listeners)
- [Two-way binding](https://angular.dev/guide/templates/two-way-binding)

## Run

```bash
npm test -- 02-data-binding
```
