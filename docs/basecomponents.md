# Base Components

Base components are the standard components that are provided by  the LWC-router.

- Router
- Switch
- Route
- Link
- Redirect

## Router

A `<c-router>` stores the current location in the hash portion of the URL, so the URL looks something like `http://salesforce.com/#/your/` page. Since the hash is never sent to the server, this means that no special server configuration is needed.

To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you’ll wrap your top-level `<c-app>` element in a router, like this:

```html
<c-router>
    <!--App Component-->
    <c-app></c-app>
</c-router>
```

## Switch

Renders the first child <c-route> or <c-redirect> that matches the location. <c-switch> is unique in that it renders a route exclusively. In contrast, every <c-route> that matches the location renders inclusively. Consider these routes:

```html
<!--app.js-->

<template>
    <!--App Component-->
    <c-switch>
        <c-route path="/about">
            <c-about></c-about>
        </c-route>
        <c-route path="/:user">
            <c-user></c-user>
        </c-route>
        <c-route path="*">
            <c-no-match></c-no-match>
        </c-route>
    </c-switch>
</template>
```

## Route

The `c-route` component is perhaps the most important component in LWC Router to understand and learn to use well. Its most basic responsibility is to render some UI when its path matches the current URL.

```html
<!--mainSwitch.js-->

<template>
    <!--switch Component-->
    <c-switch>
        <c-route exact path="/">
            <c-home></c-home>
        </c-route>
        <c-route path="/news">
            <c-news-feed></c-news-feed>
        </c-route>
    </c-switch>
</template>
```

`<c-route>` has two attributes that used in to navigate the components.

- `path` : This is same as the hash URL path.
- `exact` : By default LWC-router matches using the `startsWith`. If you wanna exact match use `exact` keyword.

## Link

Provides declarative, accessible navigation around your application.

LWC-Router provides a `<c-link>` component to create links in your application. Wherever you render a `<c-link>`, an lightning button (`<lightning-button>`) will be rendered in your HTML document.

```html
<c-link to="/">Home</c-link>

<!-- This will render below html internally
    <lightning-button 
        variant={variant} 
        label={label} 
        title={title} 
        class="slds-m-left_x-small">
    </lightning-button>
-->
```

`<c-link>` has some attributes that define design of the link.

- `to` : Using this you can define where it will navigate after click on the link.
- `label` : This will be label of the link.
- `variant` : This will define the variant of the `<lightning-button>` link (base, neutral, brand, brand-outline, destructive, destructive-text, success), The default variant is the `base`
- `title` : This will be title of the link.

## Redirect

Rendering a <Redirect> will navigate to a new location. The new location will override the current location in the history stack, like server-side redirects (HTTP 3xx) do.

```html
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
```

`<c-redirect>` has one attributes that define where to redirect.

- `to` : This string attribute. This will define where to navigate. 

