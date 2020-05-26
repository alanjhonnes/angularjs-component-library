import { BUTTON_MODULE } from "../../buttons.module";
import './button.component.scss';

console.log('before component');
export class SafraWalletButton implements ng.IComponentController {

    static readonly $inject = ['$state'];

    text!: string;

    count = 0;

    textos = [
        '1', '2', '3', '4'
    ];

    texto = {
        title: 'alan',
    };

    add() {
        this.count += 1;
    }

    onMessageReceived($event: any) {
        console.log('message received: ', $event);
    }

    constructor(public $state: any) {
        console.log('safra wallet button initialized');
    } 

    $onInit() {
        window['journey-b'].bootstrapJourneyB();
    }
}

angular.module(BUTTON_MODULE)
    .component("sfwButton", {
        bindings: {
            text: '<'
        },
        controller: SafraWalletButton, 
        // templateUrl: "./button.component.html",
        template: `
<div>
    {{$ctrl.text}} {{$ctrl.count}}

    <span ng-click="$ctrl.add()">+</span>
</div>

<div ng-repeat="texto in $ctrl.textos"> 
        {{texto}}
</div>

<a ui-sref="hello" ui-sref-active="active" ui-sref-opts="{ reload: true }">Hello</a>
<a ui-sref="about" ui-sref-active="active" ui-sref-opts="{ reload: true }">About</a>

<ui-view></ui-view>

<journey-b-element 
ng-prop-state_service="$ctrl.$state" 
ng-prop-texto="$ctrl.texto" 
ng-prop-textos="$ctrl.textos"
ng-on-message_emitted="$ctrl.onMessageReceived($event)"
></journey-b-element>
        `, 
    })
