import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

/**
 * Lesson 11 — Reactive forms
 *
 * Reactive (model-driven) forms define the form model in the class as typed
 * `FormControl` / `FormGroup` objects — explicit, synchronous, and easy to unit-test
 * (vs template-driven forms built from `[(ngModel)]`).
 *
 *   FormBuilder.nonNullable.group({...}) — typed controls that reset to their initial value
 *                                          instead of null.
 *   Validators — built-in (`required`, `minLength`, `email`, `min`) + custom functions.
 *   Reactive state — `form.valid`, `form.value`, `control.errors`, `form.valueChanges` ($).
 */

/** A custom synchronous validator: reject the literal name "admin". */
export function forbiddenNameValidator(control: AbstractControl): ValidationErrors | null {
  return control.value === 'admin' ? { forbidden: true } : null;
}

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" novalidate>
      <label for="username">Username</label>
      <input id="username" formControlName="username" aria-describedby="username-error" />
      @if (form.controls.username.invalid && form.controls.username.touched) {
        <p id="username-error" role="alert">Use at least 3 characters; “admin” is reserved.</p>
      }
      <label for="email">Email</label>
      <input id="email" formControlName="email" type="email" aria-describedby="email-error" />
      @if (form.controls.email.invalid && form.controls.email.touched) {
        <p id="email-error" role="alert">Enter a valid email address.</p>
      }
      <label for="age">Age</label>
      <input id="age" formControlName="age" type="number" min="18" aria-describedby="age-error" />
      @if (form.controls.age.invalid && form.controls.age.touched) {
        <p id="age-error" role="alert">You must be at least 18.</p>
      }
    </form>
    <p class="status" aria-live="polite">{{ form.valid ? 'valid' : 'invalid' }}</p>
  `,
})
export class SignupComponent {
  private readonly fb = inject(FormBuilder);

  readonly form = this.fb.nonNullable.group({
    username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator]],
    email: ['', [Validators.required, Validators.email]],
    age: [0, [Validators.min(18)]],
  });
}
