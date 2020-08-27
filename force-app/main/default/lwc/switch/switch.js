import { LightningElement, api, track } from 'lwc';
import {SwitchWrapper, registerListener, dispatchEvent, REGISTER_SWITCH_EVENT_NAME, REGISTER_ROUTER_EVENT_NAME} from 'c/lwcRouterUtil';

export default class Switch extends LightningElement {
    @track switchInstance;
    @track routerInstance;
    @track unsubscribe;
    async connectedCallback(){
        registerListener(REGISTER_SWITCH_EVENT_NAME, this, this.getSwitch);
        
        dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this,(routerInstance) => {
            this.routerInstance = routerInstance;
            this.switchInstance = new SwitchWrapper(this.routerInstance.currentPath);
            this.unsubscribe = this.routerInstance.subscribe(this,this.handleChange.bind(this))
        })
    }
    getSwitch(event){
        let callback = event.detail
        callback(this.switchInstance);
        event.stopPropagation();
    }
    handleChange(){
        this.switchInstance.currentPath = this.routerInstance.currentPath;
    }
    disconnectedCallback(){
        if(this.unsubscribe){
            this.unsubscribe.unsubscribe();
        }
    }
}