# Custom Link

This example show how you could create a custom `<c-link>` that renders something special when the URL is the same as the one the <c-link> points to.

`<c-link>` is the standard component but but you some custom logic whenever you click on the link like highlight the link ect. You can use below approach.

```html
<!--customLink.html-->

<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav" role="tablist">
              <li class="slds-tabs_default__item" title="Item One" role="presentation">
                <c-main-menu-link label="item one" path="/"></c-main-menu-link>
              </li>
              <li class="slds-tabs_default__item" title="Item Two" role="presentation">
                <c-main-menu-link label="item two" path="/item-two"></c-main-menu-link>
              </li>
              <li class="slds-tabs_default__item" title="Item Three" role="presentation">
                <c-main-menu-link label="item Three" path="/item-three"></c-main-menu-link>
              </li>
            </ul>
            <c-switch>
                <c-route exact path="/">
                    <div class="slds-tabs_default__content ">Item One Content</div>
                </c-route>
                <c-route path="/item-two">
                    <div class="slds-tabs_default__content ">Item Two Content</div>
                </c-route>
                <c-route path="/item-three">
                    <div class="slds-tabs_default__content ">Item Three Content</div>
                </c-route>
            </c-switch>
        </div>
    </c-router>
</template>
```

In the above html, we can see that instead of using `<c-link>` we have created our own component called `<c-main-menu-link>`. Now let's create the `main-menu-link` component.

```js
// mainMenuLink.js

import { api } from 'lwc';
import {Link} from 'c/lwcRouter';

export default class MainMenuLink extends Link {
    @api path;
    @api label;

    connectedCallback(){
        //Call the connectedCallback method of the parent class.
        super.connectedCallback();

        //Set parent "to" variable using this.path
        this.to = this.path;
    }
    /**
     * This component extending Link component.
     * If you want to define custom logic then you can create new click handler method
     * Otherwise, no need to write handler method.
     * You can directly use {handleClick} in the html file
     */
    handleClick(){
        super.handleClick();
        //Some custom logic if you needed.
    }

    get activeClass(){
        let strClass = 'slds-button';

        // this.currentPath variable is the Link class property. 
        // You can use this variable to match with your path. 
        if(this.currentPath == this.path){
            strClass += ' active-class';
        }
        return strClass;
    }
}
```
Instead of extending the `LightningElement` this component have to extend `Link`. Here, we have imported the `Link` component form `'c/lwcRouter'`.

By extending `Link`, you will get three default thing that you need to do.

1. `connectedCallback` : In the connectedCallback, you have to call the `super.connectedCallback()` at very first line of the method. After that, you need to set the parent `this.to` property with your custom path.

```js
connectedCallback(){
    //Call the connectedCallback method of the parent class.
    super.connectedCallback();

    //Set parent "to" variable using this.path
    this.to = this.path;
}
```

2. `this.currentPath` : Here, we are adding active class `active-class` if the `this.currentPath == this.path`

```js
get activeClass(){
    let strClass = 'slds-button';

    // this.currentPath variable is the Link class property. 
    // You can use this variable to match with your path. 
    if(this.currentPath == this.path){
        strClass += ' active-class';
    }
    return strClass;
}
```

3. `handleClick` : This is a optional method. This component extending Link component. If you want to define custom logic then you can create new click handler method Otherwise, no need to write handler method. You can directly use {handleClick} in the html file. If you writing the custom method then at the very first link of the method you need to call parent component method link this.

```js
/**
 * This component extending Link component.
 * If you want to define custom logic then you can create new click handler method
 * Otherwise, no need to write handler method.
 * You can directly use {handleClick} in the html file
 */
handleClick(){
    super.handleClick();
    //Some custom logic if you needed.
}
```

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/customLink) to see the code on github.