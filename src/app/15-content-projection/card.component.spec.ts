import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent (content projection)', () => {
  it('projects named and default slots to the right places', async () => {
    @Component({
      imports: [CardComponent],
      template: `
        <app-card>
          <span card-title>Invoice</span>
          <p>Body content here</p>
        </app-card>
      `,
    })
    class HostComponent {}

    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('.title')!.textContent?.trim()).toBe('Invoice');
    expect(el.querySelector('.body')!.textContent?.trim()).toBe('Body content here');
    // The named-slot node lands in the header, not the body:
    expect(el.querySelector('.body')!.querySelector('[card-title]')).toBeNull();
  });

  it('shows fallback content when the named slot is empty', async () => {
    @Component({
      imports: [CardComponent],
      template: `<app-card><p>only a body</p></app-card>`,
    })
    class HostComponent {}

    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.title').textContent?.trim()).toBe('Untitled');
  });
});
