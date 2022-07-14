import Stateful from '../models/stateful';
import './ProductCart.scss';

const initialState: string[] = [];

export default class ProductCart<T extends HTMLElement> extends Stateful<string[]> {
  private cartElement: T;

  private counterElement: HTMLDivElement;

  public set state(nextState: string[]) {
    this._state = nextState;
    localStorage.setItem('productCart', JSON.stringify(nextState));
    this.updateCounter();
  }

  public get state() {
    return this._state;
  }

  public constructor(cartSelector: string) {
    const savedState = localStorage.getItem('productCart');
    super(savedState ? JSON.parse(savedState) : initialState);

    const cart = document.querySelector(cartSelector) as T;
    this.cartElement = cart;

    const counter = document.createElement('div');
    counter.classList.add('cart__counter');
    this.counterElement = counter;
    this.cartElement.append(counter);

    this.updateCounter();
  }

  public addToCart(e: Event) {
    let target = e.target as HTMLElement;

    while (!target.id) {
      target = target.parentElement as HTMLElement;
    }

    if (target.classList.contains('product--not-in-stock')) return;

    const addToCartBtn = target.querySelector('.link-button--add-to-cart') as HTMLButtonElement;

    if (!this.state.includes(target.id)) {
      this.state = [...this.state, target.id];
      target.classList.add('product--in-cart');
      addToCartBtn.innerText = 'Remove';
    } else {
      this.state = this.state.filter((id) => id !== target.id);
      target.classList.remove('product--in-cart');
      addToCartBtn.innerText = 'Add to cart';
    }
  }

  private updateCounter() {
    if (this._state.length > 0) {
      this.counterElement.innerText = `${this._state.length}`;
      this.counterElement.style.display = 'block';
    } else {
      this.counterElement.innerText = '';
      this.counterElement.style.display = 'none';
    }
  }
}
