import Stateful from '../models/stateful';
import { Product } from '../models/product';

const initialState: Product[] = [];

export default class ProductCart extends Stateful<Product[]> {
  constructor() {
    super(initialState);
  }
}
