import axios from 'axios';
import Component from './base-component';
import ProductItem from './product-item';
import CategoryList from './category-list';
import { Product } from '../models/product';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  private productList: Product[];

  private categories: string[];

  constructor() {
    super('product-list', '.main .container', false);
    this.productList = [];
    this.categories = [];

    this.renderContent();
  }

  public async renderContent() {
    await this.getProducts();
    this.productList.forEach((product) => new ProductItem('.products', product));

    this.getCategories();
    console.log(this.categories);
    const categoryList = new CategoryList(this.categories);
  }

  private async getProducts() {
    try {
      this.productList = [...(await axios.get<Product[]>('../db/products.json')).data];
    } catch (e) {
      console.error(e);
    }
  }

  private getCategories() {
    this.productList.forEach((product) => (
      this.categories.includes(product.category)
        ? null
        : this.categories.push(product.category)
    ));
  }
}
