# Why to use LWC-router

LWC-router is a tool that allows you to handle routes in a web app, using dynamic routing. Dynamic routing takes place as the app is rendering on your machine, unlike the old routing architecture where the routing is handled in a configuration outside of a running app. React router implements a component-based approach to routing. It provides different routing components according to the needs of the application and platform.

By preventing a page refresh, and using `c-router` or `c-link`, which is explained in more depth in API, the flash of a white screen or blank page is prevented. This is one increasingly common way of having a more seamless user experience. LWC router also allows the user to utilize browser functionality like the back button and the refresh page while maintaining the correct view of the application.

## Client-side routing for the LWC component 
A client-side route happens when the route is handled internally by the JavaScript that is loaded on the page. When a user clicks on a link, the URL changes but the request to the server is prevented. The adjustment to the URL will result in a changed state of the application. The changed state will ultimately result in a different view of the webpage. This could be the rendering of a new component, or even a request to a server for some data that the application will turn into some HTML elements.

## Simple and lightweight
Using LWC-router every things happen on the client side. So application is not waiting for the server side routing. It work very fast and render the component very quickly. It is also very easy to implement into the new application and the existing application.

```html
<!--basic.html-->
<template>
    <c-router>
        <div class="slds-tabs_default">
            <ul class="slds-tabs_default__nav" role="tablist">
              <li class="slds-tabs_default__item" title="Item One" role="presentation">
                <c-link label="item one" to='/'></c-link>
              </li>
              <li class="slds-tabs_default__item" title="Item Two" role="presentation">
                <c-link label="item two" to='/item-two'></c-link>
              </li>
              <li class="slds-tabs_default__item" title="Item Three" role="presentation">
                <c-link label="item Three" to='/item-three'></c-link>
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

## Routing for the single page application
## Handle browser navigation like back button.
## Handle browser refresh button.
## All the routing are placed on one place so it's very easy to understand the component navigation.
## Compatible for the Community and salesforce 1 application