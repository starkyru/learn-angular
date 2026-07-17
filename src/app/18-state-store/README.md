# Lesson 18 — Signal stores & resources

- Keep a feature's writable state private; expose read-only signals, `computed` derivations, and
  explicit mutation methods.
- `linkedSignal()` is writable local state that resets when its source changes — ideal for a
  selected item that should default to the first available item.
- `resource()` represents async reads as signals with `value`, `status`, `error`, and cancellation.
  Use it for reads only; mutations belong in explicit methods or HTTP calls.

## Exercises

1. Add a quantity to `CartItem` and derive a quantity-aware total.
2. Render `selectedDetails.status()` in a component and add loading/error UI.
3. Replace the mock loader with a typed `HttpClient` request.
