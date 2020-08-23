import Subscription from './subscription';

export default class SwitchWrapper {
    constructor(currentPath){
        this._currentPath = currentPath;
        this._subscribers = [];
        this._setOfPath = new Set();
        this._currentMatcher = '';
    }
    get currentPath(){
        return this._currentPath;
    }
    set currentPath(value){
        if(this._currentMatcher){
            this._currentPath = '';
            this._currentMatcher._callback()
        }
        this._currentPath = value
        setTimeout(() => {
            for(let index = 0; index < this._subscribers.length; index++){
                const isMatching =  this._subscribers[index]._callback()
                if(isMatching){
                    this._currentMatcher = this._subscribers[index];
                    break;
                }
            }
        })
    }

    subscribe(thisArg, callback){
        if(!this._setOfPath.has(thisArg.path)){
            const subscriber = new Subscription(thisArg, callback, this._subscribers);
            const route = subscriber.subscribe();
            this._setOfPath.add(thisArg.path);
            const isMatching = callback(true);
            if(isMatching){
                this._currentMatcher = route;
            }
            return route;
        }
    }
}