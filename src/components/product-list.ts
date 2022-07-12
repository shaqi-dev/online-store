import Component from './base-component';
import ProductItem, { EventListener } from './product-item';
import CategoryList from './category-list';
import ProductFilters from './product-filters';
import ProductCart from './product-cart';
import SortFilters from '../models/sort-filters';
import { Product } from '../models/product';
import products from '../db/products';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  private productList: Product[];

  private filters: ProductFilters;

  private listeners: EventListener[];

  private categories: string[];

  private productCart: ProductCart<HTMLDivElement>;

  public constructor(
    filters: ProductFilters,
    cart: ProductCart<HTMLDivElement>,
    listeners: EventListener[] = [],
  ) {
    super('product-list', '.main__body', false);
    this.productList = products;
    this.filters = filters;
    this.productCart = cart;
    this.listeners = listeners;
    this.categories = [];

    this.getCategories();
    this.renderContent();
  }

  public renderContent() {
    this.element.innerHTML = '';
    this.productList.forEach((product) => new ProductItem(
      '.products',
      product,
      this.productCart.state.includes(product.id),
      this.listeners,
    ));
  }

  public useCategoryFilter() {
    const { category } = this.filters.state;

    if (category.toLowerCase() !== 'all') {
      this.productList = products.filter((product) => product.category === category.toLowerCase());
    } else {
      this.productList = products;
    }

    this.useSortFilter();
    this.renderContent();
  }

  public useSortFilter() {
    const { sort } = this.filters.state;

    const sortedByName = () => this.productList.sort((a, b) => {
      const nameA = (`${a.brand}${a.model}${a.color}`).toLowerCase();
      const nameB = (`${b.brand}${b.model}${b.color}`).toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const sortedByDate = () => this.productList.sort((a, b) => (
      Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
    ));

    switch (sort) {
      case SortFilters.NAME:
        this.productList = sortedByName();
        break;
      case SortFilters.NAME_REVERSE:
        this.productList = sortedByName().reverse();
        break;
      case SortFilters.DATE_NEW_TO_OLD:
        this.productList = sortedByDate();
        break;
      case SortFilters.DATE_OLD_TO_NEW:
        this.productList = sortedByDate().reverse();
        break;
      default:
        this.productList = this.productList.sort((a, b) => +a.id - +b.id);
    }

    this.renderContent();
  }

  private getCategories() {
    this.productList.forEach((product) => (
      this.categories.includes(product.category)
        ? null
        : this.categories.push(product.category)
    ));

    const categoryList = new CategoryList(this.categories);
  }
}
