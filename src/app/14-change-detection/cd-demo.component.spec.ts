import { TestBed } from '@angular/core/testing';
import { CdDemoComponent } from './cd-demo.component';

describe('CdDemoComponent (change detection)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CdDemoComponent] });
  });

  function setup() {
    const fixture = TestBed.createComponent(CdDemoComponent);
    const el = fixture.nativeElement as HTMLElement;
    return {
      fixture,
      comp: fixture.componentInstance,
      signalText: () => el.querySelector('.signal')!.textContent?.trim(),
      plainText: () => el.querySelector('.plain')!.textContent?.trim(),
    };
  }

  it('a signal change updates the view automatically', async () => {
    const { fixture, comp, signalText } = setup();
    await fixture.whenStable();
    expect(signalText()).toBe('signal: 0');

    comp.bumpSignal();
    await fixture.whenStable();
    expect(signalText()).toBe('signal: 1');
  });

  it('a plain-field mutation leaves the view STALE (no CD triggered)', async () => {
    const { fixture, comp, plainText } = setup();
    await fixture.whenStable();
    expect(plainText()).toBe('plain: 0');

    comp.bumpPlainSilently();
    await fixture.whenStable();

    expect(comp.plain).toBe(1); // model changed
    expect(plainText()).toBe('plain: 0'); // ...but the view did not re-render
  });

  it('markForCheck() flushes the stale plain field to the view', async () => {
    const { fixture, comp, plainText } = setup();
    await fixture.whenStable();

    comp.bumpPlainAndNotify();
    await fixture.whenStable();
    expect(plainText()).toBe('plain: 1');
  });
});
