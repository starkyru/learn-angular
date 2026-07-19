import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TruncatePipe } from './truncate.pipe';

@Component({
  imports: [TruncatePipe, UpperCasePipe],
  template: `{{ text | truncate: 5 | uppercase }}`,
})
class HostComponent {
  text = 'hello world';
}

/**
 * Exercise specs for lesson 05 — one `it` per README exercise.
 * The transform guards call the real pipe with hand-written expected values.
 * Run only these:  npm run test:exercises -- 05-pipes
 */
describe('Lesson 05 — exercises', () => {
  // Regression guards for the pure pipe (real transform, hand-computed expected).
  it('truncate shortens past the limit and appends the trail', () => {
    expect(new TruncatePipe().transform('hello world', 5)).toBe('hello…');
  });

  it('truncate leaves short strings untouched', () => {
    expect(new TruncatePipe().transform('hi', 5)).toBe('hi');
  });

  it('truncate maps null/undefined to an empty string', () => {
    expect(new TruncatePipe().transform(null)).toBe('');
  });

  // Exercise 3: chain truncate with the built-in uppercase pipe in a template.
  it('exercise 3: truncate then uppercase in a host template', async () => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent.trim()).toBe('HELLO…');
  });

  it.todo('exercise 1: write a pure initialsPipe ("Ada Lovelace" -> "AL") and unit-test transform');
  it.todo('exercise 2: prove a pure pipe ignores in-place array mutation, then fix by replacing the ref');
});
