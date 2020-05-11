import { withAngularJs } from "storybook-addon-angularjs";
import { BUTTON_MODULE } from '../../buttons.module';
import './button.component';

export default {
    title: "Default button",
    decorators: [withAngularJs(BUTTON_MODULE)],
  };
  
  export const simpleTemplate = () => `
    <sfw-button text="'Teste'"></sfw-button>
  `;


  export const simpleTemplate2 = () => `
  <sfw-button text="'Teste 2'"></sfw-button>
`;
