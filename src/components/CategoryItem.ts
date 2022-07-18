import Component from './Component';
import './CategoryItem.scss';

export default class CategoryItem
  extends Component<HTMLUListElement, HTMLLIElement> {
  private category: string;

  constructor(hostElementSelector: string, category: string) {
    super('category-item', hostElementSelector, false);
    this.category = category;

    this.renderContent();
  }

  protected renderContent(): void {
    this.element.innerText = [this.category[0].toUpperCase(), this.category.slice(1)].join('');
  }
}
