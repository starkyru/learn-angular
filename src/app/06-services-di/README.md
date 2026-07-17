# Lesson 06 — Services & Dependency Injection

Move shared logic/state out of components into **services**, and let Angular's **injector**
hand them to whoever asks. DI is Angular's backbone (HttpClient, Router, forms are all DI).

## Concepts

- **`@Injectable({ providedIn: 'root' })`** — registers an app-wide singleton in the root
  injector; tree-shakable (removed if unused).
- **`inject(Dep)`** — the function form of DI. Works in constructors, field initializers,
  factories, guards, and interceptors. Preferred over constructor-parameter injection.
- **Tokens** — DI looks up by token. A class is its own token; for non-class values use
  `new InjectionToken<T>('name', { providedIn, factory })`.
- **Providers** — teach an injector how to make a token:
  `useClass`, `useValue`, `useExisting`, `useFactory` (+ `deps`).
- **Hierarchical injectors** — component-level `providers: [X]` create a *new* instance
  scoped to that component subtree (overriding the root singleton there).

## Interview Q&A

- **Q: `providedIn: 'root'` vs listing in a component's `providers`?** Root = one singleton
  for the whole app. Component `providers` = a fresh instance per component instance
  (scoped), useful for per-widget state.
- **Q: How do you inject a config object / primitive?** With an `InjectionToken` — you can't
  inject an interface (types vanish at runtime) or a bare string reliably.
- **Q: `inject()` vs constructor injection?** Same resolution; `inject()` composes better
  (usable in field initializers, functional guards/interceptors) and avoids `super()` churn
  in subclasses. Must run in an injection context.
- **Q: What's a hierarchical injector resolution order?** Element/component injectors first,
  bubbling up to the root `EnvironmentInjector`; first provider wins.

## Exercises

1. Provide `GreetingService` at a component level and prove two components get *different*
   `calls` counters.
2. Swap the service for a fake with `{ provide: GreetingService, useClass: FakeGreeting }`.
3. Add a `useFactory` provider for `GREETING_CONFIG` that depends on another token.

## Run

```bash
npm test -- 06-services-di
```
