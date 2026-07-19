# Lesson 15 — Content projection

Build reusable "shell" components (cards, dialogs, layouts) that render markup supplied by
the parent — Angular's equivalent of `children`/slots.

## Concepts

- **`<ng-content />`** — default slot; renders everything the parent puts between the tags.
- **`<ng-content select="...">`** — named slots by CSS selector (`[attr]`, `.class`, `tag`).
  Unmatched nodes fall through to a default `<ng-content>`.
- **Fallback content** — markup inside `<ng-content>…</ng-content>` shows when nothing is
  projected (Angular 18+).
- **`ng-template` + `ngTemplateOutlet`** — project *parameterised* templates: the parent
  passes a `<ng-template let-item>` and the child stamps it with a context
  (`[ngTemplateOutletContext]`). Powers "render prop" style APIs (tables, lists).
- **`ViewContainerRef` / `TemplateRef`** — imperative rendering: `createEmbeddedView(tpl, ctx)`
  is how structural directives and dynamic components work.
- **Context** — projected content belongs to the **parent's** injector and change detection,
  not the child's.

## Interview Q&A

- **Q: Content projection vs `@Input`?** Inputs pass data values; projection passes markup
  the child arranges into slots. Use projection for flexible layout, inputs for data.
- **Q: `ng-content` vs `ng-template`?** `ng-content` projects the *given* markup as-is;
  `ng-template` is a reusable, lazily-stamped blueprint you render with a context (can repeat,
  pass variables).
- **Q: Which injector/CD context does projected content use?** The parent's — it's declared in
  the parent template.
- **Q: How do `@ContentChild` and `@ViewChild` differ?** `contentChild()` queries *projected*
  content; `viewChild()` queries the component's *own* template.

## Exercises

1. Add a `select=".actions"` footer slot and assert projection.
2. Build a `<app-list [items]>` that projects a `<ng-template let-item>` via `ngTemplateOutlet`.
3. Query a projected element with `contentChild()` and read it in `ngAfterContentInit`.

## Docs

- [Content projection with `ng-content`](https://angular.dev/guide/components/content-projection)
- [`NgTemplateOutlet` (API)](https://angular.dev/api/common/NgTemplateOutlet)
- [Programmatically rendering components](https://angular.dev/guide/components/programmatic-rendering)

## Run

```bash
npm test -- 15-content-projection
```
