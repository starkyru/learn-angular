# learn-angular

Hands-on **Angular course for interview prep**. Modern, standalone, zoneless Angular (v22),
taught as a progression of self-contained lessons. Each lesson is real Angular source plus a
**TestBed spec** that runs headless in **Jest** — no browser, no Karma, no docker.

> Focus is the framework itself: components, DI, signals, RxJS, forms, routing, testing.
> Templates are kept inline and minimal so the TypeScript is the star; styling and
> deployment are out of scope on purpose.

## Stack

| | |
| --- | --- |
| Angular | 22 — standalone components, signals, new control flow, **zoneless** |
| Language | TypeScript 6, `strict` |
| Tests | Jest 30 + `jest-preset-angular` (jsdom, headless) with `setupZonelessTestEnv` |
| Build/serve | Angular CLI (`@angular/build`) — `ng serve` / `ng build` |

## Setup

```bash
npm install
npm test              # run every lesson's specs
npm test -- 08-signals   # run one lesson (path filter)
npm run test:watch    # watch mode
npm start             # ng serve the lesson browser at http://localhost:4200
```

> Tests run with `npm test` (Jest). This workspace was converted from the CLI's default
> Vitest runner to Jest — use `npm test`, not `ng test`.

## How a lesson is structured

Every folder under `src/app/NN-topic/` contains:

- **`*.ts`** — the concept implemented in idiomatic, commented Angular (the thing to study).
- **`*.spec.ts`** — a TestBed spec that *exercises the real code* and shows how to test it.
- **`README.md`** — the concept, an **Interview Q&A** section, and **Exercises** to extend it.

Study the source, run the spec, then do the exercises (they tell you to add behaviour and a
matching assertion — the fastest way to make the concept stick).

## Curriculum

### Fundamentals
| # | Lesson | Concepts |
| --- | --- | --- |
| 01 | [components](src/app/01-components) | `@Component`, selectors, interpolation, event binding, signals, OnPush |
| 02 | [data-binding](src/app/02-data-binding) | interpolation · property · event · class/style · two-way |
| 03 | [control-flow](src/app/03-control-flow) | `@if` / `@for` (+`track`,`@empty`) / `@switch` |
| 04 | [directives](src/app/04-directives) | attribute directives, host bindings/listeners, `ElementRef` |
| 05 | [pipes](src/app/05-pipes) | custom pipes, pure vs impure, `AsyncPipe` |

### Reactivity & data
| # | Lesson | Concepts |
| --- | --- | --- |
| 06 | [services-di](src/app/06-services-di) | `@Injectable`, `inject()`, `InjectionToken`, hierarchical injectors |
| 07 | [inputs-outputs](src/app/07-inputs-outputs) | `input()` / `output()` / `model()`, two-way, required inputs |
| 08 | [signals](src/app/08-signals) | `signal` / `computed` / `effect`, tracking, zoneless CD |
| 09 | [rxjs](src/app/09-rxjs) | Observables, Subjects, operators, subscription hygiene |
| 10 | [http](src/app/10-http) | `HttpClient`, functional interceptors, `HttpTestingController` |

### Application concerns
| # | Lesson | Concepts |
| --- | --- | --- |
| 11 | [reactive-forms](src/app/11-reactive-forms) | typed `FormGroup`, validators, custom validators |
| 12 | [routing-guards](src/app/12-routing-guards) | routes, params, lazy loading, functional guards |

### Internals & testing
| # | Lesson | Concepts |
| --- | --- | --- |
| 13 | [lifecycle](src/app/13-lifecycle) | `ngOnChanges`/`ngOnInit`/`ngOnDestroy` order, `DestroyRef` |
| 14 | [change-detection](src/app/14-change-detection) | OnPush, zoneless vs zone.js, `markForCheck`, signal interplay |
| 15 | [content-projection](src/app/15-content-projection) | `<ng-content>` slots, fallback, `ng-template`/`ngTemplateOutlet` |
| 16 | [testing-patterns](src/app/16-testing-patterns) | `TestBed`, `By.css`, spies, Jest fake timers (zoneless) |
| 17 | [view-queries](src/app/17-view-queries) | `viewChild()`, `ViewContainerRef`, dynamic components |
| 18 | [state-store](src/app/18-state-store) | signal store service, `linkedSignal`, `resource()` |

### Next areas to explore

- Server rendering and hydration: browser-only APIs, `afterNextRender`, transfer state.
- Deferred templates and async UX: `@defer`, loading, error, and empty states.
- Production concerns: i18n, sanitization boundaries, accessibility automation, and route/HTTP
  integration tests.

## Status

18 lessons, 65 passing specs. Run `npm test` to verify.
