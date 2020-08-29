# Default Redirection

In this example, we set the default redirection for the `/` path. If we get the `/` as the url we will redirect to the `/account/default-netflix`. Please refer below code.

```html
<!--redirectExample.js-->

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav" >
              <li class="slds-tabs_default__item">
                <c-link label="Netflix" to='/account/netflix'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Zillow Group" to='/account/zillow-group'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Yahoo" to='/account/yahoo'></c-link>
              </li>
              <li class="slds-tabs_default__item">
                <c-link label="Modus Create" to='/account/modus-create'></c-link>
              </li> 
            </ul>
            <c-switch>
                <c-route exact path="/">
                    <c-redirect to='/account/default-netflix'></c-redirect>
                </c-route>
                <c-route exact path="/account/:name">
                    <div class="slds-tabs_default__content ">
                        <c-account></c-account>
                    </div>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```

Here, we can see that using the `<c-redirect>` we are redirecting to `/account/default-netflix` whenever get the path as `/`.

There is child component called `<c-account>`. That will display the fetch the param value from the URL and display on the screen.

```js
//account.js

import { LightningElement } from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class Account extends LightningElement {
    name;

    async connectedCallback(){
        await getParam(this, (param) => {
            this.name = param.name;
        })
    }
}
```

```html
<!--account.html-->

<template>
    Account name : {name}
</template>
```