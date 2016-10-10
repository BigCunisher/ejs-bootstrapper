# ejs-bootstrapper
This repo contains a very simple node application for bootstrapping an Express Server with EJS templates.

To stand up the application:
1. run `npm install`
2. run `node index`
3. Load the [example](http://localhost:8080/home) page


To create content for your site add a directory structure and an **_.ejs_** file containing a new pages content to the **_/client/views/includes/content/_** directory.

New content is added by convention. To add a new page to the application, for example **http://localhost:8080/foo/bar**:

1. Add **_/foo/bar.ejs_** to **_/client/views/includes/content_**
2. Populate **_/foo/bar.ejs_** with your desired HTML mark-up
3. Add **_/foo/barHead.ejs_** to **_/client/views/includes/head_**
4. Populate **_/foo/barHead.ejs_** with custom <head> content for the new page

Pages are cached by default for 5 minutes and therefore changes can take up to 5 minutes to take affect. Set the `cacheTimeout` and the `cacheInterval` variable in **_route-config.js_** to `0` to set an unlimited cache timeout
