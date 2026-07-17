import { Observable, filter, map } from 'rxjs';

/**
 * A pure operator pipeline, factored out so it can be unit-tested with any source.
 * Keeps only even numbers, then squares them.
 */
export function evenSquares(source: Observable<number>): Observable<number> {
  return source.pipe(
    filter((n) => n % 2 === 0),
    map((n) => n * n),
  );
}
