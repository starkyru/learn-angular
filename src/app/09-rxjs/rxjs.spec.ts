import { TestBed } from '@angular/core/testing';
import { firstValueFrom, from, of, toArray } from 'rxjs';
import { evenSquares } from './even-squares';
import { SearchService } from './search.service';

describe('evenSquares operator pipeline', () => {
  it('filters odds then squares the evens', async () => {
    const result = await firstValueFrom(evenSquares(from([1, 2, 3, 4, 5, 6])).pipe(toArray()));
    expect(result).toEqual([4, 16, 36]);
  });

  it('emits nothing when no evens are present', async () => {
    const result = await firstValueFrom(evenSquares(of(1, 3, 5)).pipe(toArray()));
    expect(result).toEqual([]);
  });
});

describe('SearchService (BehaviorSubject + operators)', () => {
  let service: SearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchService);
  });

  it('normalizes queries and drops empties on terms$', () => {
    const emitted: string[] = [];
    const sub = service.terms$.subscribe((t) => emitted.push(t));

    service.setQuery('  Hello ');
    service.setQuery('   '); // dropped by filter
    service.setQuery('WORLD');

    sub.unsubscribe();
    expect(emitted).toEqual(['hello', 'world']);
  });

  it('BehaviorSubject remembers the latest raw value', () => {
    service.setQuery('abc');
    expect(service.current).toBe('abc');
  });

  it('replays the current value to a late subscriber', () => {
    service.setQuery('late');
    const seen: string[] = [];
    const sub = service.terms$.subscribe((t) => seen.push(t));
    sub.unsubscribe();
    expect(seen).toEqual(['late']); // BehaviorSubject replay
  });
});
