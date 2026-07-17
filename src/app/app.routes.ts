import { Routes } from '@angular/router';
import { CourseHomeComponent } from './course-home.component';
import { LessonPageComponent } from './lesson-page.component';

export const routes: Routes = [
  { path: '', component: CourseHomeComponent, title: 'Learn Angular' },
  { path: 'lesson/:id', component: LessonPageComponent, title: 'Angular lesson' },
  { path: '**', redirectTo: '' },
];
