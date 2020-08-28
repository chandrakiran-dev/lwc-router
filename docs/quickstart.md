# Quick start

LWC-router is the **client-side routing** for the LWC. It allows us to build a single page web application with navigation without the page refreshing as the user navigates. LWC-router uses component structure to call component, which display appropriate information. All the routing are placed on one place so it's very easy to understand the component navigation. 

In the salesforce, many times there is a requirement to create single page application over their, we face following problem:

* Navigate from one component to other component.
* Handle browser navigation like back button.
* Handle browser refresh button.
* It's very hard to understands form where the navigation happen. Especially, for the newbies.

LWC-router providing solution for these type of issues and many more.

## Installation

To install the LWC-router, we only need to click on the below button. It will redirect you to another page where you need to login to salesforce, it will automatically install in your org. It's nothing but just unlock package url.

<button type="button" class="btn btn-outline-primary"><i class="fab fa-salesforce"></i> Deploy to Developer Org</button>
<button type="button" class="btn btn-outline-primary"><i class="fab fa-salesforce"></i> Deploy to Sandbox Org</button>

Or, run below command to install the package
```bash
sfdx force:package:install --package 04t2v00000799S7AAI
```

## Basic Routing - Example

In this example we have 3 “pages” handled by the router: a home page, an about page, and a users page. As you click around on the different `<c-link>`s, the `<c-router>` renders the matching `<c-route>`.

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

To use this, After the LWC- router installation, simple create the new Lightning Web Component and update the HTML file with above code.
Also, update the meta file to expose this to various page like Home page, App page. Use below code to expose.

```html
<?xml version="1.0" encoding="UTF-8"?>
<LightningComponentBundle xmlns="http://soap.sforce.com/2006/04/metadata">
    <apiVersion>47.0</apiVersion>
    <isExposed>true</isExposed>
    <masterLabel>basic</masterLabel>
    <description>Add a classic greeting to any page.</description>
    <targets>
      <target>lightning__AppPage</target>
      <target>lightning__HomePage</target>
    </targets>
</LightningComponentBundle>
```

Open salesforce org, goto home page and Edit the page by clicking the gear icon and edit page. Then, simply drag and drop the component on the page and Save & activate.

It good to go. You have implemented the first application with LWC-router. Cheers!


## Link and Reference

Refer below links to getting started with Lightning Web Components and the know more from react.

* [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components?trail_id=build-lightning-web-components&trailmix_creator_id=tzarrjr&trailmix_slug=getting-ready-for-lb-2-b-new-to-lwc).
* [React Router for reference](https://reactrouter.com/)

## Keep Going!

Hopefully these examples give you a feel for what it’s like to create a single page application with LWC-Router. Keep reading to learn more about the [primary components](primarycomponents.md) in LWC Router! 
