import { LightningElement, api } from 'lwc';
import {registerListener, unregisterAllListeners, registerRouter, fireEvent, getRouteFromURL, setRouteToURL, initilizeRouter} from 'c/eventHandler';

export default class Router extends LightningElement {
    @api payload = {};
    @api root = '';
    @api default = '';
    connectedCallback(){
        try{
            if(!this.root){
                throw new Error(
                    'root is the mandetory attribute for the Router.'
                );
            }
            registerListener("navigateTo",this.navigateToUrl, this, this.root);
            registerListener("back",this.navigateToUrl, this, this.root);
            registerListener("refreshUrl",this.refreshUrl, this, this.root)
            initilizeRouter();
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(()=> {
                registerRouter(this.root, this.getChildRoute());
                if(parent.location.hash){
                    this.default = getRouteFromURL(this.root);
                }
                if(!this.default)
                    this.default = this.root;
                fireEvent('navigateTo', {to:this.default, payload:this.payload, doNotAddInURL: true})
            })
            
        }catch(e){
            // eslint-disable-next-line no-console
            console.error(e, e.stack)
        }
    }
    refreshUrl(detail){
        try{
            this.setCurrentPath('');
            this.navigateToUrl(detail);
        }catch(e){
            // eslint-disable-next-line no-console
            console.error(e, e.stack)
        }
    }
    navigateToUrl(detail){
        try{
            if(!detail.doNotAddInURL){
                detail.root = this.root;
                setRouteToURL(detail);
            }
            this.setPayload(detail.payload);
            this.setCurrentPath(detail.to);
        }catch(e){
            // eslint-disable-next-line no-console
            console.error(e, e.stack)
        }
    }
    
    setPayload(payload){
        const selectedEvent = new CustomEvent('payloadchange', { detail: payload });
        this.dispatchEvent(selectedEvent);
    }
    setCurrentPath(currentPath){
        const allRoutes = this.querySelectorAll("c-route");
        var path = (this.root === '/') ? currentPath : ((currentPath === this.root) ? currentPath : currentPath.replace(this.root, ''))
        allRoutes.forEach(element => {
            element.setCurrentPath(path);
        });
    }
    getChildRoute(){
        let routes = [];
        const allRoutes = this.querySelectorAll("c-route");
        allRoutes.forEach(element => {
            routes.push(element.getPath());
        });
        return routes;
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
        window.removeEventListener('popstate')
    }
}