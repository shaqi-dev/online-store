import { Product } from '../models/product';
import Component from './base-component';
import './product-item.scss';

export default class ProductItem
  extends Component<HTMLDivElement, HTMLDivElement> {
  private product: Product;

  constructor(hostElementSelector: string, product: Product) {
    super('product-item', hostElementSelector, false, product.id);
    this.product = product;

    this.renderContent();
  }

  public renderContent() {
    const image = this.element.querySelector('.product__img img') as HTMLImageElement;
    const title = this.element.querySelector('.product__title') as HTMLHeadingElement;
    const release = this.element.querySelector('.product__release') as HTMLSpanElement;
    const inStock = this.element.querySelector('.product__in-stock') as HTMLSpanElement;
    const priceEl = this.element.querySelector('.product__price') as HTMLSpanElement;
    const addToCartBtn = this.element.querySelector('.link-button--add-to-cart') as HTMLButtonElement;

    const {
      brand, model, capacity, size, color, img, releaseDate, inStockCount, price,
    } = this.product;

    image.src = img;
    title.innerText = `${brand} ${model} ${capacity ? `${capacity}GB ` : ''}${size ? `${size} ` : ''}(${color})`;
    release.innerText = `Release: ${releaseDate}`;
    inStock.innerText = `${inStockCount > 0 ? `In stock: ${inStockCount} pcs.` : 'Not in stock'}`;
    priceEl.innerText = `$${price}`;

    if (inStockCount === 0) {
      this.element.classList.add('product--not-in-stock');
      addToCartBtn.disabled = true;
    }
  }
}
