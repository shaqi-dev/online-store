import ProductsList from './components/ProductList';
import ProductFilters from './components/ProductFilters';
import ProductCart from './components/ProductCart';
import { EventListener } from './components/ProductItem';
import './scss/style.scss';
import './index.scss';

const productCart = new ProductCart<HTMLDivElement>('.cart');

const addToCartListener: EventListener = ['click', productCart.addToCart.bind(productCart)];

const productsList = new ProductsList(productCart, [addToCartListener]);

const productFilters = new ProductFilters(productsList);

export default productCart;
