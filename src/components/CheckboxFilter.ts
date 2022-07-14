import Component from './Component';

export default class CheckboxFilter
  extends Component<HTMLDivElement, HTMLLabelElement> {
  private label: string;

  private checkboxId: string;

  constructor(hostElementSelector: string, label: string, filterType: string) {
    super('filter-checkbox', hostElementSelector, false);
    this.label = label;
    this.checkboxId = `${filterType}-${label}`;

    this.renderContent();
  }

  public renderContent() {
    const labelEl = this.element;
    const checkbox = this.element.querySelector('.filter-checkbox__input') as HTMLInputElement;
    const textLabel = this.element.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;

    labelEl.htmlFor = this.checkboxId;
    checkbox.id = this.checkboxId;
    textLabel.innerText = this.label;
  }
}
