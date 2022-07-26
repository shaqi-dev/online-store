import { Product } from '../../models/product';
import Component from '../Component';
import './ProductItem.scss';

export type EventListener = [string, (e: Event) => void];
export default class ProductItem
  extends Component<HTMLDivElement, HTMLDivElement> {
  private product: Product;

  private listeners: EventListener[];

  private isInCart: boolean;

  constructor(
    hostElementSelector: string,
    product: Product,
    isInCart: boolean,
    listeners: EventListener[],
  ) {
    super('product-item', hostElementSelector, false, product.id);
    this.product = product;
    this.listeners = listeners;
    this.isInCart = isInCart;

    this.renderContent();
  }

  protected renderContent(): void {
    const image = this.element.querySelector('.product__img img') as HTMLImageElement;
    const title = this.element.querySelector('.product__title') as HTMLHeadingElement;
    const release = this.element.querySelector('.product__release') as HTMLSpanElement;
    const inStock = this.element.querySelector('.product__in-stock') as HTMLSpanElement;
    const priceEl = this.element.querySelector('.product__price') as HTMLSpanElement;
    const addToCartBtn = this.element.querySelector('.link-button--add-to-cart') as HTMLButtonElement;

    const {
      brand, model, capacity, size, color, img, releaseDate, inStockCount, price,
    }: {
      id: string,
      category: string,
      brand: string,
      releaseDate: string,
      color: string,
      model: string,
      price: number,
      capacity: string,
      size?: string,
      img: string
      inStockCount: number,
      popular: boolean,
    } = this.product;

    image.src = img;
    title.innerText = `${brand} ${model} ${size ? `${size}` : `${capacity}GB`} (${color})`;
    release.innerText = `Release: ${releaseDate}`;
    inStock.innerText = `${inStockCount > 0 ? `In stock: ${inStockCount} pcs.` : 'Not in stock'}`;
    priceEl.innerText = `$${price}`;

    if (inStockCount === 0) {
      this.element.classList.add('product--not-in-stock');
      addToCartBtn.disabled = true;
    }

    if (this.isInCart) {
      this.element.classList.add('product--in-cart');
      addToCartBtn.innerText = 'Remove';
    }

    this.attachListeners();
  }

  private attachListeners(): void {
    this.listeners.forEach((listener) => this.element.addEventListener(listener[0], listener[1]));
  }
}
