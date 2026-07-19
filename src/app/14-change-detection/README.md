# Lesson 14 — Change detection

How and when Angular syncs the DOM with your state — the topic behind most "why didn't my
view update?" bugs.

## Concepts

- **What CD does** — walks the component tree and updates bindings whose values changed.
- **When it runs**
  - **Zone.js** apps: `zone.js` monkey-patches async APIs (events, timers, XHR); after each,
    Angular runs CD from the root.
  - **Zoneless** apps (this workspace, the modern default): CD is triggered by **signal**
    changes read in templates, template **events**, `AsyncPipe` emissions, and
    `markForCheck()`. No `zone.js`.
- **`ChangeDetectionStrategy.OnPush`** — check this component only when: an input **reference**
  changes, a template event fires, a read **signal** changes, or it's explicitly marked.
- **`ChangeDetectorRef`** — `markForCheck()` (schedule this component + ancestors for the next
  cycle), `detectChanges()` (run now), `detach()`/`reattach()` (manual control).
- **Golden rule** — signals + `OnPush` = precise, automatic updates. A **plain field** mutated
  outside signals/events is invisible to CD until you `markForCheck()`.

## Interview Q&A

- **Q: What triggers CD under OnPush?** Input reference change, template event, a read signal
  changing, `AsyncPipe` emission, or `markForCheck()`.
- **Q: Why does mutating an object property not update an OnPush view?** OnPush compares input
  **references**; an in-place mutation keeps the same reference. Pass a new object, use a
  signal, or `markForCheck()`.
- **Q: Zone.js vs zoneless?** Zone.js auto-detects async to trigger CD (convenient, overhead).
  Zoneless relies on signals/events — smaller, faster, explicit; the recommended direction.
- **Q: `markForCheck` vs `detectChanges`?** `markForCheck` schedules a check for the next
  cycle (marks path to root dirty); `detectChanges` runs synchronously now.

## Exercises

1. Wrap the plain field in a `signal` and show the `markForCheck` becomes unnecessary.
2. `detach()` the change detector and prove even signal updates stop rendering until
   `reattach()`.
3. Add an `@Input()` object and demonstrate the mutate-vs-replace reference trap.

## Docs

- [Skipping component subtrees (OnPush)](https://angular.dev/best-practices/skipping-subtrees)
- [Runtime performance optimization](https://angular.dev/best-practices/runtime-performance)
- [Angular without ZoneJS (Zoneless)](https://angular.dev/guide/zoneless)

## Run

```bash
npm test -- 14-change-detection
```
