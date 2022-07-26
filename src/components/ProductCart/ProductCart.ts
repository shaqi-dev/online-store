import Toastify from 'toastify-js';
import Stateful from '../../models/stateful';
import './ProductCart.scss';
import 'toastify-js/src/toastify.css';

const INITIAL_STATE: string[] = [];

export default class ProductCart<T extends HTMLElement> extends Stateful<string[]> {
  private cartElement: T;

  private counterElement: HTMLDivElement;

  public set state(nextState: string[]) {
    this._state = nextState;
    localStorage.setItem('productCart', JSON.stringify(nextState));
    this.updateCounter();
  }

  public get state(): string[] {
    return this._state;
  }

  constructor(cartSelector: string) {
    const savedState = localStorage.getItem('productCart');
    super(savedState ? JSON.parse(savedState) : INITIAL_STATE);

    this.cartElement = document.querySelector(cartSelector) as T;

    const counter = document.createElement('div');
    counter.classList.add('cart-counter');
    this.counterElement = counter;
    this.cartElement.append(counter);

    this.updateCounter();
  }

  public resetSettings(): void {
    this.state = [];
    this.updateCounter();
  }

  public addToCart(e: Event): void {
    let target = e.target as HTMLElement;

    while (!target.id) {
      target = target.parentElement as HTMLElement;
    }

    if (target.classList.contains('product--not-in-stock')) return;
    if (!this.state.includes(target.id) && this.checkOnMaxCount(20)) return;

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

  private checkOnMaxCount(max: number): boolean {
    if (this.state.length === max) {
      Toastify({
        text: 'Sorry, your cart is full',
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(90deg, rgba(97,57,57,1) 0%, rgba(226,65,65,1) 100%)',
          borderRadius: '9px',
        },
      }).showToast();

      return true;
    }
    return false;
  }

  private updateCounter(): void {
    if (this._state.length > 0) {
      this.counterElement.innerText = `${this._state.length}`;
      this.counterElement.style.display = 'block';
    } else {
      this.counterElement.innerText = '';
      this.counterElement.style.display = 'none';
    }
  }
}
