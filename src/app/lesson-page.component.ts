import { NgComponentOutlet } from '@angular/common';
import { Component, Type, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { CartComponent } from './08-signals/cart.component';
import { SignupComponent } from './11-reactive-forms/signup.component';
import { LifecycleComponent } from './13-lifecycle/lifecycle.component';
import { CdDemoComponent } from './14-change-detection/cd-demo.component';
import { CardComponent } from './15-content-projection/card.component';
import { ViewQueriesComponent } from './17-view-queries/view-queries.component';
import { CounterComponent } from './02-data-binding/counter.component';
import { TodoListComponent } from './03-control-flow/todo-list.component';
import { HelloComponent } from './01-components/hello.component';
import { LESSONS } from './course-home.component';

const DEMOS: Record<number, Type<unknown>> = {
  1: HelloComponent,
  2: CounterComponent,
  3: TodoListComponent,
  8: CartComponent,
  11: SignupComponent,
  13: LifecycleComponent,
  14: CdDemoComponent,
  15: CardComponent,
  17: ViewQueriesComponent,
};

@Component({
  selector: 'app-lesson-page',
  imports: [NgComponentOutlet, RouterLink],
  template: `
    <a class="back" routerLink="/">← All lessons</a>
    <main aria-labelledby="lesson-title">
      <p class="eyebrow">Lesson {{ number() }}</p>
      <h1 id="lesson-title">{{ lesson()?.[1] ?? 'Lesson not found' }}</h1>
      <p>{{ lesson()?.[2] }}</p>
      @if (demo(); as component) {
        <section class="demo" aria-label="Live example">
          <h2>Live example</h2>
          <ng-container *ngComponentOutlet="component" />
        </section>
      } @else {
        <section class="demo">
          <h2>Study source</h2>
          <p>This lesson is service or API focused. Read its source, spec, and README in the repository.</p>
        </section>
      }
    </main>
  `,
})
export class LessonPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly number = toSignal(this.route.paramMap.pipe(map((params) => Number(params.get('id')))), {
    initialValue: 1,
  });
  readonly lesson = computed(() => LESSONS.find(([id]) => Number(id) === this.number()));
  readonly demo = computed(() => DEMOS[this.number()] ?? null);
}
