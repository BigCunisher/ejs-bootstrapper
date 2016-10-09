# ejs-bootstrapper
This repo contains a very simple node application for bootstrapping EJS templates.

To stand up the application:
1. run `npm install`
2. run `node index`
3. Load the [example](http://localhost:8080/home) page


To create content for your site add a directory structure and an **_.ejs_** file containing a new pages content to the **_/client/views/includes/content/_** directory.

 To render any added content visit the corresponding URL structure, so for example if you add **_/foo/bar.ejs_** to the **_/client/views/includes/content/_** directory structure, the URL to render this content would be http://localhost:8080/foo/bar
