# Basic Example

This site has 3 pages, all of which are rendered dynamically in the browser (not server rendered). Although the page does not ever refresh, notice how LWC Router keeps the URL up to date as you navigate through the site. This preserves the browser history, making sure things like the back button and bookmarks work properly.

```html
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

## Github URL

[Click here](https://github.com/chandrakiran-dev/lwc-router/tree/master/examples/lwc/basic) to see the code on github.