import { LightningElement } from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class UrlParameterChild extends LightningElement {
    id;

    async connectedCallback(){
        await getParam(this, (param) => {
            this.id = param.id;
        })
    }
}