# Nesting

Since routes are regular LWC components, they may be rendered anywhere in the app, including in child elements.

This helps when it's time to code-split your app into multiple bundles because code-splitting a LWC Router app is the same as code-splitting any other LWC app.

```html
<!--nesting.html-->

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav" role="tablist">
              <li class="slds-tabs_default__item" title="Home" role="presentation">
                <c-link label="Home" to='/'></c-link>
              </li>
              <li class="slds-tabs_default__item" title="Topics" role="presentation">
                <c-link label="Topics" to='/topics'></c-link>
              </li>
            </ul>
            <c-switch>
                <c-route exact path="/">
                    <div class="slds-tabs_default__content ">Home</div>
                </c-route>
                <c-route path="/topics">
                    <div class="slds-tabs_default__content "><c-topics></c-topics></div>
                </c-route>
                <c-route path="*">
                    <div class="slds-tabs_default__content ">Url not found</div>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```
Child component that have nested Switch.

```html
<!--topics.html-->

<template>
    <h2>Topics</h2>
    <ul>
        <li>
            <!--Child link To have to start with :url-->
            <c-link to=":url/rendering" label="Rendering with LWC"></c-link>
        </li>
        <li>
            <c-link to=":url/components" label="Components"></c-link>
        </li>
        <li>
            <c-link to=":url/props-v-state" label="Props v. State"></c-link>
        </li>
    </ul>

    <c-switch>
        <!--Child path have to start with :path-->
        <c-route exact path=":path">
          <h3>Please select a topic.</h3>
        </c-route>
        <c-route path=":path/:topicId">
          <c-topic></c-topic>
        </c-route>
    </c-switch>
</template>
```
The `<c-route>` that rendered this component has a path of `/topics/:topicId`. The `:topicId` portion of the URL indicates a placeholder that we can get from `getParams()`.

```js
//topic.js
import { LightningElement} from 'lwc';
import {getParam} from 'c/lwcRouter';

export default class Topic extends LightningElement {
    topicId;
    async connectedCallback(){
        await getParam(this, (param) => {
            this.topicId = param.topicId;
        })
    }
}
```

```html
<template>
    <h3>id = {topicId}</h3>
</template>
```

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/nesting) to see the code on github.

