import { TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';

describe('CartComponent (signals)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [CartComponent] });
  });

  it('computed count/total derive from the source signal', async () => {
    const fixture = TestBed.createComponent(CartComponent);
    const cart = fixture.componentInstance;
    cart.add(30);
    cart.add(40);
    await fixture.whenStable();

    expect(cart.count()).toBe(2);
    expect(cart.total()).toBe(70);
    expect(fixture.nativeElement.querySelector('.total').textContent?.trim()).toBe('Total: 70');
  });

  it('computed pricey flips past the threshold', async () => {
    const fixture = TestBed.createComponent(CartComponent);
    const cart = fixture.componentInstance;
    cart.add(120);
    await fixture.whenStable();

    expect(cart.pricey()).toBe(true);
    expect(fixture.nativeElement.querySelector('.pricey').textContent?.trim()).toBe('pricey');
  });

  it('effect records total once per flush (a flush between each change)', async () => {
    const fixture = TestBed.createComponent(CartComponent);
    const cart = fixture.componentInstance;
    await fixture.whenStable(); // initial effect run -> [0]

    cart.add(10);
    await fixture.whenStable(); // -> [0, 10]
    cart.add(5);
    await fixture.whenStable(); // -> [0, 10, 15]

    expect(cart.totalHistory).toEqual([0, 10, 15]);
  });

  it('effect COALESCES: synchronous writes before one flush drop intermediates', async () => {
    const fixture = TestBed.createComponent(CartComponent);
    const cart = fixture.componentInstance;
    await fixture.whenStable(); // initial effect run -> [0]

    cart.add(10); // no flush between these two writes...
    cart.add(5);
    await fixture.whenStable(); // ...so the effect runs ONCE with the latest total

    expect(cart.totalHistory).toEqual([0, 15]); // the intermediate 10 is never recorded
  });

  it('clear() resets derived state', async () => {
    const fixture = TestBed.createComponent(CartComponent);
    const cart = fixture.componentInstance;
    cart.add(50);
    cart.clear();
    await fixture.whenStable();

    expect(cart.count()).toBe(0);
    expect(cart.total()).toBe(0);
  });
});
