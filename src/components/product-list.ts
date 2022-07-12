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

  public useCategoryFilter(filters: Filters) {
    const { category } = filters;

    if (category.toLowerCase() !== 'all') {
      this.products = products.filter((product) => product.category === category.toLowerCase());
    } else {
      this.products = products;
    }

    this.renderContent();
  }

  public useSortFilter(filters: Filters) {
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

    this.renderContent();
  }
}
