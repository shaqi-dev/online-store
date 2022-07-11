import ProductsList from './components/product-list';
import ProductFilters from './components/product-filters';
import ProductCart from './components/product-cart';
import { EventListener } from './components/product-item';
import './scss/style.scss';
import './index.scss';

const productCart = new ProductCart<HTMLDivElement>('.cart');
const addToCartHandler = (e: Event) => {
  let target = e.target as HTMLElement;

  while (!target.id) {
    target = target.parentElement as HTMLElement;
  }

  if (target.classList.contains('product--not-in-stock')) return;

  const { state } = productCart;
  const addToCartBtn = target.querySelector('.link-button--add-to-cart') as HTMLButtonElement;

  if (!state.includes(target.id)) {
    productCart.state = [...state, target.id];
    target.classList.add('product--in-cart');
    addToCartBtn.innerText = 'Remove';
  } else {
    productCart.state = state.filter((id) => id !== target.id);
    target.classList.remove('product--in-cart');
    addToCartBtn.innerText = 'Add to cart';
  }
};

const addToCartListener: EventListener = ['click', addToCartHandler];

const productsList = new ProductsList([addToCartListener]);
const productFilters = new ProductFilters();

const categories = document.querySelectorAll('.categories__item') as NodeListOf<HTMLLIElement>;

const setActiveCategory = (nextActive: HTMLLIElement) => {
  const currentActive = document.querySelector('.categories__item--active') as HTMLLIElement;
  if (currentActive !== nextActive) {
    currentActive.classList.remove('categories__item--active');
    nextActive.classList.add('categories__item--active');

    productFilters.state = {
      ...productFilters.state,
      category: nextActive.innerText.toLowerCase(),
    };
    productsList.useFilters(productFilters.state);
  }
};

categories.forEach((button) => button.addEventListener('click', (e) => setActiveCategory(e.target as HTMLLIElement)));
