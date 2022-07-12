import Component from './base-component';
import ProductItem, { EventListener } from './product-item';
import { SortFilters, Filters } from '../utils/filters';
import ProductCart from './product-cart';
import { Product } from '../models/product';
import products from '../db/products';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  private products: Product[];

  private listeners: EventListener[];

  private productCart: ProductCart<HTMLDivElement>;

  public constructor(
    cart: ProductCart<HTMLDivElement>,
    listeners: EventListener[] = [],
  ) {
    super('product-list', '.main__body', false);
    this.products = products;
    this.productCart = cart;
    this.listeners = listeners;

    this.renderContent();
  }

  public renderContent() {
    this.element.innerHTML = '';
    this.products.forEach((product) => new ProductItem(
      '.products',
      product,
      this.productCart.state.includes(product.id),
      this.listeners,
    ));
  }

  public useFilters(filters: Filters) {
    this.useCategoryFilter(filters);
    this.useCheckboxFilter(filters);
    this.useSortFilter(filters);

    this.renderContent();
  }

  private useCheckboxFilter(filters: Filters) {
    const {
      brand, color, capacity, popular,
    } = filters;

    if (brand.length > 0 || color.length > 0 || capacity.length > 0) {
      this.products = this.products.filter((product) => {
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        if (color.length > 0 && !color.includes(product.color)) return false;
        if (capacity.length > 0 && !capacity.includes(product.capacity)) return false;
        return true;
      });
    }

    if (popular) {
      this.products = this.products.filter((product) => product.popular);
    }
  }

  private useCategoryFilter(filters: Filters) {
    const { category } = filters;

    console.log(filters);

    if (category.toLowerCase() !== 'all') {
      this.products = products.filter((product) => product.category === category.toLowerCase());
    } else {
      this.products = products;
    }
  }

  private useSortFilter(filters: Filters) {
    const { sort } = filters;

    const sortedByName = () => this.products.sort((a, b) => {
      const nameA = (`${a.brand}${a.model}${a.color}`).toLowerCase();
      const nameB = (`${b.brand}${b.model}${b.color}`).toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const sortedByDate = () => this.products.sort((a, b) => (
      Date.parse(b.releaseDate) - Date.parse(a.releaseDate)
    ));

    switch (sort) {
      case SortFilters.NAME:
        this.products = sortedByName();
        break;
      case SortFilters.NAME_REVERSE:
        this.products = sortedByName().reverse();
        break;
      case SortFilters.DATE_NEW_TO_OLD:
        this.products = sortedByDate();
        break;
      case SortFilters.DATE_OLD_TO_NEW:
        this.products = sortedByDate().reverse();
        break;
      default:
        this.products = this.products.sort((a, b) => +a.id - +b.id);
    }
  }
}
