import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { authInterceptor } from './auth.interceptor';
import { UserService, type User } from './user.service';

/**
 * HTTP is the external boundary, so we mock it with HttpTestingController — no real network.
 * The service and interceptor run for real; only the transport is faked.
 */
describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify()); // fails if any request went unhandled

  it('GETs a user by id and passes the interceptor header', () => {
    const expected: User = { id: 1, name: 'Ada' };
    let received: User | undefined;
    service.getUser(1).subscribe((u) => (received = u));

    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');

    req.flush(expected);
    expect(received).toEqual(expected);
  });

  it('POSTs a new user with the right body', () => {
    let received: User | undefined;
    service.createUser('Grace').subscribe((u) => (received = u));

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Grace' });

    req.flush({ id: 2, name: 'Grace' });
    expect(received).toEqual({ id: 2, name: 'Grace' });
  });

  it('surfaces server errors to the subscriber', () => {
    let status: number | undefined;
    let nextCalls = 0;
    service.getUser(99).subscribe({
      next: () => nextCalls++,
      error: (err) => (status = err.status),
    });

    httpMock.expectOne('/api/users/99').flush('nope', { status: 404, statusText: 'Not Found' });
    expect(status).toBe(404);
    expect(nextCalls).toBe(0); // error path only, no value emitted
  });
});
