# URL Parameters

Params are placeholders in the URL that begin with a colon, like the `:id` param defined in the route in this example. A similar convention is used for matching dynamic segments in other popular web frameworks like Rails and Express.

```html
<!--urlParameters.html-->

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav">
              <li class="slds-tabs_default__item">
                <c-link label="Netflix" to='/netflix'></c-link>
              </li>
              <li class="slds-tabs_default__item" >
                <c-link label="Zillow Group" to='/zillow-group'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Yahoo" to='/yahoo'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Modus Create" to='/modus-create'></c-link>
              </li> 
              <li class="slds-tabs_default__item">
                <c-link label="Facebook" to='/social/Facebook'></c-link>
              </li>
            </ul>
            <c-switch>
                <c-route exact path="/">
                    <div class="slds-tabs_default__content ">
                      <c-url-parameter-child></c-url-parameter-child>
                    </div>
                </c-route>
                <c-route exact path="/:id">
                    <div class="slds-tabs_default__content ">
                      <c-url-parameter-child></c-url-parameter-child>
                    </div>
                </c-route>
                <c-route path="/social/:id">
                    <div class="slds-tabs_default__content ">
                      <c-url-parameter-child></c-url-parameter-child>
                    </div>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```

In the above code, you can see that using `path` as `/:id` make it URL parameter. In this case, param key will be `id`.

In the child component we will see that how to fetch URL params in the code and display in html.

```js

// urlParameterChild.js

import { LightningElement } from 'lwc';
//We need to import the getParam method from the c/lwcRouter
import {getParam} from 'c/lwcRouter';

export default class UrlParameterChild extends LightningElement {
    id;

    async connectedCallback(){
        //Call getParam method like this and get the params value in the callback.
        await getParam(this, (param) => {
            this.id = param.id;
        })
    }
}
```
Let's see how to use this value in the child html.

```html
<!--urlParameterChild.html-->

<template>
    Id: {id}
</template>
```

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/urlParameters) to see the code on github.