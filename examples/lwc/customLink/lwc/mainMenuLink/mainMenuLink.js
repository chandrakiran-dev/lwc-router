import { api } from 'lwc';
import {Link} from 'c/lwcRouter';

export default class MainMenuLink extends Link {
    @api path;
    @api label;

    connectedCallback(){
        //Call the connectedCallback method of the parent class.
        super.connectedCallback();

        //Set parent "to" variable using this.path
        this.to = this.path;
    }
    /**
     * This component extending Link component.
     * If you want to define custom logic then you can create new click handler method
     * Otherwise, no need to write handler method.
     * You can directly use {handleClick} in the html file
     */
    handleClick(){
        super.handleClick();
        //Some custom logic if you needed.
    }

    get activeClass(){
        let strClass = 'slds-button';

        // this.currentPath variable is the Link class property. 
        // You can use this variable to match with your path. 
        if(this.currentPath == this.path){
            strClass += ' active-class';
        }
        return strClass;
    }
}