# No Match (404)

You can use the last <Route> in a <Switch> as a kind of "fallback" route, to catch 404 errors.

There are a few useful things to note about this example:

- A `<c-switch>` renders the first child <Route> that matches
- A `<c-redirect>` may be used to redirect old URLs to new ones
- A `<c-route path="*>` always matches

```html
<!--noMatch.html-->

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav">
                <li class="slds-tabs_default__item">
                    <c-link to="/" label="Home"></c-link>
                </li>
                <li class="slds-tabs_default__item">
                    <c-link to="/old-match" label="Old Match, to be redirected"></c-link>
                </li>
                <li class="slds-tabs_default__item">
                    <c-link to="/will-match" label="Will Match"></c-link>
                </li>
                <li class="slds-tabs_default__item">
                    <c-link to="/will-not-match" label="Will Not Match"></c-link>
                </li>
                <li class="slds-tabs_default__item">
                    <c-link to="/also/will/not/match" label="Also Will Not Match"></c-link>
                </li>
            </ul>

            <c-switch>
                <c-route exact path="/">
                    <div class="slds-tabs_default__content ">Home</div>
                </c-route>
                <c-route path="/old-match">
                    <c-redirect to="/will-match" ></c-redirect>
                </c-route>
                <c-route path="/will-match">
                    <div class="slds-tabs_default__content ">Will Match</div>
                </c-route>
                <c-route path="*">
                    <c-error-page></c-error-page>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```

Here is the error page example. You can use the location variable to identify the pathname.

```js
// errorPage.js

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
HTML page for the error page.

```html
<!--errorPage.html-->

<template>
    No match for : <code>{pathname}</code>
</template>
```

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/noMatch) to see the code on github.