# Lesson 03 — Built-in control flow

Conditionals and loops in the template, using the block syntax that replaced
`*ngIf` / `*ngFor` / `ngSwitch` in Angular v17.

## Concepts

- **`@if / @else if / @else`** — conditional rendering. Supports an alias:
  `@if (user(); as u) { {{ u.name }} }`.
- **`@for (item of items(); track item.id)`** — loops. **`track` is mandatory** and is the
  identity Angular uses to move/reuse DOM nodes instead of destroying and rebuilding them.
- **`@empty { }`** — optional block rendered when the collection is empty.
- **`@switch / @case / @default`** — multi-way branch.
- Implicit `@for` variables: `$index`, `$first`, `$last`, `$even`, `$odd`, `$count`.

## Interview Q&A

- **Q: Why is `track` required?** Without stable identity Angular can't tell which items
  moved vs changed; `track item.id` lets it reuse DOM (huge perf win, preserves focus/state).
  `track $index` is a fallback but breaks when items reorder.
- **Q: New control flow vs `*ngIf`/`*ngFor`?** Built into the compiler → no `CommonModule`
  import, better type-narrowing, faster, and `@empty` has no `*ngFor` equivalent.
- **Q: Does `@if` destroy the DOM when false?** Yes — like `*ngIf`, it removes nodes (vs
  `[hidden]`/`[style.display]` which keep them in the DOM).

## Exercises

1. Render `$index + 1` before each todo title and assert the numbering.
2. Add an `@if (todo.done)` inside the loop that appends a ✓ to done items.
3. Change `track todo.id` to `track $index`, add a todo at the *front*, and observe the spec
   still passing but understand why `id` is the safer key.

## Run

```bash
npm test -- 03-control-flow
```
