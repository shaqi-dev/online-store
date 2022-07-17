import ProductsList from './ProductList';
import ProductFilters from './ProductFilters';
import ProductCart from './ProductCart';
import { EventListener } from './ProductItem';

export default class App {
  private productCart = new ProductCart<HTMLDivElement>('.userboard');

  private addToCartListener: EventListener = ['click', this.productCart.addToCart.bind(this.productCart)];
  
  private productsList = new ProductsList(this.productCart, [this.addToCartListener]);
  
  private productFilters = new ProductFilters(this.productsList);
  
  private resetSettingsBtn = document.querySelector('.userboard__reset-button') as HTMLButtonElement;
  
  private resetSettingsHandler = () => {
    this.productCart.resetSettings();
    this.productFilters.resetSettings();
  };

  public constructor() {
    this.resetSettingsBtn.addEventListener('click', this.resetSettingsHandler);
  }
}