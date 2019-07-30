const routerEvent = [];
const roots = [];
const allRoute = [];
const rootHistory = {};
const historyPayload = {}
const globalVars = {isLoaded : false}


const registerListener = (eventName, callback, thisArg, rootArg) => {
    if (!routerEvent[eventName]) {
        routerEvent[eventName] = [];
    }

    const duplicate = routerEvent[eventName].find(listener => {
        return listener.callback === callback && listener.thisArg === thisArg;
    });

    if (!duplicate) {
        routerEvent[eventName].push({ callback, thisArg, rootArg});
    }
};

const unregisterListener = (eventName, callback, thisArg) => {
    if (routerEvent[eventName]) {
        routerEvent[eventName] = routerEvent[eventName].filter(
            listener =>
                listener.callback !== callback || listener.thisArg !== thisArg
        );
    }
};

const unregisterAllListeners = thisArg => {
    Object.keys(routerEvent).forEach(eventName => {
        routerEvent[eventName] = routerEvent[eventName].filter(
            listener => listener.thisArg !== thisArg
        );
    });
};
const backToUrl = (listeners, payload) => {
    if(rootHistory[payload.root]){
        rootHistory[payload.root].pop();
        if(rootHistory[payload.root].lenght !== 0){
            let backPayload2 = rootHistory[payload.root].pop()
            listeners.forEach(listener => {
                if(payload.root === listener.rootArg){
                    try {
                        rootHistory[payload.root].push(JSON.parse(JSON.stringify(backPayload2)))
                        listener.callback.call(listener.thisArg, backPayload2);
                    } catch (error) {
                        // fail silently
                    }
                }
            });
        }
        
    }else{
        throw new Error(
            'No root found for ' + payload.to
        );
    }
}
const refreshUrl = (listeners, payload) => {
    if(rootHistory[payload.root]){
        let latestPayload = rootHistory[payload.root][rootHistory[payload.root].length -1];
        listeners.forEach(listener => {
            if(payload.root === listener.rootArg){
                try {
                    if(payload.payload){
                        latestPayload.payload = payload.payload
                    }
                    listener.callback.call(listener.thisArg, latestPayload);
                } catch (error) {
                    // fail silently
                }
            }
        });
    }else{
        throw new Error(
            'No root found for ' + payload.to
        );
    }
}
const navigateToUrl = (listeners, payload) => {
    if(allRoute[payload.to]){
       
        const root = allRoute[payload.to];
        listeners.forEach(listener => {
            if(root === listener.rootArg){
                try {
                    rootHistory[root].push(JSON.parse(JSON.stringify(payload)))
                    listener.callback.call(listener.thisArg, payload);
                } catch (error) {
                    // fail silently
                }
            }
        });
    }else{
        throw new Error(
            'No route found for ' + payload.to
        );
    }
}

const fireEvent = (eventName, payload) => {
    try{
        if (routerEvent[eventName]) {
            const listeners = routerEvent[eventName];
            if(eventName === "navigateTo")
                navigateToUrl(listeners, payload);
            else if (eventName === "back")
                backToUrl(listeners, payload);
            else if (eventName === "refreshUrl")
                refreshUrl(listeners, payload);
        }else{
            throw new Error(
                'No event forund for ' + eventName
            );
        }
    }catch(e){
        // eslint-disable-next-line no-console
        console.error(e, e.stack)
    }
};

const registerRouter = (rootName, routes) =>{
    try{
        if(roots[rootName]){
            throw new Error(
                'Duplicate router found '+rootName+'. Please ensure that router cannot be duplicate'
            );
        }
        roots[rootName] = '';
        rootHistory[rootName] = [];
        routes.forEach(route => {
            var fullpath = (rootName === '/' ) ? route : ((rootName === route) ? rootName : rootName+route);
            if(allRoute[fullpath]){
                throw new Error(
                    'Duplicate router found '+rootName+route+'. Please ensure that router cannot be duplicate'
                );
            }
            allRoute[fullpath] = rootName;
        });
        window.onhashchange = () => {
            onhashchange();
        }
    }catch(e){
        // eslint-disable-next-line no-console
        console.error(e, e.stack)
    }
}


const setRouteToURL = (detail) => {
    let payload = JSON.parse(JSON.stringify(detail))
    location.hash = "#page="+payload.to;
    historyPayload["#page="+payload.to] = payload;
    localStorage.setItem('history', JSON.stringify(historyPayload));
}
const getRouteFromURL = (root) => {
    let toReturn = '';
    if(location.hash){
        let path = location.hash.replace("#page=", "");
        if(path && allRoute[path] && allRoute[path] === root){
            toReturn = path;
        }
    }
    return toReturn;
}

const windowPopState = () => {
    if(localStorage.getItem('history')){
        let historyPayload2 = JSON.parse(localStorage.getItem('history'));
        if(historyPayload2){
            let payload = historyPayload2[location.hash];
            if(payload){
                payload.doNotAddInURL = true;
                if(payload.to){
                    fireEvent('navigateTo', payload);
                }
            }
        }
    }
}

const initilizeRouter = () => {
    if(!globalVars.isLoaded){
        globalVars.isLoaded = true;
        window.addEventListener('popstate', windowPopState);
    }
}

export {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent,
    registerRouter,
    setRouteToURL,
    getRouteFromURL,
    initilizeRouter
};