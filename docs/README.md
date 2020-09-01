## LWC Router

> Routing for the Lightning Web Component

## What it is

LWC-router is the **client-side routing** for the LWC. It allows us to create a single page application with navigation user without the page refreshing. LWC-router uses component structure to call component, which render the appropriate component. It is simple, easy to manage and understandable as all the routing are placed on one place.

See the [Quick start](quickstart.md) guide for more details.

## Installation

To install the LWC-router, we only need to click on the below button. It will redirect you to another page where you need to login to salesforce, it will automatically install in your org. It's nothing but just unlock package url.

<a type="button" href="https://login.salesforce.com/packaging/installPackage.apexp?p0=04t2w000008L7OCAA0" target="_blank" class="btn btn-outline-primary"><i class="fab fa-salesforce"></i> Deploy to Developer Org</a>
<a type="button" href="https://test.salesforce.com/packaging/installPackage.apexp?p0=04t2w000008L7OCAA0" target="_blank" class="btn btn-outline-primary"><i class="fab fa-salesforce"></i> Deploy to Sandbox Org</a>

Or, run below command to install the package
```bash
sfdx force:package:install --package 04t2w000008L7OCAA0
```

## Features

- Client-side routing for the LWC component.
- Create Single page Applications with lwc.
- Compatible for the Community and salesforce 1 application
- Component navigation is simple and easy to manage as all routing config is at one place.
- Simple and Lightweight.
- Handle browser event like Refresh and back.

