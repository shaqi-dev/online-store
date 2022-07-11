import Component from './base-component';
import ProductItem, { EventListener } from './product-item';
import CategoryList from './category-list';
import { Filters } from './product-filters';
import { Product } from '../models/product';
import products from '../db/products';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  private productList: Product[];

  private listeners: EventListener[];

  private categories: string[];

  public constructor(listeners: EventListener[] = []) {
    super('product-list', '.main .container', false);
    this.productList = products;
    this.listeners = listeners;
    this.categories = [];

    this.getCategories();
    this.renderContent();
  }

  public renderContent() {
    this.element.innerHTML = '';
    this.productList.forEach((product) => new ProductItem('.products', product, this.listeners));
  }

  public useFilters(filters: Filters) {
    const { category } = filters;

    if (category.toLowerCase() !== 'all') {
      this.productList = products.filter((product) => product.category === category.toLowerCase());
    } else {
      this.productList = products;
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
