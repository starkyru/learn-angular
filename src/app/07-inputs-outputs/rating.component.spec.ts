import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RatingComponent } from './rating.component';

/** Host binds a required input, a two-way `[(stars)]`, and listens to `(changed)`. */
@Component({
  imports: [RatingComponent],
  template: `
    <app-rating label="Quality" [max]="max" [(stars)]="score" (changed)="onChanged($event)" />
  `,
})
class HostComponent {
  readonly max = 3;
  readonly score = signal(1);
  readonly lastEvent = signal(-1);
  onChanged(v: number): void {
    this.lastEvent.set(v);
  }
}

describe('RatingComponent', () => {
  // Async: awaits the initial binding pass so the child sees the parent's inputs
  // (zoneless propagates `[(stars)]="score"` on the first change-detection cycle).
  async function setup() {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      host: fixture.componentInstance,
      up: el.querySelector('.up') as HTMLButtonElement,
      down: el.querySelector('.down') as HTMLButtonElement,
      label: () => el.querySelector('.label')!.textContent?.trim(),
      full: () => el.querySelector('.full')!.textContent?.trim(),
    };
  }

  it('renders required + optional inputs', async () => {
    const { label } = await setup();
    expect(label()).toBe('Quality: 1/3');
  });

  it('two-way [(stars)] writes back to the parent signal', async () => {
    const { fixture, host, up } = await setup();
    up.click();
    await fixture.whenStable();
    expect(host.score()).toBe(2); // child mutation propagated to parent
    expect(fixture.nativeElement.querySelector('.label').textContent).toContain('2/3');
  });

  it('emits (changed) with the new value', async () => {
    const { fixture, host, up } = await setup();
    up.click();
    await fixture.whenStable();
    expect(host.lastEvent()).toBe(2);
  });

  it('respects the [max] input bound from the parent', async () => {
    const { fixture, host, up } = await setup();
    up.click(); // 1 -> 2
    up.click(); // 2 -> 3 (max)
    up.click(); // clamped
    await fixture.whenStable();
    expect(host.score()).toBe(3);
  });

  it('computed full() reflects whether stars reached max', async () => {
    const { fixture, up, full } = await setup();
    expect(full()).toBe('room to grow'); // 1/3
    up.click(); // 2
    up.click(); // 3 == max
    await fixture.whenStable();
    expect(full()).toBe('maxed');
  });
});
