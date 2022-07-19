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
      const allCategories: CategoryItem = new CategoryItem('.categories', 'all');
      if (this.active === 'all') allCategories.element.classList.add('categories__item--active');
      this.elements.push(allCategories.element);

      this.categories.forEach((category) => {
        const currentCategory: CategoryItem = new CategoryItem('.categories', category);
        if (this.active === category) currentCategory.element.classList.add('categories__item--active');
        this.elements.push(currentCategory.element);
      });
    }
  }
}
