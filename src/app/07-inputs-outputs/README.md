# Lesson 07 — Component I/O: inputs, outputs, two-way

How components talk. Data flows **down** via inputs; events flow **up** via outputs.

## Concepts

| Modern (signal) | Legacy (decorator) | Parent binding |
| --- | --- | --- |
| `x = input<T>()` | `@Input() x` | `[x]="value"` |
| `x = input.required<T>()` | `@Input({ required: true })` | `[x]="value"` (enforced) |
| `x = output<T>()` | `@Output() x = new EventEmitter<T>()` | `(x)="handler($event)"` |
| `x = model<T>()` | `@Input()` + `@Output() xChange` | `[(x)]="value"` |

- **Inputs are signals** — read `x()`; they update when the parent binding changes.
- **`input.required`** — no default; the template compiler errors if a parent forgets to bind.
- **`output()`** — call `.emit(value)`; the parent receives it as `$event`.
- **`model()`** — a writable signal that is *also* a two-way binding target. Writing it in the
  child emits `<name>Change`, updating the parent's bound signal.
- **`transform` / `alias`** — `input(0, { transform: numberAttribute, alias: 'count' })`.

## Interview Q&A

- **Q: Signal inputs vs `@Input()`?** Signal inputs are read as functions, are reactive
  (drive `computed`/`effect`), support `required`, and don't need `ngOnChanges` to observe
  changes. Decorator inputs are the pre-v17 style.
- **Q: How does `[(x)]` actually work?** Sugar for `[x]="v"` + `(xChange)="v = $event"`.
  `model()` wires both halves for you.
- **Q: How do you react to an input changing?** `computed`/`effect` on the input signal —
  or `ngOnChanges` for decorator inputs.
- **Q: Can a parent read child state directly?** Prefer outputs. For imperative access use a
  template ref / `viewChild()` — but that couples parent to child internals.

## Exercises

1. Add `readonly disabled = input(false)` and disable both buttons when set.
2. Add an `output` `maxed` that fires only when `stars === max`.
3. Convert `label`/`max` to the legacy `@Input()` decorator form and note what breaks in the
   template usage (nothing) vs the class usage (`label` is a value, not a function).

## Docs

- [Accepting data with input properties](https://angular.dev/guide/components/inputs)
- [Custom events with outputs](https://angular.dev/guide/components/outputs)
- [Two-way binding (`model()`)](https://angular.dev/guide/templates/two-way-binding)

## Run

```bash
npm test -- 07-inputs-outputs
```
