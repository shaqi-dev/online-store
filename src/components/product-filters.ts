import Stateful from '../models/stateful';
import SortFilters from '../models/sort-filters';

export interface Filters {
  category: string;
  sort: SortFilters;
}

const initialState: Filters = {
  category: 'all',
  sort: SortFilters.DEFAULT,
};

export default class ProductFilters extends Stateful<Filters> {
  public constructor() {
    super(initialState);
  }
}
