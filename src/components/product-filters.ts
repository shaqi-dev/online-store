export interface Filters {
  category: string;
}

const initialFilters: Filters = {
  category: 'smartphone',
};

export default class ProductFilters {
  public filters: Filters;

  public set category(value: string) {
    this.filters.category = value;
  }

  public constructor(filters: Filters = initialFilters) {
    this.filters = filters;
  }
}
