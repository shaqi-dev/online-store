import Stateful from '../models/stateful';
import './product-cart.scss';

const initialState: string[] = [];

export default class ProductCart<T extends HTMLElement> extends Stateful<string[]> {
  private cartElement: T;

  private counterElement: HTMLDivElement;

  set state(nextState: string[]) {
    this._state = nextState;
    this.updateCounter();
  }

  get state() {
    return this._state;
  }

  constructor(cartSelector: string) {
    super(initialState);

    const cart = document.querySelector(cartSelector) as T;
    this.cartElement = cart;

    const counter = document.createElement('div');
    counter.classList.add('cart__counter');
    this.counterElement = counter;
    this.cartElement.append(counter);
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
