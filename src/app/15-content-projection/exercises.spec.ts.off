import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

@Component({
  imports: [CardComponent],
  template: `<app-card><span card-title>Report</span>Body text</app-card>`,
})
class TitledHost {}

@Component({
  imports: [CardComponent],
  template: `<app-card>Only body</app-card>`,
})
class FallbackHost {}

/**
 * Exercise specs for lesson 15 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 15-content-projection
 */
describe('Lesson 15 — exercises', () => {
  // Regression guard: the named title slot and default body slot both project.
  it('projects the card-title slot and the default body', async () => {
    TestBed.configureTestingModule({ imports: [TitledHost] });
    const fixture = TestBed.createComponent(TitledHost);
    await fixture.whenStable();
    expect((fixture.nativeElement.querySelector('.title') as HTMLElement).textContent).toContain('Report');
    expect((fixture.nativeElement.querySelector('.body') as HTMLElement).textContent).toContain('Body text');
  });

  // Regression guard: the title slot falls back when nothing is projected into it.
  it('shows the fallback title when no card-title is projected', async () => {
    TestBed.configureTestingModule({ imports: [FallbackHost] });
    const fixture = TestBed.createComponent(FallbackHost);
    await fixture.whenStable();
    expect((fixture.nativeElement.querySelector('.title') as HTMLElement).textContent?.trim()).toBe('Untitled');
  });

  it.todo('exercise 1: add a select=".actions" footer slot and assert projection');
  it.todo('exercise 2: project a <ng-template let-item> list via ngTemplateOutlet');
  it.todo('exercise 3: query a projected element with contentChild() in ngAfterContentInit');
});
