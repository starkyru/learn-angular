import { TestBed } from '@angular/core/testing';
import { firstValueFrom, of, toArray } from 'rxjs';
import { evenSquares } from './even-squares';
import { SearchService } from './search.service';

/**
 * Exercise specs for lesson 09 — one `it` per README exercise.
 * RED until you implement the exercise, GREEN once done.
 * Run only these:  npm run test:exercises -- 09-rxjs
 */
describe('Lesson 09 — exercises', () => {
  // Regression guard for the pure operator pipeline.
  it('evenSquares keeps and squares only the evens', async () => {
    const out = await firstValueFrom(evenSquares(of(1, 2, 3, 4)).pipe(toArray()));
    expect(out).toEqual([4, 16]);
  });

  // Exercise 1: debounceTime(300) + distinctUntilChanged() on terms$.
  it('exercise 1: terms$ debounces and de-dupes rapid input', () => {
    jest.useFakeTimers();
    try {
      const service = TestBed.inject(SearchService);
      const emitted: string[] = [];
      const sub = service.terms$.subscribe((t) => emitted.push(t));

      service.setQuery('a');
      service.setQuery('ab');
      service.setQuery('ab'); // duplicate — distinctUntilChanged should drop it
      jest.advanceTimersByTime(300);
      sub.unsubscribe();

      expect(emitted).toEqual(['ab']); // one value, the last, after the pause
    } finally {
      jest.useRealTimers();
    }
  });

  it.todo('exercise 2: add results$ that switchMaps a term into a fake async lookup');
  it.todo('exercise 3: bridge terms$ to a signal with toSignal and read it synchronously');
});
