import { Props } from './types';

export class BaseComponent<T extends HTMLElement = HTMLElement> {
  protected node: T;

  protected children: BaseComponent[] = [];

  constructor(prop: Props, ...children: (BaseComponent | HTMLElement | null)[]) {
    const node = document.createElement(prop.tag ?? 'div') as T;
    Object.assign(node, prop);
    this.node = node;
    if (children) this.appendChildren(children);
  }

  public getNode() {
    return this.node;
  }

  private append(child: BaseComponent | HTMLElement) {
    if (child instanceof HTMLElement) this.node.append(child);
    else this.node.append(child.getNode());
  }

  private appendChildren(children: (BaseComponent | HTMLElement | null)[]) {
    children.forEach((el) => {
      if (el) {
        this.append(el);
      }
    });
  }
}
export default BaseComponent;
