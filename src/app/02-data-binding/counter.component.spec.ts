import { TestBed } from '@angular/core/testing';
import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CounterComponent] });
  });

  function setup() {
    const fixture = TestBed.createComponent(CounterComponent);
    const el = fixture.nativeElement as HTMLElement;
    const [incBtn, resetBtn] = Array.from(el.querySelectorAll('button')) as HTMLButtonElement[];
    return { fixture, el, incBtn, resetBtn };
  }

  it('property binding disables Reset only when count is 0', async () => {
    const { fixture, incBtn, resetBtn } = setup();
    await fixture.whenStable();
    expect(resetBtn.disabled).toBe(true);

    incBtn.click();
    await fixture.whenStable();
    expect(resetBtn.disabled).toBe(false);
  });

  it('event binding updates state and interpolation', async () => {
    const { fixture, el, incBtn } = setup();
    incBtn.click();
    incBtn.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.count()).toBe(2);
    expect(el.querySelector('.count')!.textContent?.trim()).toBe('Count: 2');
    expect(el.querySelector('.status')!.textContent?.trim()).toBe('2 clicks');
  });

  it('class binding toggles .positive with the count', async () => {
    const { fixture, el, incBtn } = setup();
    await fixture.whenStable();
    expect(el.querySelector('.status')!.classList.contains('positive')).toBe(false);

    incBtn.click();
    await fixture.whenStable();
    expect(el.querySelector('.status')!.classList.contains('positive')).toBe(true);
  });

  it('Reset returns count to 0', async () => {
    const { fixture, incBtn, resetBtn } = setup();
    incBtn.click();
    await fixture.whenStable();
    resetBtn.click();
    await fixture.whenStable();
    expect(fixture.componentInstance.count()).toBe(0);
  });
});
