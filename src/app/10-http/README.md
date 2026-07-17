# Lesson 10 — HttpClient

Talking to a backend. `HttpClient` returns cold, single-emission Observables and integrates
with DI, interceptors, and typed responses.

## Concepts

- **Setup** — `provideHttpClient()` in `app.config.ts` (functional providers replaced the old
  `HttpClientModule`).
- **Requests** — `http.get<T>(url)`, `.post<T>(url, body)`, `.put`, `.patch`, `.delete`. Each
  returns `Observable<T>`; the request fires on `subscribe` (or `AsyncPipe`) and completes.
- **Options** — `{ params, headers, observe: 'response', responseType }`.
- **Interceptors** — `HttpInterceptorFn` in `withInterceptors([...])`; clone the request to
  add auth headers, log, retry, or centralize error handling.
- **Testing** — `provideHttpClientTesting()` + `HttpTestingController`: `expectOne(url)`,
  assert `req.request`, then `req.flush(body)` or `.flush(err, { status })`. `verify()` in
  `afterEach` fails on stray requests. **No real network.**

## Interview Q&A

- **Q: Why does nothing happen until `subscribe`?** `HttpClient` Observables are cold/lazy —
  each subscription triggers a fresh request. Subscribing twice = two requests (use
  `shareReplay` to cache).
- **Q: How do you add an auth token to every request?** A functional interceptor that clones
  the request with `setHeaders`.
- **Q: How do you test HTTP without a server?** `HttpTestingController` — flush canned
  responses and assert method/url/body/headers.
- **Q: Error handling?** `catchError` in the service pipe, or a global error interceptor;
  `HttpErrorResponse` carries `status`, `error`, `message`.

## Exercises

1. Add `getUsers(page)` using `HttpParams`; assert the query string in the spec.
2. Add `catchError` mapping 404 → `null` and test it.
3. Add a logging interceptor and assert order when composed with `authInterceptor`.

## Run

```bash
npm test -- 10-http
```
