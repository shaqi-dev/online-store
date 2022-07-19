import Component from '../Component';
import ProductItem, { EventListener } from '../ProductItem';
import { SortFilters, Filters, INITIAL_STATE } from '../../utils/filters';
import ProductCart from '../ProductCart';
import { Product } from '../../models/product';
import PRODUCTS from '../../db/products';
import './ProductList.scss';

export default class ProductList
  extends Component<HTMLDivElement, HTMLElement> {
  private products: Product[];

  private listeners: EventListener[];

  private productCart: ProductCart<HTMLDivElement>;

  constructor(
    cart: ProductCart<HTMLDivElement>,
    listeners: EventListener[] = [],
  ) {
    super('product-list', '.main__body', false);
    this.products = PRODUCTS;
    this.productCart = cart;
    this.listeners = listeners;
    const filters: string | null = localStorage.getItem('productFilters');

    this.useFilters(filters ? JSON.parse(filters) : INITIAL_STATE);
  }

  protected renderContent(): void {
    this.element.innerHTML = '';
    if (this.products.length > 0) {
      this.products.forEach((product) => new ProductItem(
        '.products',
        product,
        this.productCart.state.includes(product.id),
        this.listeners,
      ));
    } else {
      this.element.innerHTML = '<span class="products__error-message">Sorry, no matches were found.</span>';
    }
  }

  public useFilters(filters: Filters): void {
    localStorage.setItem('productFilters', JSON.stringify(filters));

    this.useCategoryFilter(filters);
    this.useSearchFilter(filters);
    this.useCheckboxFilter(filters);
    this.useRangeFilter(filters);
    this.useSortFilter(filters);

    this.renderContent();
  }

  private useSearchFilter(filters: Filters): void {
    const searchValue: string = filters.search.toLowerCase();

    if (searchValue !== '') {
      const searchResult: Product[] = this.products.filter((product) => {
        const brand: string = product.brand.toLowerCase();
        const model: string = product.model.toLowerCase();
        const color: string = product.color.toLowerCase();
        const capacityOrSize: string = product.size
          ? product.size.toLowerCase()
          : product.capacity.toLowerCase();

        const isExist = (property: string): boolean => property.indexOf(searchValue) > -1;

        return isExist(brand)
          || isExist(model)
          || isExist(color)
          || isExist(capacityOrSize);
      });

      this.products = searchResult;
    }
  }

  private useRangeFilter(filters: Filters): void {
    const { quantity, releaseDate }: {
      quantity: [number, number] | []
      releaseDate: [string, string] | []
    } = filters;

    if (quantity.length === 2) {
      this.products = this.products.filter((product) => (
        product.inStockCount >= quantity[0] && product.inStockCount <= quantity[1]
      ));
    }

    if (releaseDate.length === 2) {
      this.products = this.products.filter((product) => {
        const productReleaseDate = Date.parse(product.releaseDate);
        const releaseDateStart = Date.parse(releaseDate[0]);
        const releaseDateEnd = Date.parse(releaseDate[1]);

        return productReleaseDate >= releaseDateStart && productReleaseDate <= releaseDateEnd;
      });
    }
  }

  private useCheckboxFilter(filters: Filters): void {
    const {
      brand, color, capacity, popular,
    }: {
      brand: string[],
      color: string[],
      capacity: string[],
      popular: boolean
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

  private useCategoryFilter(filters: Filters): void {
    const { category }: { category: string } = filters;

    if (category.toLowerCase() !== 'all') {
      this.products = PRODUCTS.filter((product) => product.category === category.toLowerCase());
    } else {
      this.products = PRODUCTS;
    }
  }

  private useSortFilter(filters: Filters): void {
    const { sort }: { sort: SortFilters } = filters;

    const sortedByName = (): Product[] => this.products.sort((a, b) => {
      const nameA: string = (`${a.brand}${a.model}${a.color}`).toLowerCase();
      const nameB: string = (`${b.brand}${b.model}${b.color}`).toLowerCase();
      return nameA.localeCompare(nameB);
    });

    const sortedByDate = (): Product[] => this.products.sort((a, b) => (
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
