# Query Parameters

LWC Router does not have any opinions about how you should parse URL query strings.

If you use simple key=value query strings and you do not need to support IE 11, you can use the browser's built-in URLSearchParams API.

If your query strings contain array or object syntax, you'll probably need to bring your own query parsing function.

```html
queryParameters.html

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav">
              <li class="slds-tabs_default__item">
                <c-link label="Netflix" to='/account?name=netflix&price=10'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Zillow Group" to='/account?name=zillow-group&price=20'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Yahoo" to='/account?name=yahoo&price=30'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Modus Create" to='/account?name=modus-create&price=40'></c-link>
              </li> 
            </ul>
            <c-switch>
                <c-route exact path="/">
                    <c-redirect to='/account?name=from-redirect'></c-redirect>
                </c-route>
                <c-route exact path="/account">
                    <div class="slds-tabs_default__content ">
                        <c-query-param-child></c-query-param-child>
                    </div>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```

Below is the child component. Here we can see how to use `getQuery`.

```js
//queryParamChild.js

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
Display the params on the screen

```html
<!--queryParamChild.html-->
<template>
    <span>Name : {name}</span><br></br>
    <span>Price : {price}</span>
</template>
```

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/queryParamDemo) to see the code on github.
