import { LightningElement } from 'lwc';
import {getQuery} from 'c/lwcRouter';

export default class QueryParamChild extends LightningElement {
    name;
    price;
    async connectedCallback(){
        await getQuery(this, (param) => {
            this.name = param.name;
            this.price = param.price;
        })
    }
}