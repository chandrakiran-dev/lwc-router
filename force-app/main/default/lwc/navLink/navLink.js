import { api } from 'lwc';
import Link from 'c/link';

export default class NavLink extends Link {
    @api activeClassName = "active";
    async connectedCallback(){
        super.connectedCallback();
    }
    get activeClass(){
        if(this.routerInstance.currentPath = this.to){
            return 'slds-m-left_x-small ' + this.activeClassName;
        }
        return 'slds-m-left_x-small'
    }
}