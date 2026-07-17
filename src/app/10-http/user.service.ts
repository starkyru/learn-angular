import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Lesson 10 — HttpClient
 *
 * `HttpClient` returns cold Observables — the request fires on `subscribe()` and completes
 * after one emission. Register it once with `provideHttpClient()` in `app.config.ts`.
 *
 * Services own the HTTP; components consume the returned Observable (usually via `AsyncPipe`).
 */
export interface User {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly base = '/api/users';

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }

  createUser(name: string): Observable<User> {
    return this.http.post<User>(this.base, { name });
  }
}
