# Lesson 08 — Signals

Angular's reactive primitive and the engine behind zoneless change detection.

## Concepts

- **`signal(initial)`** — writable state. `s()` reads (and *tracks* if inside a reactive
  context); `s.set(v)` / `s.update(fn)` write. Equality is by reference (`===`) by default;
  pass `{ equal }` to customise.
- **`computed(fn)`** — read-only, **memoised**, **lazy**. Recomputes only when a signal it
  read changes *and* someone reads it. Never write to it.
- **`effect(fn)`** — runs side effects when tracked signals change. Runs in an injection
  context (component/service constructor, or `runInInjectionContext`); cleaned up
  automatically on destroy. Not for deriving state — use `computed` for that.
- **Automatic dependency tracking** — a computed/effect depends on exactly the signals it
  *reads during execution*. No dependency arrays.
- **`untracked(fn)`** — read a signal without creating a dependency.
- **`linkedSignal`** — writable state that also resets from a source (great for "selected
  item defaults to first of a list").
- **`toSignal` / `toObservable`** (`@angular/core/rxjs-interop`) — bridge signals ↔ RxJS.

## Interview Q&A

- **Q: `computed` vs `effect`?** `computed` *derives a value* (pure, memoised, read-only).
  `effect` *does something* (impure side effect). Deriving state in an effect is an anti-pattern.
- **Q: Why did my computed not update?** You mutated in place (`arr.push`) — signals compare
  by reference. Set a new reference (`s.update(a => [...a, x])`).
- **Q: When do effects run?** After the initial run, they're scheduled and flushed during
  change detection. In tests, `await fixture.whenStable()`.
- **Q: How do signals enable zoneless?** Angular knows precisely which views read which
  signals, so it can re-render just those — no `zone.js` monkey-patching required.

## Exercises

1. Add a `discounted = computed(() => total() * 0.9)` and assert it.
2. Use `linkedSignal` to track a "selected price" that defaults to the last added price.
3. Replace the `effect` history with `toSignal(toObservable(total).pipe(...))` and compare.

## Run

```bash
npm test -- 08-signals
```
