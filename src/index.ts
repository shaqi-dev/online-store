import ProductsList from './components/product-list';
import ProductFilters from './components/product-filters';
import ProductCart from './components/product-cart';
import { EventListener } from './components/product-item';
import './scss/style.scss';
import './index.scss';

const productCart = new ProductCart<HTMLDivElement>('.cart');

const addToCartListener: EventListener = ['click', productCart.addToCart.bind(productCart)];

const productsList = new ProductsList(productCart, [addToCartListener]);

const productFilters = new ProductFilters(productsList);

export default productCart;
