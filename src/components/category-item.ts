import Component from './base-component';
// import './product-item.scss';

export default class CategoryItem
  extends Component<HTMLUListElement, HTMLLIElement> {
  private category: string;

  constructor(hostElementSelector: string, category: string) {
    super('category-item', hostElementSelector, false);
    this.category = category;
    console.log(this.category);

    this.renderContent();
  }

  public renderContent() {
    this.element.innerText = [this.category[0].toUpperCase(), this.category.slice(1)].join('');
  }
}
