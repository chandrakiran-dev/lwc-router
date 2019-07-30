import { LightningElement, api } from 'lwc';
import {fireEvent} from 'c/eventHandler';

export default class Link extends LightningElement {
    @api to = ''
    @api payload = {data : "test"};
    @api label = "";
    @api variant = "Neutral";
    @api className = "";

    clickEvent(event){
        event.preventDefault();
        try {
            if(!this.to){
                throw new Error(
                    'To attribute is mandetory for navigate'
                );
            }
            fireEvent('navigateTo', {to:this.to, payload:this.payload});
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error, error.stack)
        }
        event.stopPropagation();
    }
    get isLink(){
        return this.variant === 'link';
    }
}