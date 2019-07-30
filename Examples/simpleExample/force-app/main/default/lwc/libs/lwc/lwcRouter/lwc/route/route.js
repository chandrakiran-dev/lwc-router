import { LightningElement, api } from 'lwc';

export default class Route extends LightningElement {
    @api path='';
    @api currentPath = null;
    

    get hasCurrentPath(){
        return this.path === this.currentPath;
    }

    @api
    setCurrentPath(value){
        this.currentPath = value;
    }
    @api
    getPath(){
        return this.path;
    }
}