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
            const subscribers = this._subscribers[index];
            const matcher = matchPath(subscribers._thisArg.path, this._currentPath, subscribers._thisArg.exact )
            //const isMatching =  subscribers._callback()
            if(matcher.isMatching){
                if(this._currentMatcher == subscribers){
                    setTimeout(()=>{
                        subscribers._callback(matcher)
                    })
                }else{
                    subscribers._callback(matcher)
                }
                this._currentMatcher = subscribers;
                break;
            }
        }
    }
}