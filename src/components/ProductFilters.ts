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

  private quantitySlider: noUiSlider.target;

  private releaseDateSlider: noUiSlider.target;

  private searchInput: HTMLInputElement;

  private checkboxInputs: NodeListOf<HTMLInputElement>;

  private sortInput: HTMLSelectElement;

  public constructor(productList: ProductsList) {
    const filters = localStorage.getItem('productFilters');
    super(filters ? JSON.parse(filters) : initialState);
    this.productsList = productList;

    this.quantitySlider = document.getElementById('quantity-filter__slider') as noUiSlider.target;
    this.releaseDateSlider = document.getElementById('release-date-filter__slider') as noUiSlider.target;
    this.searchInput = document.getElementById('search-filter') as HTMLInputElement;
    this.sortInput = document.getElementById('sort-filter') as HTMLSelectElement;

    this.renderContent();

    this.checkboxInputs = document.querySelectorAll('.filter-checkbox__input') as NodeListOf<HTMLInputElement>;
  }

  public resetSettings() {
    this.state = JSON.parse(JSON.stringify(initialState));

    this.resetCheckboxFilters();
    this.resetRangeFilters();
    this.searchInput.value = '';
    this.sortInput.value = 'DEFAULT';

    this.productsList.useFilters(this.state);
  }

  private renderContent() {
    this.attachCategoryFilters();
    this.attachRangeFilters();
    this.attachChekboxFilters();
    this.attachSortFilters();
    this.attachSearchFilter();
    this.attachResetFilters();
  }

  private attachResetFilters() {
    const resetBtn = document.querySelector('.product-filters__reset-button') as HTMLButtonElement;
    resetBtn.addEventListener('click', () => this.resetFilters());
  }

  private attachRangeFilters() {
    const quantityMin = this.quantities[0];
    const quantityMax = this.quantities[this.quantities.length - 1];
    const quantityDefault = [quantityMin, quantityMax];
    const releaseDateStart = Date.parse(this.releaseDates[0]);
    const releaseDateEnd = Date.parse(this.releaseDates[this.releaseDates.length - 1]);
    const releaseDateDefault = [releaseDateStart, releaseDateEnd];
    const quantityValues = [
      document.getElementById('quantity-filter__value-min'),
      document.getElementById('quantity-filter__value-max'),
    ];
    const releaseDateValues = [
      document.getElementById('release-date-filter__value-start'),
      document.getElementById('release-date-filter__value-end'),
    ];

    noUiSlider.create(this.quantitySlider, {
      start: [quantityMin, quantityMax],
      connect: true,
      range: { min: quantityMin, max: quantityMax },
    });

    noUiSlider.create(this.releaseDateSlider, {
      start: [releaseDateStart, releaseDateEnd],
      connect: true,
      range: { min: releaseDateStart, max: releaseDateEnd },
    });

    const connectElQuantity = this.quantitySlider.querySelector('.noUi-connect') as HTMLDivElement;
    const connectElReleaseDate = this.releaseDateSlider.querySelector('.noUi-connect') as HTMLDivElement;

    if (this.state.quantity.length === 2) {
      this.quantitySlider.noUiSlider?.set([...this.state.quantity]);
    } else {
      connectElQuantity.classList.add('noUi-connect--unused');
    }

    if (this.state.releaseDate.length === 2) {
      this.releaseDateSlider.noUiSlider?.set([
        Date.parse(this.state.releaseDate[0]),
        Date.parse(this.state.releaseDate[1]),
      ]);
    } else {
      connectElReleaseDate.classList.add('noUi-connect--unused');
    }

    this.quantitySlider.noUiSlider?.on('update', (values, handle) => {
      const element = quantityValues[handle] as HTMLSpanElement;
      element.innerHTML = Math.floor(+values[handle]).toString();

      const modifiedValues = [Math.floor(+values[0]), Math.floor(+values[1])];
      if (_.isEqual(quantityDefault, modifiedValues) && !connectElQuantity.classList.contains('noUi-connect--unused')) {
        connectElQuantity.classList.add('noUi-connect--unused');
      } else if (!_.isEqual(quantityDefault, modifiedValues) && connectElQuantity.classList.contains('noUi-connect--unused')) {
        connectElQuantity.classList.remove('noUi-connect--unused');
      }
    });

    this.quantitySlider.noUiSlider?.on(
      'change',
      (values) => this.setQuantityFilter(
        quantityMin,
        quantityMax,
        values as [number, number],
      ),
    );

    this.releaseDateSlider.noUiSlider?.on('update', (values, handle) => {
      const element = releaseDateValues[handle] as HTMLSpanElement;
      const date = new Date(parseInt(`${values[handle]}`, 10));
      element.innerHTML = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      const modifiedValues = [parseInt(`${values[0]}`, 10), parseInt(`${values[1]}`, 10)];
      if (_.isEqual(releaseDateDefault, modifiedValues) && !connectElReleaseDate.classList.contains('noUi-connect--unused')) {
        connectElReleaseDate.classList.add('noUi-connect--unused');
      } else if (!_.isEqual(releaseDateDefault, modifiedValues) && connectElReleaseDate.classList.contains('noUi-connect--unused')) {
        connectElReleaseDate.classList.remove('noUi-connect--unused');
      }
    });

    this.releaseDateSlider.noUiSlider?.on(
      'change',
      (values) => this.setReleaseDateFilter(
        releaseDateStart,
        releaseDateEnd,
        values as [number, number],
      ),
    );
  }

  private attachSearchFilter() {
    if (this.state.search !== '') this.searchInput.value = this.state.search;
    const callback = (e: Event) => this.setSearchFilter(e);
    this.searchInput.addEventListener('input', _.debounce(callback, 500));
  }

  private attachSortFilters() {
    this.sortInput.value = this.state.sort;
    this.sortInput.addEventListener('change', (e: Event) => this.setSortFilter(e.target as HTMLSelectElement));
  }

  private attachChekboxFilters() {
    this.brands.forEach((brand) => new CheckboxFilter(
      '.brand-filter',
      brand,
      'brand-filter',
      this.state.brand.includes(brand),
    ).element.addEventListener('change', this.setBrandFilter.bind(this)));

    this.colors.forEach((color) => new CheckboxFilter(
      '.color-filter',
      color,
      'color-filter',
      this.state.color.includes(color),
    ).element.addEventListener('change', this.setColorFilter.bind(this)));

    this.capacities.forEach((capacity) => new CheckboxFilter(
      '.capacity-filter',
      `${capacity}GB`,
      'capacity-filter',
      this.state.capacity.includes(capacity),
    ).element.addEventListener('change', this.setCapacityFilter.bind(this)));

    (new CheckboxFilter('.other-filter', 'popular', 'popular-filter', this.state.popular)
      .element.addEventListener('change', this.setPopularFilter.bind(this)));
  }

  private attachCategoryFilters() {
    const categoryList = new CategoryList(this.categories, this.state.category);
    categoryList.elements.forEach((button) => button.addEventListener(
      'click',
      (e: Event) => this.setCategoryFilter(e.target as HTMLLIElement),
    ));
  }

  private resetFilters() {
    this.state = {
      ...JSON.parse(JSON.stringify(initialState)),
      category: this.state.category,
      sort: this.state.sort,
      search: this.state.search,
    };

    this.resetCheckboxFilters();
    this.resetRangeFilters();

    this.productsList.useFilters(this.state);
  }

  private resetRangeFilters() {
    this.quantitySlider.noUiSlider?.reset();
    this.releaseDateSlider.noUiSlider?.reset();
  }

  private resetCheckboxFilters() {
    for (let i = 0; i < this.checkboxInputs.length; i += 1) {
      this.checkboxInputs[i].checked = false;
    }
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
