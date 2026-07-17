import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DelayedComponent, NotifierService } from './delayed.component';

/**
 * Zoneless note: `fakeAsync`/`tick` require zone.js, which this workspace does not use.
 * The zoneless-friendly equivalent is Jest's fake timers + synchronous `detectChanges()`.
 * Do NOT combine fake timers with `await whenStable()`: fake timers freeze the timer the
 * zoneless scheduler uses to settle, so `whenStable()` never resolves (the test hangs).
 * Drive CD by hand with `detectChanges()` after `advanceTimersByTime(...)` instead.
 */
describe('DelayedComponent', () => {
  let notifier: NotifierService;
  let notifySpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DelayedComponent],
      providers: [NotifierService],
    });
    notifier = TestBed.inject(NotifierService);
    notifySpy = jest.spyOn(notifier, 'notify');
  });

  afterEach(() => jest.useRealTimers());

  it('queries the button via DebugElement + By.css', async () => {
    const fixture = TestBed.createComponent(DelayedComponent);
    await fixture.whenStable();
    const button = fixture.debugElement.query(By.css('button'));
    expect(button.nativeElement.textContent).toBe('go');
  });

  // With fake timers we drive change detection synchronously via detectChanges(),
  // instead of awaiting whenStable() (whose scheduler timer is frozen by fake timers).
  it('goes idle → pending immediately, → done after the timer fires', () => {
    jest.useFakeTimers();
    const fixture = TestBed.createComponent(DelayedComponent);
    fixture.detectChanges();
    const status = () => fixture.nativeElement.querySelector('.status').textContent?.trim();
    expect(status()).toBe('idle');

    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(status()).toBe('pending');
    expect(notifySpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1000); // fire the setTimeout
    fixture.detectChanges();

    expect(status()).toBe('done');
    expect(notifySpy).toHaveBeenCalledTimes(1);
    expect(notifySpy).toHaveBeenCalledWith('done');
  });

  it('does not complete before the delay elapses', () => {
    jest.useFakeTimers();
    const fixture = TestBed.createComponent(DelayedComponent);
    fixture.detectChanges();

    fixture.componentInstance.schedule();
    jest.advanceTimersByTime(999);
    fixture.detectChanges();

    expect(fixture.componentInstance.status()).toBe('pending');
    expect(notifySpy).not.toHaveBeenCalled();
  });
});
