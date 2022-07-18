import Component from './Component';

export default class CheckboxFilter
  extends Component<HTMLDivElement, HTMLLabelElement> {
  private label: string;

  private checkboxId: string;

  private checked: boolean;

  constructor(
    hostElementSelector: string,
    label: string,
    filterType: string,
    checked = false,
  ) {
    super('filter-checkbox', hostElementSelector, false);
    this.label = label;
    this.checkboxId = `${filterType}-${label}`;
    this.checked = checked;

    this.renderContent();
  }

  public renderContent(): void {
    const labelEl = this.element;
    const checkbox = this.element.querySelector('.filter-checkbox__input') as HTMLInputElement;
    const textLabel = this.element.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;

    labelEl.htmlFor = this.checkboxId;
    checkbox.id = this.checkboxId;
    textLabel.innerText = this.label;

    if (this.checked) checkbox.checked = true;
  }
}
