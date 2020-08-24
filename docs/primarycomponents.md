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

If no <c-route> matches, the <c-switch> renders nothing (null)