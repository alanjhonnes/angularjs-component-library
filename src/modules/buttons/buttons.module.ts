export const BUTTON_MODULE = 'sfw.button';
console.log('before');
const btnModule = angular.module(BUTTON_MODULE, ['ui.router']);
console.log('after');
btnModule.config(['$stateProvider', function($stateProvider: any) {
    const helloState = {
      name: 'hello',
      template: `<h3>hello world!</h3>
      `
    }
  
    const aboutState = {
      name: 'about',
      template: '<h3>Its the UI-Router hello world app!</h3>'
    }
  
    $stateProvider.state(helloState);
    $stateProvider.state(aboutState);
  }]);
