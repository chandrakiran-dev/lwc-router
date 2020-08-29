# Hooks

LWC Router ships with a few hooks that let you access the state of the router and perform navigation from inside your components.

Below are the available hooks

- getParam
- getQuery
- getRouteMatch
- getLocation

## getParam

`getParams` returns an object of key/value pairs of URL parameters. It will accept two parameters that is `this` argument and the `callback` function.

```js
import { LightningElement } from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class UrlParameterChild extends LightningElement {
    id;

    async connectedCallback(){
        await getParam(this, (param) => {
            this.id = param.id;
        })
    }
}
```

## getQuery

`getQuery` returns an object of key/value pairs of URL query parameters. It will accept two parameters that is `this` argument and the `callback` function.

```js
import { LightningElement } from 'lwc';
import {getQuery} from 'c/lwcRouter';

export default class QueryParamChild extends LightningElement {
    name;
    price;
    async connectedCallback(){
        await getQuery(this, (param) => {
            this.name = param.name;
            this.price = param.price;
        })
    }
}
```

## getRouteMatch

The getRouteMatch hook attempts to match the current URL and return the object of kye/value pairs. This will return the `path` and `url` of the Route. You can use this if you need te route URL nad he path. This is mostly use in the nested switches.

```js
import { LightningElement } from 'lwc';
import {getRouteMatch} from 'c/lwcRouter';

export default class QueryParamChild extends LightningElement {
    routePath;
    routeUrl;
    async connectedCallback(){
        await getRouteMatch(this, ({path, url}) => {
            this.routePath = path;
            this.routeUrl = url;
        })
    }
}
```

## getLocation

The `getLocation` hook returns the location object that represents the current URL. This could be really useful e.g. in a situation where you would like to show the pathname on the error pages, as in the following example:

```js
import { LightningElement } from 'lwc';
import {getLocation} from 'c/lwcRouter';

export default class ErrorPage extends LightningElement {
    pathname;

    async connectedCallback(){
        await getLocation(this, (location) => {
            this.pathname = location.pathname;
        })
    }
}
```

