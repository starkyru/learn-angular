# Lesson 17 — View queries & dynamic components

- `viewChild()` is a signal query for an element, directive, or component in this component's view.
- `contentChild()` queries projected content instead; use it in the component receiving `<ng-content>`.
- `ViewContainerRef.createComponent()` creates a component imperatively at an anchor. Clear it when
  replacing dynamic content, and prefer declarative templates unless the component is truly dynamic.

## Exercises

1. Add `contentChild()` to the card from lesson 15 and read the projected title.
2. Keep the `ComponentRef` returned from `createComponent()` and destroy it from a button.
