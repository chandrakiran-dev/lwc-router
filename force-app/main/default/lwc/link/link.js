import { LightningElement, api, track } from 'lwc';
import { REGISTER_ROUTER_EVENT_NAME, dispatchEvent, getRouteMatch } from 'c/lwcRouterUtil';

export default class Link extends LightningElement {
    @api label;
    @api to = '*';
    @api variant = 'base';
    @api title;
    @track routerInstance;
    @track currentPath;
    @track unsubscribe;
    parentUrl
    @api
    get active() {
        return this._active;
    }
    set active(value) {
        this._active = value;
        this.toggleActiveAttribute();
    }
    async connectedCallback() {
        await getRouteMatch(this, ({ path, url }) => {
            this.parentUrl = url;
            if (this.to.indexOf(':url') > -1) {
                this.to = this.to.replace(':url', this.parentUrl);
            }
        })
        await dispatchEvent(REGISTER_ROUTER_EVENT_NAME, this, async (routerInstance) => {
            this.routerInstance = routerInstance;
            this.currentPath = this.routerInstance.currentPath;
            this.unsubscribe = this.routerInstance.subscribe(this, this.setCurrentPath.bind(this))
            this.active = this.currentPath === this.to;
        })
    }
    setCurrentPath() {
        this.currentPath = this.routerInstance.currentPath;
    }
    toggleActiveAttribute() {
        if (this.active) {
            this.setAttribute("active", "");
        } else {
            this.removeAttribute("active");
        }
    }
    handleClick(e) {
        e.stopPropagation();
        if (this.to) {
            this.routerInstance.currentPath = this.to;
            this.currentPath = this.to;
        }
    }
    disconnectedCallback() {
        if (this.unsubscribe) {
            this.unsubscribe.unsubscribe();
        }
    }
}
