import { FormControl } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { SignupComponent, forbiddenNameValidator } from './signup.component';

/**
 * Exercise specs for lesson 11 — one `it` per README exercise.
 * The guards call the real validator/form with hand-written expected values.
 * Run only these:  npm run test:exercises -- 11-reactive-forms
 */
describe('Lesson 11 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [SignupComponent] });
  });

  // Regression guard: the exported custom validator (real code, hand-written expectations).
  it('forbiddenNameValidator rejects "admin" and allows others', () => {
    expect(forbiddenNameValidator(new FormControl('admin'))).toEqual({ forbidden: true });
    expect(forbiddenNameValidator(new FormControl('ada'))).toBeNull();
  });

  // Regression guard: form validity flips with correct input.
  it('form is invalid empty and valid when correctly filled', () => {
    const form = TestBed.createComponent(SignupComponent).componentInstance.form;
    expect(form.valid).toBe(false);
    form.setValue({ username: 'ada', email: 'ada@x.io', age: 30 });
    expect(form.valid).toBe(true);
  });

  it('age under 18 raises the min error', () => {
    const form = TestBed.createComponent(SignupComponent).componentInstance.form;
    form.setValue({ username: 'ada', email: 'ada@x.io', age: 17 });
    expect(form.controls.age.hasError('min')).toBe(true);
  });

  // Exercise 3: subscribe to age.valueChanges and assert emissions.
  it('exercise 3: age.valueChanges emits on each update', () => {
    const form = TestBed.createComponent(SignupComponent).componentInstance.form;
    const seen: number[] = [];
    const sub = form.controls.age.valueChanges.subscribe((v) => seen.push(v));
    form.controls.age.setValue(21);
    form.controls.age.setValue(22);
    sub.unsubscribe();
    expect(seen).toEqual([21, 22]);
  });

  it.todo('exercise 1: add confirmPassword + a group validator that errors on mismatch');
  it.todo('exercise 2: add an async username-availability validator (returns an Observable)');
});
