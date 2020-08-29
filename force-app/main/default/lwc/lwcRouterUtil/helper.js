import {REGISTER_GET_PARAM_EVENT_NAME, REGISTER_GET_ROUTE_MATCH_EVENT_NAME, REGISTER_GET_QUERY_EVENT_NAME, REGISTER_GET_LOCATION_EVENT_NAME} from './constants';
import URLMatcher from './urlMatcher';

export const registerListener = (name, thisArg, callback) => {
    thisArg.template.addEventListener(name, callback.bind(thisArg));
}

export const dispatchEvent = (name, thisArg, callback) => {
    const customEvt = new CustomEvent(name, { bubbles: true, composed: true, detail : (data)=>{
        callback(data);
    }})
    if(customEvt){
        thisArg.dispatchEvent(customEvt);
    }
}
export const getParam = (thisArg, callback) => {
    const customEvt = new CustomEvent(REGISTER_GET_PARAM_EVENT_NAME, { bubbles: true, composed: true, detail : (data)=>{
        callback(data);
    }})
    if(customEvt){
        thisArg.dispatchEvent(customEvt);
    }
}
export const getQuery = (thisArg, callback) => {
    const customEvt = new CustomEvent(REGISTER_GET_QUERY_EVENT_NAME, { bubbles: true, composed: true, detail : (data)=>{
        callback(data);
    }})
    if(customEvt){
        thisArg.dispatchEvent(customEvt);
    }
}
export const getRouteMatch = (thisArg, callback) => {
    const customEvt = new CustomEvent(REGISTER_GET_ROUTE_MATCH_EVENT_NAME, { bubbles: true, composed: true, detail : (data)=>{
        callback(data);
    }})
    if(customEvt){
        thisArg.dispatchEvent(customEvt);
    }
}

export const getLocation = (thisArg, callback) => {
    const customEvt = new CustomEvent(REGISTER_GET_LOCATION_EVENT_NAME, { bubbles: true, composed: true, detail : (data)=>{
        callback(data);
    }})
    if(customEvt){
        thisArg.dispatchEvent(customEvt);
    }
}

export const matchPath = (path, uri, exact) => {
    let splittedUri = uri.split('?');
    let currentPath = splittedUri[0];
    let queryParam = {}
    if(splittedUri.length > 1){
        queryParam = getParams(splittedUri[1])
    }
    let splitPath = path.split('/');
    let splitCurrentPath = currentPath.split('/');
    if(!currentPath){
        return new URLMatcher(false);
    }
    if(path === currentPath){
        return new URLMatcher(true, path, {}, queryParam);
    }
    if(path == '*'){
        return new URLMatcher(true, currentPath, {}, queryParam);
    }
    if(exact){
        if(path.indexOf(':') != -1 && splitPath.length != splitCurrentPath.length){
            return new URLMatcher(false);
        }
    }
    if(currentPath.indexOf(path) == 0 && !exact){
        return new URLMatcher(true, path, {}, queryParam);
    }else if(path.indexOf(':') > -1){
        let isMatching = true;
        let params = {};
        let url = path;
        splitPath.forEach((value, i) => {
            if(value === splitCurrentPath[i] || (value.indexOf(':') == 0 && splitCurrentPath[i])){
                isMatching = true;
                if(value.indexOf(':') == 0){
                    params[value.substring(1)] = splitCurrentPath[i];
                    url = url.replace(value, splitCurrentPath[i])
                }
            }else {
                isMatching = false;
                return;
            }
        })
        return new URLMatcher(isMatching, url, params, queryParam);
    }else{
        return new URLMatcher(false);
    }
}

const getParams = function (url) {
	var params = {};
	var vars = url.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};