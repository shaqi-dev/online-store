import ProductsList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import ProductCart from './components/ProductCart';
import { EventListener } from './components/ProductItem';
import './scss/style.scss';
import './index.scss';

const productCart = new ProductCart<HTMLDivElement>('.userboard');

const addToCartListener: EventListener = ['click', productCart.addToCart.bind(productCart)];

const productsList = new ProductsList(productCart, [addToCartListener]);

const productFilters = new ProductFilters(productsList);

const resetSettingsBtn = document.querySelector('.userboard__reset-button') as HTMLButtonElement;
const resetSettingsHandler = () => {
  productCart.resetSettings();
  productFilters.resetSettings();
};
resetSettingsBtn.addEventListener('click', resetSettingsHandler);

export default productCart;
