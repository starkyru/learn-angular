# Lesson 11 — Reactive forms

Model-driven forms: the form is a typed object graph in your class, so validation and state
are explicit, synchronous, and trivially unit-testable.

## Concepts

- **Building blocks** — `FormControl` (one field), `FormGroup` (object of controls),
  `FormArray` (dynamic list). `FormBuilder` / `fb.nonNullable.group({...})` is the ergonomic
  way to build them with types.
- **`nonNullable`** — controls reset to their initial value instead of `null`, and the value
  type excludes `null`.
- **Validators** — built-in `Validators.required | minLength | email | min | pattern`, or a
  custom `(control) => ValidationErrors | null`. Async validators return an Observable/Promise.
- **State** — `form.valid` / `invalid` / `dirty` / `touched`, `control.errors`,
  `control.hasError('x')`, `form.value` (typed), `form.getRawValue()` (includes disabled).
- **Reactivity** — `form.valueChanges` / `statusChanges` are Observables (RxJS, lesson 09).
- **Template wiring** — `[formGroup]`, `formControlName`, `formGroupName`, `formArrayName`
  from `ReactiveFormsModule`.

## Interview Q&A

- **Q: Reactive vs template-driven?** Reactive = model defined in the class (explicit, typed,
  testable, scales, sync validation). Template-driven = built implicitly from `ngModel` in the
  template (quick for tiny forms). Interviews favour reactive.
- **Q: How do you write a custom validator?** A function `(control) => errors | null`;
  register it in the control's validator array. Async ones return `Observable<errors|null>`.
- **Q: `value` vs `getRawValue()`?** `value` omits disabled controls; `getRawValue()` includes
  them.
- **Q: How do you validate across fields (password match)?** A group-level validator on the
  `FormGroup`.

## Exercises

1. Add a `confirmPassword` control and a group validator that errors when it ≠ `password`.
2. Add an async username-availability validator (returns an Observable).
3. Subscribe to `form.controls.age.valueChanges` and assert emissions.

## Run

```bash
npm test -- 11-reactive-forms
```
