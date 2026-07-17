import { TestBed } from '@angular/core/testing';
import { HelloComponent } from './hello.component';

/**
 * TestBed builds a real (headless) instance of the component in jsdom.
 * `fixture.nativeElement` is the rendered DOM; `fixture.componentInstance` is the class.
 * This workspace is zoneless, so we `await fixture.whenStable()` to let the view settle.
 */
describe('HelloComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HelloComponent] });
  });

  it('renders the greeting from component state', async () => {
    const fixture = TestBed.createComponent(HelloComponent);
    await fixture.whenStable();

    const greeting = fixture.nativeElement.querySelector('.greeting') as HTMLElement;
    expect(greeting.textContent?.trim()).toBe('Hello, Angular!');
  });

  it('greet() returns the greeting string', () => {
    const fixture = TestBed.createComponent(HelloComponent);
    expect(fixture.componentInstance.greet()).toBe('Hello, Angular!');
  });

  it('clicking Shout increments volume and updates the view', async () => {
    const fixture = TestBed.createComponent(HelloComponent);
    await fixture.whenStable();

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();
    button.click();
    await fixture.whenStable();

    expect(fixture.componentInstance.volume()).toBe(2);
    const volume = fixture.nativeElement.querySelector('.volume') as HTMLElement;
    expect(volume.textContent?.trim()).toBe('Volume: 2');
  });
});
