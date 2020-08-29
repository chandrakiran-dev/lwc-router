# Primary Components

There are three primary categories of components in LWC-Router:

* routers, like `<c-router>`
* route matchers, like `<c-route>` and `<c-switch>`
* and navigation, like `<c-link>`, `<c-nav-link>`, and `<c-redirect>`

These all are the Lightning Web Components. We can directly use these components in our components.

## Routers

A `<c-router>` stores the current location in the hash portion of the URL, so the URL looks something like `http://salesforce.com/#/your/` page. Since the hash is never sent to the server, this means that no special server configuration is needed.

To use a router, just make sure it is rendered at the root of your element hierarchy. Typically you’ll wrap your top-level `<c-app>` element in a router, like this:

```html
<c-router>
    <!--App Component-->
    <c-app></c-app>
</c-router>
```

## Route Matchers

There are two route matching components: Switch and Route. When a `<c-switch>` is rendered, it searches through its children `<c-route>` elements to find one whose path matches the current URL. When it finds one, it renders that `<c-route>` and ignores all others. This means that you should put `<c-route>`s with more specific (typically longer) paths before less-specific ones.

If no <c-route> matches, the <c-switch> renders nothing (null).

```html
<!--app.html-->

<template>
    <c-switch>
        <!--
        * If the current URL is /about, this route is rendered
        * while the rest are ignored
        -->
        <c-route path="/about">
            <c-about></c-about>
        </c-route>

        <!--
        * Note how these two routes are ordered. The more specific
        * path="/contact/:id" comes before path="/contact" so that
        * route will render when viewing an individual contact
        -->
        <c-route path="/contact/:id">
            <c-contact></c-contact>
        </c-route>
        <c-route path="/contact/:id">
            <c-all-contact></c-all-contact>
        </c-route>
        <!--
        * If none of the previous routes render anything,
        * this route acts as a fallback.

        * Important: A route with path="/" will *always* match
        * the URL because all URLs begin with a /. So that's
        * why we put this one last of all
        -->
        <c-route path="/">
            <c-home></c-home>
        </c-route>
    </c-switch>
</template>
```

One important thing to note is that a `<c-route path>` matches the beginning of the URL, not the whole thing. So a `<c-route path="/">` will always match the URL. Because of this, we typically put this `<c-route>` last in our `<c-switch>`. Another possible solution is to use `<c-route exact path="/">` which does match the entire URL.

## Navigation (or Route Changers)

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


Any time that you want to force navigation, you can render a `<c-redirect>`. When a `<c-redirect>` renders, it will navigate using its to prop.

```html
<c-redirect to="/login" />

<!--This will directly navigate to the /login screen-->
-->
```



