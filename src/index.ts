import ProductsList from './components/product-list';
import ProductFilters from './components/product-filters';
import SortFilters from './models/sort-filters';
import ProductCart from './components/product-cart';
import { EventListener } from './components/product-item';
import './scss/style.scss';
import './index.scss';

const productFilters = new ProductFilters();

// Cart
const productCart = new ProductCart<HTMLDivElement>('.cart');
function addToCartHandler(e: Event) {
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
}
const addToCartListener: EventListener = ['click', addToCartHandler];

// Product List
const productsList = new ProductsList(productFilters, [addToCartListener]);

// Category Filter
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

    productsList.useCategoryFilter();
  }
};
categories.forEach((button) => button.addEventListener('click', (e) => setActiveCategory(e.target as HTMLLIElement)));

// Sort Filter
const sortInput = document.querySelector('#sort-filter') as HTMLSelectElement;
const setSortFilter = (select: HTMLSelectElement) => {
  const { value } = select;

  console.log(value);

  productFilters.state = {
    ...productFilters.state,
    sort: value as SortFilters,
  };

  console.log(productFilters.state);

  productsList.useSortFilter();
};
sortInput.addEventListener('change', (e) => setSortFilter(e.target as HTMLSelectElement));
