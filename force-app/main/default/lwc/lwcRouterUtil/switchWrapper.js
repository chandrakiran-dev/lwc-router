import Subscription from './subscription';
import {matchPath} from './helper';

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
            this._currentMatcher._callback(false);
        }
        this._currentPath = value;
        
        this.fireEvent()
        
    }

    subscribe(thisArg, callback){
        if(!this._setOfPath.has(thisArg.path)){
            const subscriber = new Subscription(thisArg, callback, this._subscribers);
            const route = subscriber.subscribe();
            this._setOfPath.add(thisArg.path);
            this.fireEvent();
            return route;
        }
    }
    fireEvent(){
        for(let index = 0; index < this._subscribers.length; index++){
            const subscriber = this._subscribers[index];
            const matcher = matchPath(subscriber._thisArg.path, this._currentPath, subscriber._thisArg.exact )
            if(matcher.isMatching){
                if(this._currentMatcher == subscriber){
                    setTimeout(()=>{
                        subscriber._callback(matcher)
                    })
                }else{
                    subscriber._callback(matcher)
                }
                this._currentMatcher = subscriber;
                break;
            }
        }
    }
}