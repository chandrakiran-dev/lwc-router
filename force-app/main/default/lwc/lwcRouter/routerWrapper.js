import Subscription from './subscription';

export default class RouterWrapper {
    constructor(currentPath){
        this._currentPath = currentPath;
        this._subscribers = [];
    }
    get currentPath(){
        return this._currentPath;
    }
    set currentPath(value){
        this._currentPath = value
        location.hash = value;
        this._subscribers.forEach(listener => {
            listener._callback()
        })
    }
    subscribe(thisArg, callback){
        const subscriber = new Subscription(thisArg, callback, this._subscribers);
        const route = subscriber.subscribe();
        return route;
    }
}