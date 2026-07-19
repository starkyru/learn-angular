import { TestBed } from '@angular/core/testing';
import { LifecycleComponent } from './lifecycle.component';

/**
 * Exercise specs for lesson 13 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 13-lifecycle
 */
describe('Lesson 13 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [LifecycleComponent] });
  });

  // Regression guard: the constructor runs before ngOnInit.
  it('records construct before ngOnInit', async () => {
    const fixture = TestBed.createComponent(LifecycleComponent);
    await fixture.whenStable();
    const log = fixture.componentInstance.log();
    expect(log.indexOf('construct')).toBeGreaterThanOrEqual(0);
    expect(log.indexOf('construct')).toBeLessThan(log.indexOf('ngOnInit'));
  });

  // Exercise 1: add ngAfterViewInit and prove it runs after ngOnInit.
  it('exercise 1: ngAfterViewInit runs after ngOnInit', async () => {
    const fixture = TestBed.createComponent(LifecycleComponent);
    await fixture.whenStable();
    const log = fixture.componentInstance.log();
    expect(log).toContain('ngAfterViewInit');
    expect(log.indexOf('ngOnInit')).toBeLessThan(log.indexOf('ngAfterViewInit'));
  });

  it.todo('exercise 2: log previousValue/currentValue in ngOnChanges (bind [value] from a host)');
  it.todo('exercise 3: start an interval in ngOnInit, clear via DestroyRef.onDestroy, assert no ticks after destroy');
});
