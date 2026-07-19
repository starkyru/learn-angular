import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

/**
 * Exercise specs for lesson 10 — one `it` per README exercise.
 * HTTP is faked with HttpTestingController (no real network).
 * Run only these:  npm run test:exercises -- 10-http
 */
describe('Lesson 10 — exercises', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  // Exercise 1: getUsers(page) using HttpParams.
  it('exercise 1: getUsers builds a ?page= query', () => {
    const svc = service as UserService & {
      getUsers(page: number): { subscribe(fn: (v: unknown) => void): unknown };
    };
    svc.getUsers(2).subscribe(() => {}); // throws until you add getUsers()
    const req = httpMock.expectOne((r) => r.url === '/api/users');
    expect(req.request.params.get('page')).toBe('2');
    req.flush([]);
  });

  it.todo('exercise 2: add catchError mapping a 404 to null and test it');
  it.todo('exercise 3: add a logging interceptor and assert order alongside authInterceptor');
});
