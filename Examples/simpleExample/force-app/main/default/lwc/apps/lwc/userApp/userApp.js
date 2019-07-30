import { LightningElement, api } from 'lwc';

export default class UserApp extends LightningElement {
    @api payload = {};
    @api
    handelPayloadChange(event){
        this.payload = event.detail
    }
}