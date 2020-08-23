import { LightningElement, api, track } from 'lwc';
import {dispatchEvent, getRouteMatch, REGISTER_ROUTER_EVENT_NAME} from 'c/lwcRouter';
export default class Link extends LightningElement {
    @api label;
    @api to;
    @api variant = 'base';
    @api title;
    @track routerInstance;
    parentUrl
    async connectedCallback(){
        await getRouteMatch(this, ({path, url}) => {
            this.parentUrl = url;
            if(this.to.indexOf(':url') > -1){
                this.to = this.to.replace(':url', this.parentUrl);
            }
        })
        await dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this, async (routerInstance) => {
            this.routerInstance = routerInstance;
        })
    }
    handleClick(){
        if(this.to){
            this.routerInstance.currentPath = this.to;
        }
    }
}