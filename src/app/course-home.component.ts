import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

export const LESSONS = [
  ['01', 'Components', 'The standalone building block'],
  ['02', 'Data binding', 'Data into and events out of templates'],
  ['03', 'Control flow', '@if, @for, @switch, and @empty'],
  ['04', 'Directives', 'Reusable host behaviour'],
  ['05', 'Pipes', 'Display transformations'],
  ['06', 'Services & DI', 'Dependencies and injection tokens'],
  ['07', 'Inputs & outputs', 'Component contracts'],
  ['08', 'Signals', 'State, derivation, and effects'],
  ['09', 'RxJS', 'Streams and operators'],
  ['10', 'HttpClient', 'Typed requests and interceptors'],
  ['11', 'Reactive forms', 'Typed validation'],
  ['12', 'Routing & guards', 'URLs and navigation policy'],
  ['13', 'Lifecycle', 'Setup and teardown'],
  ['14', 'Change detection', 'OnPush and zoneless updates'],
  ['15', 'Content projection', 'Slots and reusable shells'],
  ['16', 'Testing patterns', 'TestBed, spies, and timers'],
  ['17', 'View queries', 'viewChild and dynamic components'],
  ['18', 'State stores', 'linkedSignal and resource'],
] as const;

@Component({
  selector: 'app-course-home',
  imports: [RouterLink],
  template: `
    <section class="intro" aria-labelledby="course-title">
      <p class="eyebrow">Angular 22 · standalone · zoneless</p>
      <h1 id="course-title">Study Angular by making each concept run.</h1>
      <p>Choose a lesson, inspect its small live example, then use its README and spec to go deeper.</p>
    </section>
    <nav class="lesson-list" aria-label="Course lessons">
      @for (lesson of lessons; track lesson[0]) {
        <a [routerLink]="['/lesson', lesson[0]]">
          <span class="lesson-number">{{ lesson[0] }}</span>
          <span><strong>{{ lesson[1] }}</strong><small>{{ lesson[2] }}</small></span>
        </a>
      }
    </nav>
  `,
})
export class CourseHomeComponent {
  readonly lessons = LESSONS;
}
