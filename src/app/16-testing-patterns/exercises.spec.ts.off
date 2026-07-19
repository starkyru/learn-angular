import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DelayedComponent, NotifierService } from './delayed.component';

/**
 * Exercise specs for lesson 16 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 16-testing-patterns
 */
describe('Lesson 16 — exercises', () => {
  afterEach(() => jest.useRealTimers());

  // Exercise 1: replace NotifierService with a useValue jest.fn spy.
  it('exercise 1: a useValue fake notifier receives "done" after the timer', () => {
    jest.useFakeTimers();
    const notify = jest.fn();
    TestBed.configureTestingModule({
      imports: [DelayedComponent],
      providers: [{ provide: NotifierService, useValue: { notify } }],
    });
    const fixture = TestBed.createComponent(DelayedComponent);
    fixture.detectChanges();
    fixture.componentInstance.schedule();
    jest.advanceTimersByTime(1000);
    fixture.detectChanges();
    expect(notify).toHaveBeenCalledWith('done');
  });

  // Exercise 2: drive the click with triggerEventHandler instead of nativeElement.click().
  it('exercise 2: triggerEventHandler click moves idle -> pending', () => {
    TestBed.configureTestingModule({
      imports: [DelayedComponent],
      providers: [NotifierService],
    });
    const fixture = TestBed.createComponent(DelayedComponent);
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).triggerEventHandler('click', {});
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.status').textContent.trim()).toBe('pending');
  });

  it.todo('exercise 3: add a debounced input using setTimeout and test it with fake timers');
});
