import { TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

/**
 * Exercise specs for lesson 03 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 03-control-flow
 */
describe('Lesson 03 — exercises', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [TodoListComponent] });
  });

  // Exercise 1: render `$index + 1` before each todo title.
  it('exercise 1: each row is prefixed with its 1-based number', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.componentInstance.add('Buy milk');
    fixture.componentInstance.add('Walk dog');
    await fixture.whenStable();
    const rows = fixture.nativeElement.querySelectorAll('li');
    expect(rows[0].textContent?.trim().startsWith('1')).toBe(true);
    expect(rows[1].textContent?.trim().startsWith('2')).toBe(true);
  });

  // Exercise 2: append ✓ to done items via @if (todo.done).
  it('exercise 2: done rows show a ✓ marker', async () => {
    const fixture = TestBed.createComponent(TodoListComponent);
    fixture.componentInstance.add('Buy milk');
    await fixture.whenStable();
    const id = fixture.componentInstance.todos()[0].id;
    fixture.componentInstance.toggle(id);
    await fixture.whenStable();
    const row = fixture.nativeElement.querySelector('li') as HTMLElement;
    expect(row.textContent).toContain('✓');
  });

  // Exercise 3: swap `track todo.id` for `track $index` and reason about identity.
  it.todo('exercise 3: compare track todo.id vs track $index when prepending items');
});
