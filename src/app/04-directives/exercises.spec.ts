import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  imports: [HighlightDirective],
  template: `<p appHighlight>hover me</p>`,
})
class HostComponent {}

/**
 * Exercise specs for lesson 04 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 04-directives
 */
describe('Lesson 04 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
  });

  // Exercise 3: [attr.data-active] host binding reflects active().
  it('exercise 3: host reflects active state via data-active', async () => {
    const fixture = TestBed.createComponent(HostComponent);
    const el = fixture.debugElement.query(By.directive(HighlightDirective));
    await fixture.whenStable();

    el.triggerEventHandler('mouseenter', {});
    await fixture.whenStable();
    expect(el.nativeElement.getAttribute('data-active')).toBe('true');

    el.triggerEventHandler('mouseleave', {});
    await fixture.whenStable();
    expect(el.nativeElement.getAttribute('data-active')).not.toBe('true');
  });

  it.todo('exercise 1: add a text-colour alias input alongside [appHighlight]');
  it.todo('exercise 2: rewrite the DOM writes with Renderer2 and keep behaviour identical');
});
