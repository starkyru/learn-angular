# Lesson 01 — Components

The atom of every Angular app. A component = a class + an `@Component` decorator that
binds a **template** (view) to **class state/behaviour** (logic).

## Concepts

- **`@Component` decorator** — `selector` (the tag), `template`/`templateUrl` (the view),
  and `imports` (what the template uses). Modern components are **standalone** — no NgModule.
- **Interpolation** — `{{ expr }}` renders a class field/method result into the DOM.
- **Event binding** — `(click)="handler()"` wires a DOM event to a method.
- **Signals** — `signal(initial)` holds reactive state. Read `x()`, write `x.set(v)` /
  `x.update(fn)`. When a signal a template reads changes, only that view re-renders.
- **`ChangeDetectionStrategy.OnPush`** — the modern default posture: re-render only when an
  input or a read signal changes. Signals make `OnPush` effortless.

## Interview Q&A

- **Q: What makes a class a component?** The `@Component` decorator (metadata read by the
  Angular compiler). Without it, it's a plain class.
- **Q: Standalone vs NgModule?** Standalone components declare their own `imports` and need
  no `@NgModule`. Default since v17; NgModules are legacy/optional.
- **Q: `templateUrl` vs `template`?** Same result — external file vs inline string. Inline
  suits tiny components; external suits large templates.
- **Q: Why signals over plain fields?** Signals are tracked, so Angular knows exactly which
  views depend on which state → precise, zoneless change detection.

## Exercises

1. Add a `reset()` method + button that sets `volume` back to `0`; assert it in the spec.
2. Add a `whisper()` that decrements but never goes below `0`.
3. Change `name` and prove `greet()` and the rendered `.greeting` both update.

## Docs

- [Anatomy of a component](https://angular.dev/guide/components)
- [Component selectors](https://angular.dev/guide/components/selectors)
- [Angular Signals](https://angular.dev/guide/signals)
- [Skipping component subtrees (OnPush)](https://angular.dev/best-practices/skipping-subtrees)

## Run

```bash
npm test -- 01-components
```
