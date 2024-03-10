import { PageWrapper } from '../pages/page';
import type { BaseComponent } from '../components/baseComponent';

class App {
  constructor(
    private pageWrapper: BaseComponent,
    private root: HTMLElement
  ) {}

  public start(): void {
    this.root.append(this.pageWrapper.getNode());
  }
}

const app = new App(PageWrapper(), document.body);
app.start();
