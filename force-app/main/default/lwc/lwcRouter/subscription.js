export default class Subscription {
    constructor(thisArg, callback, parent){
        this._thisArg = thisArg;
        this._callback = callback;
        this._parent = parent;
    }
    subscribe(){
        const thisArg = this.isDuplicate();
        if(thisArg){
            return thisArg;
        }
        this._parent.push(this);
        return this;
    }

    isDuplicate(){
        const index = this._parent.indexOf(this);
        if(index > -1){
            this._parent[index];
        }
        return undefined;
    }
    
    unsubscribe(){
        if(this._parent){
            const index = this._parent.indexOf(this);
            if(index > -1){
                this._parent.splice(index,1);
            }
        }
    }
}