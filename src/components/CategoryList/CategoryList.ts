import Component from '../Component';
import CategoryItem from '../CategoryItem';
import './CategoryList.scss';

export default class CategoryList
  extends Component<HTMLElement, HTMLUListElement> {
  private categories: string[];

  private active: string;

  public elements: HTMLLIElement[];

  constructor(categories: string[], active = 'all') {
    super('category-list', '.header .nav', true);
    this.categories = categories;
    this.active = active;
    this.elements = [];

    this.renderContent();
  }

  protected renderContent(): void {
    if (this.categories.length > 0) {
      const all = new CategoryItem('.categories', 'all');
      if (this.active === 'all') all.element.classList.add('categories__item--active');
      this.elements.push(all.element);

      this.categories.forEach((category) => {
        const el = new CategoryItem('.categories', category);
        if (this.active === category) el.element.classList.add('categories__item--active');
        this.elements.push(el.element);
      });
    }
  }
}
