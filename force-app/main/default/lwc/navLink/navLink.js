import { api } from 'lwc';
import Link from 'c/link';
import { loadStyle } from 'lightning/platformResourceLoader';

export default class NavLink extends Link {
    @api activeClassName = "active-class";
    @api styleResource;
    isResourceLoaded = false
    variantClass = {'base' : '',
        'neutral' : 'slds-button_neutral',
        'brand' : 'slds-button_brand',
        'brand-outline' : 'slds-button_outline-brand',
        'destructive' : 'slds-button_destructive',
        'destructive-text' : 'slds-button_text-destructive',
        'success' : 'slds-button_success'
    }
    async connectedCallback(){
        super.connectedCallback();
    }
    renderedCallback(){
        if(this.styleResource && !this.isResourceLoaded){
            loadStyle(this, `${this.styleResource}`)
            this.isResourceLoaded= true;
        }
    }
    get activeClass(){
        let strClass = 'slds-button ' + this.variantClass[this.variant.toLowerCase()] + ' ';
        if(this.currentPath == this.to){
            strClass += this.activeClassName;
        }
        return strClass;
    }
}