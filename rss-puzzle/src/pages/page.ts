import { BaseComponent } from '../components/baseComponent';
import { loginForm } from './loginForm';

class PageWrapperComponent extends BaseComponent {
  constructor() {
    super({ className: 'page_wrapper' }, loginForm());
  }
}
export const PageWrapper = () => new PageWrapperComponent();
export default PageWrapper;
