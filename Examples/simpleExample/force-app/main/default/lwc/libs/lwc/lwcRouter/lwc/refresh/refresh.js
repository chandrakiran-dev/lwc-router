import { LightningElement, api } from 'lwc';
import {fireEvent} from 'c/eventHandler';

export default class Refresh extends LightningElement {
    @api root = '';
    @api payload = '';
    @api label = "";
    @api variant = "Neutral";
    @api className = "slds-m-left_x-small";

    clickEvent(){
        try {
            if(!this.root){
                throw new Error(
                    'Root attribute is mandetory for navigate'
                );
            }
            fireEvent('refreshUrl', {root:this.root, payload : this.payload});
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error, error.stack)
        }
    }
}