# Lesson 13 — Lifecycle hooks

The moments Angular calls into your component, and where to put init/cleanup.

## Concepts

Order for a component with bound inputs:

```
constructor → ngOnChanges → ngOnInit → ngDoCheck
            → ngAfterContentInit → ngAfterContentChecked
            → ngAfterViewInit → ngAfterViewChecked
            → (on updates: ngOnChanges/ngDoCheck/…Checked) → ngOnDestroy
```

- **constructor** — DI only. Inputs are NOT set yet; don't do real work here.
- **`ngOnChanges(changes)`** — before `ngOnInit` and on every bound-input change. Receives a
  `SimpleChanges` map (`previousValue`/`currentValue`/`firstChange`). Only fires when a parent
  binds inputs.
- **`ngOnInit`** — one-time initialization; inputs are available.
- **`ngAfterViewInit`** — child views/`viewChild()` are ready (DOM exists).
- **`ngOnDestroy`** — cleanup: unsubscribe, clear timers, disconnect observers.
- **`DestroyRef`** — `inject(DestroyRef).onDestroy(fn)` registers teardown without the
  interface; underpins `takeUntilDestroyed()`. Modern render callbacks: `afterNextRender` /
  `afterRender` (browser-only, post-paint work).

## Interview Q&A

- **Q: Why not initialize in the constructor?** Inputs aren't bound yet and it hurts
  testability/SSR. Use `ngOnInit`.
- **Q: When does `ngOnChanges` fire?** Only for **bound** inputs, before `ngOnInit` and on
  each change. A component created without a parent binding never gets it.
- **Q: Signals vs lifecycle hooks?** With signal inputs + `computed`/`effect` you rarely need
  `ngOnChanges`/`ngDoCheck` — reactivity replaces manual change tracking.
- **Q: How do you prevent subscription leaks?** `ngOnDestroy` unsubscribe, or
  `takeUntilDestroyed()` / `DestroyRef.onDestroy`.

## Exercises

1. Add `ngAfterViewInit` and prove it runs after `ngOnInit`.
2. Log `changes['value'].previousValue`/`currentValue` inside `ngOnChanges`.
3. Start an interval in `ngOnInit`, clear it via `DestroyRef.onDestroy`, and assert no ticks
   after destroy (jest fake timers).

## Docs

- [Component lifecycle](https://angular.dev/guide/components/lifecycle)
- [`DestroyRef` (API)](https://angular.dev/api/core/DestroyRef)
- [`afterNextRender` (API)](https://angular.dev/api/core/afterNextRender)

## Run

```bash
npm test -- 13-lifecycle
```
