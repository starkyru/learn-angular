# Lesson 12 — Routing & guards

Client-side navigation: map URLs to components, read params, lazy-load, and protect routes
with guards.

## Concepts

- **Routes** — an array of `{ path, component }`. Register once with `provideRouter(routes)`
  in `app.config.ts`. `<router-outlet />` marks where the matched component renders;
  `routerLink` / `Router.navigate()` navigate.
- **Params & data** — read via `ActivatedRoute` (`snapshot.paramMap` or the `paramMap`
  Observable / `input()` component-input-binding). `queryParams`, `data`, and `resolve` too.
- **Lazy loading** — `{ path, loadComponent: () => import('./x').then(m => m.X) }` splits the
  bundle and loads on demand.
- **Guards (functional)** — `CanActivateFn`, `CanDeactivateFn`, `CanMatchFn`, `ResolveFn`.
  Return `true` / `false` / a `UrlTree` (redirect), or an Observable/Promise of those.
- **Functional interceptors of navigation** — `CanMatch` can even pick between routes.

## Interview Q&A

- **Q: `CanActivate` vs `CanMatch`?** `CanActivate` runs after the route matched (blocks
  activation). `CanMatch` runs *during* matching — it can skip a route entirely (and thus
  avoid loading a lazy chunk), enabling different components per condition.
- **Q: How do you redirect from a guard?** Return a `UrlTree` (`router.parseUrl('/login')`),
  not `false` — `false` just cancels navigation with no redirect.
- **Q: Functional vs class guards?** Functional guards use `inject()`, compose, and are the
  current recommendation; class-based `CanActivate` is legacy.
- **Q: What's a resolver for?** Pre-fetch data before the route activates so the component
  renders with data already present.

## Exercises

1. Add a `roleGuard` factory `(role: string): CanActivateFn` and test both branches.
2. Add a `ResolveFn<User>` that pre-loads a user and assert it via `runInInjectionContext`.
3. Wire two lazy routes with `loadComponent` and a `CanMatch` that toggles between them.

## Run

```bash
npm test -- 12-routing-guards
```
