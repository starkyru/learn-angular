import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CdDemoComponent } from './cd-demo.component';

/**
 * Exercise specs for lesson 14 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 14-change-detection
 */
describe('Lesson 14 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CdDemoComponent] });
  });

  function text(fixture: ComponentFixture<CdDemoComponent>, sel: string): string | undefined {
    return (fixture.nativeElement.querySelector(sel) as HTMLElement).textContent?.trim();
  }

  // Exercise 1: a signal update refreshes the view with no manual markForCheck.
  it('exercise 1: signal update re-renders automatically', async () => {
    const fixture = TestBed.createComponent(CdDemoComponent);
    await fixture.whenStable();
    expect(text(fixture, '.signal')).toBe('signal: 0');
    fixture.componentInstance.bumpSignal();
    await fixture.whenStable();
    expect(text(fixture, '.signal')).toBe('signal: 1');
  });

  // Regression guard: a plain-field mutation stays stale until markForCheck.
  it('plain field stays stale silently, updates after markForCheck', async () => {
    const fixture = TestBed.createComponent(CdDemoComponent);
    await fixture.whenStable();
    expect(text(fixture, '.plain')).toBe('plain: 0');

    fixture.componentInstance.bumpPlainSilently();
    await fixture.whenStable();
    expect(text(fixture, '.plain')).toBe('plain: 0'); // stale: no CD was scheduled

    fixture.componentInstance.bumpPlainAndNotify();
    await fixture.whenStable();
    expect(text(fixture, '.plain')).toBe('plain: 2'); // markForCheck flushed both bumps
  });

  it.todo('exercise 2: detach() the detector and show even signal updates stop until reattach()');
  it.todo('exercise 3: add an @Input() object and demonstrate the mutate-vs-replace trap');
});
