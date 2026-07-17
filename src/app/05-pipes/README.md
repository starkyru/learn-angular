# Lesson 05 — Pipes

A pipe transforms a value in the template: `{{ value | pipeName:arg1:arg2 }}`.

## Concepts

- **`@Pipe({ name })` + `transform(value, ...args)`** — the whole contract. The first
  argument is the piped value; the rest are the `:args`.
- **Pure pipes (default)** — `transform` is memoised: it re-runs only when the input
  *reference* or an argument changes. Keep pipes pure and side-effect-free.
- **Impure pipes (`pure: false`)** — run on every change-detection cycle. Needed for things
  that mutate in place, but a performance risk. `AsyncPipe` is the classic built-in impure
  pipe (it subscribes to an Observable/Promise and unsubscribes on destroy).
- **Chaining** — `{{ d | date:'short' | uppercase }}` pipes left to right.

## Interview Q&A

- **Q: Pure vs impure?** Pure = memoised, recomputed only on reference/arg change (default,
  fast). Impure = recomputed every CD tick. Mutating an array in place won't refresh a pure
  pipe — return a new reference instead.
- **Q: Why prefer a pipe over a method call in the template?** A pure pipe is cached; a
  method runs on every change detection. Pipes also compose and read cleanly.
- **Q: What does `AsyncPipe` save you?** Manual `subscribe`/`unsubscribe` — it manages the
  subscription lifecycle and marks the component for check on emission.

## Exercises

1. Add a pure `initialsPipe` turning `"Ada Lovelace"` → `"AL"`; unit-test `transform`.
2. Prove a pure pipe does **not** re-run when you `push` into an array it received (mutate
   vs replace), then fix it by replacing the array reference.
3. Chain `truncate` with the built-in `uppercase` pipe in a host template.

## Run

```bash
npm test -- 05-pipes
```
