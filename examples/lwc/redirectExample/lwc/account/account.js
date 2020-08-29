import { LightningElement } from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class Account extends LightningElement {
    name;

    async connectedCallback(){
        await getParam(this, (param) => {
            this.name = param.name;
        })
    }
}