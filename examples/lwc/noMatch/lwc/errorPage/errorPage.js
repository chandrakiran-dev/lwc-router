import { LightningElement } from 'lwc';
import {getLocation} from 'c/lwcRouter';

export default class ErrorPage extends LightningElement {
    pathname;

    async connectedCallback(){
        await getLocation(this, (location) => {
            this.pathname = location.pathname;
        })
    }
}