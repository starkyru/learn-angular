import { TestBed } from '@angular/core/testing';
import { SignupComponent, forbiddenNameValidator } from './signup.component';
import { FormControl } from '@angular/forms';

describe('forbiddenNameValidator', () => {
  it('rejects "admin"', () => {
    expect(forbiddenNameValidator(new FormControl('admin'))).toEqual({ forbidden: true });
  });

  it('accepts anything else', () => {
    expect(forbiddenNameValidator(new FormControl('ada'))).toBeNull();
  });
});

describe('SignupComponent form model', () => {
  function createForm() {
    TestBed.configureTestingModule({ imports: [SignupComponent] });
    return TestBed.createComponent(SignupComponent).componentInstance.form;
  }

  it('is invalid while empty (required fields)', () => {
    const form = createForm();
    expect(form.valid).toBe(false);
    expect(form.controls.username.hasError('required')).toBe(true);
  });

  it('flags username min length and the custom forbidden rule', () => {
    const form = createForm();
    form.controls.username.setValue('ab');
    expect(form.controls.username.hasError('minlength')).toBe(true);

    form.controls.username.setValue('admin');
    expect(form.controls.username.hasError('forbidden')).toBe(true);
  });

  it('validates the email format', () => {
    const form = createForm();
    form.controls.email.setValue('not-an-email');
    expect(form.controls.email.hasError('email')).toBe(true);

    form.controls.email.setValue('ada@example.com');
    expect(form.controls.email.valid).toBe(true);
  });

  it('enforces the minimum age', () => {
    const form = createForm();
    form.controls.age.setValue(16);
    expect(form.controls.age.hasError('min')).toBe(true);
  });

  it('is valid once every control passes, with a typed value', () => {
    const form = createForm();
    form.setValue({ username: 'ada', email: 'ada@example.com', age: 30 });

    expect(form.valid).toBe(true);
    expect(form.getRawValue()).toEqual({ username: 'ada', email: 'ada@example.com', age: 30 });
  });
});
