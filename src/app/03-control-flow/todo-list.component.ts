import { Component, signal } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

/**
 * Lesson 03 — Built-in control flow (`@if` / `@for` / `@switch`)
 *
 * Angular v17+ replaced the structural directives `*ngIf` / `*ngFor` / `[ngSwitch]`
 * with block syntax baked into the template compiler. It is faster, type-checked,
 * and needs no imports (`CommonModule` is not required for control flow anymore).
 *
 * Key details interviewers probe:
 *   - `@for` REQUIRES a `track` expression (identity for efficient DOM diffing).
 *   - `@for` supports `@empty { }` for the zero-items case.
 *   - `@if` supports `@else if` / `@else`.
 */
@Component({
  selector: 'app-todo-list',
  template: `
    @if (todos().length > 0) {
      <ul>
        @for (todo of todos(); track todo.id) {
          <li [class.done]="todo.done">{{ todo.title }}</li>
        } @empty {
          <li class="empty">nothing here</li>
        }
      </ul>
    } @else {
      <p class="empty">Nothing to do 🎉</p>
    }

    <p class="summary">
      @switch (status()) {
        @case ('all-done') { All done! }
        @case ('in-progress') { {{ remaining() }} left }
        @default { Add your first todo }
      }
    </p>
  `,
})
export class TodoListComponent {
  readonly todos = signal<Todo[]>([]);

  remaining(): number {
    return this.todos().filter((t) => !t.done).length;
  }

  status(): 'empty' | 'all-done' | 'in-progress' {
    const list = this.todos();
    if (list.length === 0) return 'empty';
    return this.remaining() === 0 ? 'all-done' : 'in-progress';
  }

  add(title: string): void {
    this.todos.update((list) => [...list, { id: list.length + 1, title, done: false }]);
  }

  toggle(id: number): void {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
}
