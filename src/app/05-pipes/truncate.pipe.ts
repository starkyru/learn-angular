import { Pipe, PipeTransform } from '@angular/core';

/**
 * Lesson 05 — Pipes
 *
 * A pipe transforms a value for display: `{{ value | truncate:20 }}`. It is a class with
 * a `transform(value, ...args)` method and a `@Pipe({ name })` decorator.
 *
 * PURE (default): `transform` re-runs only when the input *reference* or an argument
 * changes — memoised, cheap, no side effects. IMPURE (`pure: false`): re-runs on every
 * change-detection tick — powerful but a perf footgun (that's why `async` is a special
 * built-in impure pipe rather than something you write casually).
 *
 * Because a pipe is a pure function, `transform` is trivially unit-testable on its own.
 */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit = 10, trail = '…'): string {
    if (value.length <= limit) return value;
    return value.slice(0, limit).trimEnd() + trail;
  }
}
