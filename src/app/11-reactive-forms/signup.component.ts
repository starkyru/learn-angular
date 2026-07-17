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
    <form [formGroup]="form">
      <input formControlName="username" />
      <input formControlName="email" />
      <input formControlName="age" type="number" />
    </form>
    <p class="status">{{ form.valid ? 'valid' : 'invalid' }}</p>
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
