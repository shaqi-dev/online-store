import axios from 'axios';
import Component from './base-component';
import ProductItem from './product-item';
import { Product } from '../models/product';
import './product-list.scss';

export default class ProductsList
  extends Component<HTMLDivElement, HTMLElement> {
  productList: Product[];

  constructor() {
    super('product-list', '.main .container', true);
    this.productList = [];

    this.renderContent();
  }

  public async renderContent() {
    await this.getProducts();
    this.productList.forEach((product) => new ProductItem('.products', product));
  }

  private async getProducts() {
    try {
      this.productList = [...(await axios.get<Product[]>('../db/products.json')).data];
    } catch (e) {
      console.error(e);
    }
  }
}
