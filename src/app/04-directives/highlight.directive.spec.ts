import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';

/**
 * Directives are tested through a tiny HOST component that uses them — that is how
 * they run in a real app, and it exercises the selector + host bindings for real.
 */
@Component({
  imports: [HighlightDirective],
  template: `<span appHighlight="lime">hover me</span>`,
})
class HostComponent {}

describe('HighlightDirective', () => {
  function setup() {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    const span = fixture.nativeElement.querySelector('span') as HTMLSpanElement;
    return { fixture, span };
  }

  it('is inert before any interaction', async () => {
    const { fixture, span } = setup();
    await fixture.whenStable();
    expect(span.classList.contains('highlighted')).toBe(false);
    expect(span.style.backgroundColor).toBe('');
  });

  it('applies the bound colour and .highlighted on mouseenter', async () => {
    const { fixture, span } = setup();
    span.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();

    expect(span.classList.contains('highlighted')).toBe(true);
    expect(span.style.backgroundColor).toBe('lime');
  });

  it('reverts on mouseleave', async () => {
    const { fixture, span } = setup();
    span.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();
    span.dispatchEvent(new MouseEvent('mouseleave'));
    await fixture.whenStable();

    expect(span.classList.contains('highlighted')).toBe(false);
    expect(span.style.backgroundColor).toBe('');
  });
});
