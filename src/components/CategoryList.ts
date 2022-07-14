import Component from './Component';
import CategoryItem from './CategoryItem';
import './CategoryList.scss';

export default class CategoryList
  extends Component<HTMLElement, HTMLUListElement> {
  private categories: string[];

  public elements: HTMLLIElement[];

  constructor(categories: string[]) {
    super('category-list', '.header .nav', true);
    this.categories = categories;
    this.elements = [];

    this.renderContent();
  }

  public renderContent() {
    if (this.categories.length > 0) {
      const all = new CategoryItem('.categories', 'all');
      all.element.classList.add('categories__item--active');
      this.elements.push(all.element);
      this.categories.forEach((category) => {
        const el = new CategoryItem('.categories', category);
        this.elements.push(el.element);
      });
    }
  }
}
