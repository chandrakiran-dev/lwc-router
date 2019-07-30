import { LightningElement, api } from 'lwc';
import {fireEvent} from 'c/eventHandler';

export default class Back extends LightningElement {
    @api root = '';
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
            fireEvent('back', {root:this.root});
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error, error.stack)
        }
    }
}