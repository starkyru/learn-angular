import { TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TodoListComponent] });
  });

  it('shows the @empty state when there are no todos', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('ul')).not.toBeNull();
    expect(el.querySelector('.empty')!.textContent).toContain('Nothing to do');
    expect(el.querySelector('.summary')!.textContent?.trim()).toBe('Add your first todo');
  });

  it('@for renders one <li> per todo, in order', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.componentInstance.add('buy milk');
    fixture.componentInstance.add('write specs');
    await fixture.whenStable();

    const items = Array.from(fixture.nativeElement.querySelectorAll('li')) as HTMLLIElement[];
    expect(items.map((li) => li.textContent?.trim())).toEqual(['buy milk', 'write specs']);
  });

  it('@switch reports remaining count while in progress', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.componentInstance.add('a');
    fixture.componentInstance.add('b');
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('.summary')!.textContent?.trim()).toBe('2 left');
  });

  it('toggling all todos flips @switch to "All done!" and adds .done class', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    const c = fixture.componentInstance;
    c.add('only');
    c.toggle(1);
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('li')!.classList.contains('done')).toBe(true);
    expect(fixture.nativeElement.querySelector('.summary')!.textContent?.trim()).toBe('All done!');
  });
});
