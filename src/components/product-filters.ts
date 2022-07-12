import Stateful from '../models/stateful';
import { SortFilters, Filters, initialState } from '../utils/filters';
import products from '../db/products';
import CategoryList from './category-list';
import FilterCheckbox from './filter-checkbox';
import ProductsList from './product-list';
import './product-filters.scss';

export default class ProductFilters extends Stateful<Filters> {
  private productsList: ProductsList;

  private categories: string[];

  private brands: string[];

  private colors: string[];

  private capacities: number[];

  public constructor(productList: ProductsList) {
    super(initialState);
    this.productsList = productList;

    this.categories = products.reduce((a: string[], c) => {
      if (!a.includes(c.category)) a.push(c.category);
      return a;
    }, []);
    this.brands = products.reduce((a: string[], c) => {
      if (!a.includes(c.brand)) a.push(c.brand);
      return a;
    }, []).sort((a, b) => a.localeCompare(b));
    this.colors = products.reduce((a: string[], c) => {
      if (!a.includes(c.color)) a.push(c.color);
      return a;
    }, []).sort((a, b) => a.localeCompare(b));
    this.capacities = products.reduce((a: number[], c) => {
      if (!a.includes(c.capacity)) a.push(c.capacity);
      return a;
    }, []).sort((a, b) => b - a);

    this.renderContent();
  }

  private renderContent() {
    const categoryList = new CategoryList(this.categories);
    categoryList.elements.forEach((button) => button.addEventListener(
      'click',
      (e: Event) => this.setCategoryFilter(e.target as HTMLLIElement),
    ));

    this.brands.forEach((brand) => new FilterCheckbox('.brand-filter', brand, 'brand-filter'));
    this.colors.forEach((color) => new FilterCheckbox('.color-filter', color, 'color-filter'));
    this.capacities.forEach((capacity) => new FilterCheckbox('.capacity-filter', `${capacity}GB`, 'capacity-filter'));

    const sortInput = document.querySelector('#sort-filter') as HTMLSelectElement;
    sortInput.addEventListener('change', (e) => this.setSortFilter(e.target as HTMLSelectElement));
  }

  private setCategoryFilter(nextActive: HTMLLIElement) {
    const currentActive = document.querySelector('.categories__item--active') as HTMLLIElement;
    if (currentActive !== nextActive) {
      currentActive.classList.remove('categories__item--active');
      nextActive.classList.add('categories__item--active');

      this.state = {
        ...this.state,
        category: nextActive.innerText.toLowerCase(),
      };

      this.productsList.useCategoryFilter(this.state);
    }
  }

  private setSortFilter(select: HTMLSelectElement) {
    const { value } = select;

    this.state = {
      ...this.state,
      sort: value as SortFilters,
    };

    this.productsList.useSortFilter(this.state);
  }
}
