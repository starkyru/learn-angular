# Lesson 09 — RxJS

Reactive streams of values over time. Angular's async surfaces (HttpClient, Router params,
reactive form `valueChanges`) are Observables, so RxJS fluency is core interview material.

## Concepts

- **Observable** — lazy; nothing happens until you `subscribe()`. Can emit 0..∞ values, then
  `complete` or `error`.
- **Subject** — multicast Observable you push into with `.next()`. **BehaviorSubject** stores
  and replays the latest value (has `.value`); **ReplaySubject** replays N; **AsyncSubject**
  emits only the last on complete.
- **Operators** (`.pipe(...)`) — pure, composable transforms:
  - transform: `map`, `scan`, `pluck`
  - filter: `filter`, `take`, `distinctUntilChanged`, `debounceTime`
  - flatten: `switchMap` (cancel previous — great for search), `mergeMap`, `concatMap`, `exhaustMap`
  - combine: `combineLatest`, `forkJoin`, `withLatestFrom`
- **Subscription management** — a subscription that outlives the component leaks. Options:
  `AsyncPipe` (auto-unsubscribes), `takeUntilDestroyed()`, or store + `unsubscribe()` in
  `ngOnDestroy`.

## Interview Q&A

- **Q: `switchMap` vs `mergeMap` vs `concatMap` vs `exhaustMap`?** switch = cancel previous
  inner (typeahead); merge = run all concurrently; concat = queue in order; exhaust = ignore
  new while one is running (submit-button guard).
- **Q: Observable vs Promise?** Observable is lazy, multi-value, cancellable, composable;
  Promise is eager, single-value, not cancellable.
- **Q: How do you avoid subscription leaks?** `AsyncPipe` in the template, or
  `takeUntilDestroyed()`, or manual unsubscribe in `ngOnDestroy`.
- **Q: `BehaviorSubject` use case?** State that new subscribers need immediately (current
  value) — a lightweight store.

## Exercises

1. Add `debounceTime(300)` + `distinctUntilChanged()` to `terms$`; test with fake timers.
2. Add a `results$` that `switchMap`s a term into a fake async lookup.
3. Bridge `terms$` to a signal with `toSignal` and read it synchronously.

## Run

```bash
npm test -- 09-rxjs
```
