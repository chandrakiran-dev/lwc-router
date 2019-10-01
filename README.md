# lwc-router
This repository is extending the LWC feature for routing within salesforce LWC component.

# Feature
- A module that handle whole navigation for the project.
- Refresh the perticuler component.
- Handled browser next, previous and refresh buttons.
- Very helpful in big project, salesforce1 and mobile application.

# Installation
- Download the repository.
- Extract the zip file.
- Copy lib folder to salesforce project LWC folder.
- Installation in done :)

# How to Use
- In the main component use the below components:
```sh
  <c-router root = "/"  onpayloadchange = {handelPayloadChange}>  # c-router must contain two attribute root, onpayloadchange
      <c-route path="/">                                          # this default route and path should match with root 
          <c-home payload = {payload}></c-home>                   # onload child component
      </c-route>
      <c-route path="/dashboard">                                 # this route for /dashboard
          <c-dashboard payload = {payload}></c-dashboard>         # This component will show when current route is /dashboard
      </c-route>
      <c-route path="/about">                                     # this route for /about
          <c-about payload = {payload}></c-about>                 # This component will show when current route is /about
      </c-route>
      <c-route path="/profile">                                   # this route for /profile
          <c-profile payload = {payload}></c-profile>             # This component will show when current route is /profile
      </c-route>
  </c-router>
```


# Use Case
In a big project we always try to understand that one component is called from which component. So need some module that manage whole navigation of the project. By seeing that we able to understand when this component called.

In Salesforce1 app every functionality have many screens and all screen is a component. So navigation is very complex in that. To manage that we should use routing modules.
