import RouterWrapper from './routerWrapper';
import SwitchWrapper from './switchWrapper';
import {registerListener, dispatchEvent, matchPath, getParam, getRouteMatch, getQuery} from './helper';
import {REGISTER_GET_QUERY_EVENT_NAME, REGISTER_ROUTER_EVENT_NAME, REGISTER_SWITCH_EVENT_NAME, REGISTER_GET_PARAM_EVENT_NAME, REGISTER_GET_ROUTE_MATCH_EVENT_NAME} from './constants';



export {
    RouterWrapper,
    SwitchWrapper,
    registerListener,
    dispatchEvent,
    matchPath,
    getParam,
    getRouteMatch,
    getQuery,
    REGISTER_ROUTER_EVENT_NAME,
    REGISTER_SWITCH_EVENT_NAME,
    REGISTER_GET_PARAM_EVENT_NAME,
    REGISTER_GET_ROUTE_MATCH_EVENT_NAME,
    REGISTER_GET_QUERY_EVENT_NAME
}