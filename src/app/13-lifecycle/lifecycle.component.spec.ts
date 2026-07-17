import { Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LifecycleComponent } from './lifecycle.component';

describe('LifecycleComponent', () => {
  it('runs constructor then ngOnInit (no ngOnChanges without bound inputs)', async () => {
    TestBed.configureTestingModule({ imports: [LifecycleComponent] });
    const fixture = TestBed.createComponent(LifecycleComponent);
    await fixture.whenStable();

    // Created directly, nothing binds [value], so ngOnChanges does not fire.
    expect(fixture.componentInstance.log()).toEqual(['construct', 'ngOnInit']);
  });

  it('runs ngOnChanges before ngOnInit, and again on input change, when a parent binds', async () => {
    @Component({
      imports: [LifecycleComponent],
      template: `<app-lifecycle [value]="v()" />`,
    })
    class HostComponent {
      readonly v = signal(1);
    }

    TestBed.configureTestingModule({ imports: [HostComponent] });
    const fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();

    const child = fixture.nativeElement.querySelector('.log') as HTMLElement;
    expect(child.textContent).toBe('construct,ngOnChanges,ngOnInit');

    fixture.componentInstance.v.set(2);
    await fixture.whenStable();
    expect(child.textContent).toBe('construct,ngOnChanges,ngOnInit,ngOnChanges');
  });

  it('runs ngOnDestroy and DestroyRef cleanup on destroy', async () => {
    TestBed.configureTestingModule({ imports: [LifecycleComponent] });
    const fixture = TestBed.createComponent(LifecycleComponent);
    await fixture.whenStable();
    const instance = fixture.componentInstance;

    fixture.destroy();

    expect(instance.log()).toContain('ngOnDestroy');
    expect(instance.log()).toContain('destroyRef');
  });
});
