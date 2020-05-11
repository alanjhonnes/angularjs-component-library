import { BUTTON_MODULE } from "../../buttons.module";
import './button.component.scss';


export class SafraWalletButton implements ng.IComponentController {

    static readonly $inject = [];

    text!: string;

    count = 0;

    textos = [
        '1', '2', '3', '4'
    ]

    add() {
        this.count += 1;
    }

    constructor() {
        console.log('safra wallet button initialized');
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
        `, 
    })
