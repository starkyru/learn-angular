# Lesson 16 — Testing patterns

The toolkit that recurs across every lesson's specs, gathered in one place.

## Concepts

- **`TestBed`** — configures a testing NgModule. `configureTestingModule({ imports, providers })`,
  then `createComponent(Cmp)` → a `ComponentFixture`.
- **`ComponentFixture`** — `componentInstance` (the class), `nativeElement` (raw DOM),
  `debugElement` (framework wrapper), `whenStable()` (settle async + CD, zoneless-friendly).
- **`DebugElement` + `By.css`** — `fixture.debugElement.query(By.css('.sel'))`; also
  `By.directive(Cmp)`. `triggerEventHandler('click', {})` fires bound handlers.
- **DI substitution** — override real dependencies:
  `{ provide: Real, useClass: Fake }` / `useValue` / a spy object.
- **Spies** — `jest.spyOn(obj, 'method')`, `jest.fn()`; assert with `toHaveBeenCalledWith`,
  `toHaveBeenCalledTimes`.
- **Async & timers** — `await fixture.whenStable()` for promises/CD. For timers, **Jest fake
  timers** (`jest.useFakeTimers()` + `advanceTimersByTime`) — because this workspace is
  **zoneless**, `fakeAsync`/`tick` (which need zone.js) are unavailable.
- **HTTP** — `HttpTestingController` (lesson 10). **Guards** — `runInInjectionContext`
  (lesson 12). **Harnesses** — `@angular/cdk/testing` for component-agnostic interaction.

## Interview Q&A

- **Q: `fakeAsync`/`tick` vs `async`/`whenStable`?** `fakeAsync` runs a synchronous fake time
  zone (`tick(ms)`); it needs **zone.js**. Zoneless apps use real `async` tests with Jest fake
  timers instead.
- **Q: How do you replace a dependency in a test?** A provider override
  (`useClass`/`useValue`) or a `jest.spyOn` on the injected instance.
- **Q: `nativeElement` vs `debugElement`?** `debugElement` is the framework wrapper (queries,
  `triggerEventHandler`, DI); `nativeElement` is the raw DOM node.
- **Q: What does `whenStable()` do?** Waits for pending microtasks/CD so the view reflects the
  latest state before you assert.

## Exercises

1. Replace `NotifierService` with `{ provide: NotifierService, useValue: { notify: jest.fn() } }`.
2. Use `triggerEventHandler('click', {})` instead of `nativeElement.click()`.
3. Add a debounced input using `setTimeout` and test it with fake timers.

## Run

```bash
npm test -- 16-testing-patterns
```
