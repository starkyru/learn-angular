import { TestBed } from '@angular/core/testing';
import { ViewQueriesComponent } from './view-queries.component';

describe('ViewQueriesComponent', () => {
  it('uses a viewChild query to focus and a ViewContainerRef to add a component', async () => {
    TestBed.configureTestingModule({ imports: [ViewQueriesComponent] });
    const fixture = TestBed.createComponent(ViewQueriesComponent);
    await fixture.whenStable();

    fixture.componentInstance.focusAction();
    expect(document.activeElement).toBe(fixture.nativeElement.querySelector('button'));

    fixture.componentInstance.addDynamic();
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.notice')?.textContent).toContain('Created dynamically');
  });
});
