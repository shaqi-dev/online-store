import axios from 'axios';
import Component from './base-component';
import ProductItem from './product-item';
import CategoryList from './category-list';
import { Filters } from './product-filters';
import { Product } from '../models/product';
import products from '../db/products';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  private productList: Product[];

  private filteredList: Product[];

  private categories: string[];

  constructor() {
    super('product-list', '.main .container', false);
    this.productList = products;
    this.filteredList = [];
    this.categories = [];

    this.getCategories();
    this.renderContent();
  }

  public renderContent() {
    this.element.innerHTML = '';
    this.productList.forEach((product) => new ProductItem('.products', product));
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
