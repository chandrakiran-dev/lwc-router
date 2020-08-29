import Subscription from './subscription';

export default class RouterWrapper {
    constructor(currentPath){
        this._currentPath = currentPath;
        this._subscribers = [];
        this._windowPath = window.location.pathname;
    }
    get currentPath(){
        return this._currentPath;
    }
    set currentPath(value){
        if(this._windowPath == window.location.pathname){
            if(this._currentPath != value){
                let path = value
                if(path.startsWith('redirectTo:')){
                    path = path.split(':')[1];
                    this._currentPath = path
                    history.replaceState('', '', '#' + path);
                }else{
                    this._currentPath = path
                    location.hash = path;
                }
                this._subscribers.forEach(listener => {
                    listener._callback()
                })
            }
        }
        
    }
    subscribe(thisArg, callback){
        const subscriber = new Subscription(thisArg, callback, this._subscribers);
        const route = subscriber.subscribe();
        return route;
    }
}