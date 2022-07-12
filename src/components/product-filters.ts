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

  private capacities: string[];

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
    this.capacities = products.reduce((a: string[], c) => {
      if (!a.includes(c.capacity)) a.push(c.capacity);
      return a;
    }, []).sort((a, b) => +b - +a);

    this.renderContent();
  }

  private renderContent() {
    const categoryList = new CategoryList(this.categories);
    categoryList.elements.forEach((button) => button.addEventListener(
      'click',
      (e: Event) => this.setCategoryFilter(e.target as HTMLLIElement),
    ));

    this.brands.forEach((brand) => (new FilterCheckbox('.brand-filter', brand, 'brand-filter'))
      .element.addEventListener('change', this.setBrandFilter.bind(this)));
    this.colors.forEach((color) => new FilterCheckbox('.color-filter', color, 'color-filter')
      .element.addEventListener('change', this.setColorFilter.bind(this)));
    this.capacities.forEach((capacity) => new FilterCheckbox('.capacity-filter', `${capacity}GB`, 'capacity-filter')
      .element.addEventListener('change', this.setCapacityFilter.bind(this)));
    const popular = new FilterCheckbox('.other-filter', 'popular', 'popular-filter');
    popular.element.addEventListener('change', this.setPopularFilter.bind(this));

    const sortInput = document.querySelector('#sort-filter') as HTMLSelectElement;
    sortInput.addEventListener('change', (e) => this.setSortFilter(e.target as HTMLSelectElement));
  }

  private setPopularFilter(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    this.state.popular = checkbox.checked;

    this.productsList.useFilters(this.state);
  }

  private setBrandFilter(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const labelEl = checkbox.parentElement?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const label = labelEl.innerText.trim();

    if (checkbox.checked) {
      this.state.brand.push(label);
    } else {
      this.state.brand = this.state.brand.filter((current) => current !== label);
    }

    this.productsList.useFilters(this.state);
  }

  private setColorFilter(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const labelEl = checkbox.parentElement?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const label = labelEl.innerText.trim();

    if (checkbox.checked) {
      this.state.color.push(label);
    } else {
      this.state.color = this.state.color.filter((current) => current !== label);
    }

    this.productsList.useFilters(this.state);
  }

  private setCapacityFilter(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    const labelEl = checkbox.parentElement?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const label = labelEl.innerText.trim().slice(0, -2);

    if (checkbox.checked) {
      this.state.capacity.push(label);
    } else {
      this.state.capacity = this.state.capacity.filter((current) => current !== label);
    }

    this.productsList.useFilters(this.state);
  }

  private setSortFilter(select: HTMLSelectElement) {
    const { value } = select;

    this.state = {
      ...this.state,
      sort: value as SortFilters,
    };

    this.productsList.useFilters(this.state);
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

      this.productsList.useFilters(this.state);
    }
  }
}
