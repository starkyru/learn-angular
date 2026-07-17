import { Component, ElementRef, ViewContainerRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-dynamic-notice',
  template: `<p class="notice" role="status">Created dynamically with ViewContainerRef.</p>`,
})
export class DynamicNoticeComponent {}

/** Lesson 17 — signal queries and dynamic components. */
@Component({
  selector: 'app-view-queries',
  template: `
    <button #action type="button" (click)="toggle()" aria-controls="query-result">
      Toggle detail
    </button>
    <button type="button" (click)="focusAction()">Focus toggle</button>
    @if (open()) {
      <p id="query-result">The view query can access elements after Angular renders them.</p>
    }
    <ng-container #slot />
    <button type="button" (click)="addDynamic()">Insert dynamic notice</button>
  `,
})
export class ViewQueriesComponent {
  readonly open = signal(false);
  private readonly action = viewChild<ElementRef<HTMLButtonElement>>('action');
  private readonly slot = viewChild('slot', { read: ViewContainerRef });

  toggle(): void {
    this.open.update((open) => !open);
  }

  focusAction(): void {
    this.action()?.nativeElement.focus();
  }

  addDynamic(): void {
    this.slot()?.createComponent(DynamicNoticeComponent);
  }
}
