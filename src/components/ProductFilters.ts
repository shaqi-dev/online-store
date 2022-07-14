import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import _ from 'lodash';
import Stateful from '../models/stateful';
import { SortFilters, Filters, initialState } from '../utils/filters';
import {
  categories, brands, colors, capacities, releaseDates, quantities,
} from '../db/productsService';
import CategoryList from './CategoryList';
import CheckboxFilter from './CheckboxFilter';
import ProductsList from './ProductList';
import './ProductFilters.scss';

export default class ProductFilters extends Stateful<Filters> {
  private productsList: ProductsList;

  private categories: string[] = categories;

  private brands: string[] = brands;

  private colors: string[] = colors;

  private capacities: string[] = capacities;

  private releaseDates: string[] = releaseDates;

  private quantities: number[] = quantities;

  public constructor(productList: ProductsList) {
    super(initialState);
    this.productsList = productList;

    this.renderContent();
  }

  private renderContent() {
    this.attachCategoryFilters();
    this.attachRangeFilters();
    this.attachChekboxFilters();
    this.attachSortFilters();
    this.attachSearchFilter();
  }

  private attachRangeFilters() {
    const quantitySlider = document.getElementById('quantity-filter__slider') as noUiSlider.target;
    const releaseDateSlider = document.getElementById('release-date-filter__slider') as noUiSlider.target;
    const quantityMin = this.quantities[0];
    const quantityMax = this.quantities[this.quantities.length - 1];
    const releaseDateStart = Date.parse(this.releaseDates[0]);
    const releaseDateEnd = Date.parse(this.releaseDates[this.releaseDates.length - 1]);
    const quantityValues = [
      document.getElementById('quantity-filter__value-min'),
      document.getElementById('quantity-filter__value-max'),
    ];
    const releaseDateValues = [
      document.getElementById('release-date-filter__value-start'),
      document.getElementById('release-date-filter__value-end'),
    ];

    noUiSlider.create(quantitySlider, {
      start: [quantityMin, quantityMax],
      connect: true,
      range: { min: quantityMin, max: quantityMax },
    });

    noUiSlider.create(releaseDateSlider, {
      start: [releaseDateStart, releaseDateEnd],
      connect: true,
      range: { min: releaseDateStart, max: releaseDateEnd },
    });

    quantitySlider.noUiSlider?.on('update', (values, handle) => {
      const element = quantityValues[handle] as HTMLSpanElement;
      element.innerHTML = Math.floor(+values[handle]).toString();
    });

    quantitySlider.noUiSlider?.on('change', (values) => this.setQuantityFilter(quantityMin, quantityMax, values as [number, number]));

    releaseDateSlider.noUiSlider?.on('update', (values, handle) => {
      const element = releaseDateValues[handle] as HTMLSpanElement;
      const date = new Date(parseInt(`${values[handle]}`, 10));
      element.innerHTML = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    });

    releaseDateSlider.noUiSlider?.on('change', (values) => this.setReleaseDateFilter(releaseDateStart, releaseDateEnd, values as [number, number]));
  }

  private attachSearchFilter() {
    const input = document.getElementById('search-filter') as HTMLInputElement;
    const callback = (e: Event) => this.setSearchFilter(e);
    input.addEventListener('input', _.debounce(callback, 500));
  }

  private attachSortFilters() {
    const sortInput = document.querySelector('#sort-filter') as HTMLSelectElement;
    sortInput.addEventListener('change', (e) => this.setSortFilter(e.target as HTMLSelectElement));
  }

  private attachChekboxFilters() {
    this.brands.forEach((brand) => new CheckboxFilter('.brand-filter', brand, 'brand-filter')
      .element.addEventListener('change', this.setBrandFilter.bind(this)));
    this.colors.forEach((color) => new CheckboxFilter('.color-filter', color, 'color-filter')
      .element.addEventListener('change', this.setColorFilter.bind(this)));
    this.capacities.forEach((capacity) => new CheckboxFilter('.capacity-filter', `${capacity}GB`, 'capacity-filter')
      .element.addEventListener('change', this.setCapacityFilter.bind(this)));
    const popular = new CheckboxFilter('.other-filter', 'popular', 'popular-filter');
    popular.element.addEventListener('change', this.setPopularFilter.bind(this));
  }

  private attachCategoryFilters() {
    const categoryList = new CategoryList(this.categories);
    categoryList.elements.forEach((button) => button.addEventListener(
      'click',
      (e: Event) => this.setCategoryFilter(e.target as HTMLLIElement),
    ));
  }

  private setSearchFilter(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      this.state.search = target.value;
    } else {
      this.state.search = '';
    }

    this.productsList.useFilters(this.state);
  }

  private setReleaseDateFilter(min: number, max: number, values: [number, number]) {
    const formattedStartDate = new Date(parseInt(`${values[0]}`, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const formattedEndDate = new Date(parseInt(`${values[1]}`, 10)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    if (values[0] > min || values[1] < max) {
      this.state.releaseDate = [formattedStartDate, formattedEndDate];
    } else {
      this.state.releaseDate = [];
    }

    this.productsList.useFilters(this.state);
  }

  private setQuantityFilter(start: number, end: number, values: [number, number]) {
    const roundedMin = Math.floor(values[0]);
    const roundedMax = Math.floor(values[1]);

    if (roundedMin > start || roundedMax < end) {
      this.state.quantity = [roundedMin, roundedMax];
    } else {
      this.state.quantity = [];
    }

    this.productsList.useFilters(this.state);
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
