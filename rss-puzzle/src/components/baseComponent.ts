import { Props } from './types';

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  protected siblings: number = 0;

  constructor(prop: Props, ...children: (BaseComponent | HTMLElement | null)[]) {
    const node = document.createElement(prop.tag ?? 'div') as T;
    Object.assign(node, prop);
    this.node = node;
    if (children) this.appendChildren(children);
  }

  public getNode() {
    return this.node;
  }

  public checkSiblings() {
    return !!this.siblings;
  }

  private append(child: BaseComponent | HTMLElement) {
    if (child instanceof HTMLElement) this.node.append(child);
    else this.node.append(child.getNode());
  }

  public after(child: BaseComponent | HTMLElement) {
    if (child instanceof HTMLElement) this.node.after(child);
    else this.node.after(child.getNode());
    this.siblings += 1;
  }

  private appendChildren(children: (BaseComponent | HTMLElement | null)[]) {
    children.forEach((el) => {
      if (el) {
        this.append(el);
      }
    });
  }

  public removeAllChild() {
    this.children.forEach((el) => el.node.remove());
    this.children.length = 0;
  }

  public removeSiblings() {
    while (this.siblings > 0) {
      this.node.nextElementSibling?.remove();
      this.siblings -= 1;
    }
  }

  public addClass(className: string) {
    this.node.classList.add(className);
  }

  public removeClass(className: string) {
    this.node.classList.remove(className);
  }
}
export default BaseComponent;
