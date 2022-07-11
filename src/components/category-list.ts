import Component from './base-component';
import CategoryItem from './category-item';
import './category-list.scss';

export default class CategoryList
  extends Component<HTMLElement, HTMLUListElement> {
  private categories: string[];

  constructor(categories: string[]) {
    super('category-list', '.header .nav', true);
    this.categories = categories;

    this.renderContent();
  }

  public renderContent() {
    if (this.categories.length > 0) {
      const all = new CategoryItem('.categories', 'all');
      all.element.classList.add('categories__item--active');
      this.categories.forEach((category) => new CategoryItem('.categories', category));
    }
  }
}
