import { LightningElement, api, track } from 'lwc';
import {dispatchEvent, getRouteMatch, REGISTER_ROUTER_EVENT_NAME} from 'c/lwcRouterUtil';
export default class Redirect extends LightningElement {
    @api to;
    async connectedCallback(){
        await getRouteMatch(this, ({path, url}) => {
            this.parentUrl = url;
            if(this.to.indexOf(':url') > -1){
                this.to = this.to.replace(':url', this.parentUrl);
            }
        })
        await dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this, async (routerInstance) => {
            this.routerInstance = routerInstance;
            if(this.to){
                this.routerInstance.currentPath = this.to;
            }
        })
    }
}