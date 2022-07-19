import ProductList from '../ProductList';
import ProductFilters from '../ProductFilters';
import ProductCart from '../ProductCart';
import { EventListener } from '../ProductItem';

export default class App {
  private productCart: ProductCart<HTMLDivElement> = new ProductCart<HTMLDivElement>('.userboard');

  private addToCartListener: EventListener = ['click', this.productCart.addToCart.bind(this.productCart)];

  private productsList: ProductList = new ProductList(this.productCart, [this.addToCartListener]);

  private productFilters: ProductFilters = new ProductFilters(this.productsList);

  private resetSettingsBtn: HTMLButtonElement = document.querySelector('.userboard__reset-button') as HTMLButtonElement;

  private resetSettingsHandler = (): void => {
    this.productCart.resetSettings();
    this.productFilters.resetSettings();
  };

  constructor() {
    this.resetSettingsBtn.addEventListener('click', this.resetSettingsHandler);
  }
}
