import ProductsList from './components/product-list';
import ProductFilters from './components/product-filters';
import './scss/style.scss';
import './index.scss';

const productsList = new ProductsList();
const productFilters = new ProductFilters();
const categories = document.querySelectorAll('.categories__item') as NodeListOf<HTMLLIElement>;

const setActiveCategory = (nextActive: HTMLLIElement) => {
  const currentActive = document.querySelector('.categories__item--active') as HTMLLIElement;
  if (currentActive !== nextActive) {
    currentActive.classList.remove('categories__item--active');
    nextActive.classList.add('categories__item--active');

    productFilters.category = nextActive.innerText.toLowerCase();
    productsList.useFilters(productFilters.filters);
  }
};

categories.forEach((button) => button.addEventListener('click', (e) => setActiveCategory(e.target as HTMLLIElement)));
