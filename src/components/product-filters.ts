import Stateful from '../models/stateful';

export interface Filters {
  category: string;
}

const initialState: Filters = {
  category: 'all',
};

export default class ProductFilters extends Stateful<Filters> {
  public constructor() {
    super(initialState);
  }
}
