import { LightningElement, track } from 'lwc';
import {RouterWrapper, registerListener, REGISTER_ROUTER_EVENT_NAME} from 'c/lwcRouterUtil';

export default class Router extends LightningElement {
    @track defaultRoute = '/'
    @track routerInstance;
    async connectedCallback(){
        window.addEventListener('popstate', this.handlePopEvent.bind(this));
        registerListener(REGISTER_ROUTER_EVENT_NAME, this, this.getRouter);
        if(location.hash){
            this.defaultRoute = location.hash.substring(1)
        }else{
            this.defaultRoute = '/';
        }
        this.routerInstance = new RouterWrapper(this.defaultRoute);
    }
    handlePopEvent(){
        if(location.hash){
            this.routerInstance.currentPath = location.hash.substring(1);
        }else{
            this.routerInstance.currentPath ='/'
        }
    }
    getRouter(event){
        let callback = event.detail;
        callback(this.routerInstance);
        event.stopPropagation();
    }
}