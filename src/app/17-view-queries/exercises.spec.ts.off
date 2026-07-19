import { TestBed } from '@angular/core/testing';
import { ViewQueriesComponent } from './view-queries.component';

/**
 * Exercise specs for lesson 17 — one `it` per README exercise.
 * Run only these:  npm run test:exercises -- 17-view-queries
 */
describe('Lesson 17 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [ViewQueriesComponent] });
  });

  // Regression guard: toggle() reveals and hides the detail paragraph.
  it('toggle() shows and hides the detail paragraph', async () => {
    const fixture = TestBed.createComponent(ViewQueriesComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#query-result')).toBeNull();
    fixture.componentInstance.toggle();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('#query-result')).not.toBeNull();
  });

  // Regression guard: addDynamic() creates a component through the ViewContainerRef query.
  it('addDynamic() renders the dynamic notice', async () => {
    const fixture = TestBed.createComponent(ViewQueriesComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.notice')).toBeNull();
    fixture.componentInstance.addDynamic();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.notice')).not.toBeNull();
  });

  it.todo('exercise 1: add contentChild() to the lesson-15 card and read the projected title');
  it.todo('exercise 2: keep the ComponentRef from createComponent() and destroy it from a button');
});
