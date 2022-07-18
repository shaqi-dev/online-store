export default abstract class Component<
T extends HTMLElement,
U extends HTMLElement,
> {
  private templateElement: HTMLTemplateElement;

  private hostElement: T;

  public element: U;

  constructor(
    templateId: string,
    hostElementSelector: string,
    insertAtStart: boolean,
    newElementId?: string,
  ) {
    this.templateElement = document.getElementById(
      templateId,
    ) as HTMLTemplateElement;
    this.hostElement = document.querySelector(hostElementSelector) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean): void {
    this.hostElement.insertAdjacentElement(
      insertAtBeginning ? 'afterbegin' : 'beforeend',
      this.element,
    );
  }

  protected abstract renderContent(): void;
}
