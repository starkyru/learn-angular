import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, map } from 'rxjs';

/**
 * Lesson 09 — RxJS: Observables, Subjects, operators
 *
 * RxJS models values that arrive over time (events, HTTP, timers). Angular exposes streams
 * from HttpClient, Router, reactive forms, etc.
 *
 *   Observable        — a lazy stream you `subscribe()` to (nothing runs until then).
 *   Subject           — an Observable you can also push into with `.next(v)` (multicast).
 *   BehaviorSubject   — a Subject that remembers the latest value and replays it to new
 *                       subscribers; exposes `.value`.
 *   Operators (.pipe) — pure transforms: `map`, `filter`, `debounceTime`, `switchMap`, …
 *
 * ALWAYS unsubscribe long-lived subscriptions (or use `AsyncPipe` / `takeUntilDestroyed`)
 * to avoid memory leaks — see the README.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly query$ = new BehaviorSubject<string>('');

  /** Derived, read-only stream — trimmed + lower-cased, empty strings dropped. */
  readonly terms$: Observable<string> = this.query$.pipe(
    map((q) => q.trim().toLowerCase()),
    filter((q) => q.length > 0),
  );

  setQuery(q: string): void {
    this.query$.next(q);
  }

  /** BehaviorSubject remembers the latest raw value. */
  get current(): string {
    return this.query$.value;
  }
}
