# static_files

## Assignment 1

### Introduction

In web development, static files are unchanging resources such as images, html, css, or client-side scripts. 

Frequently, these files are served by existing static file servers such as [**nginx**] (https://www.nginx.com/resources/admin-guide/serving-static-content/)

We will be building some of the functionality from nginx's static content server using Node.js and Express. By accomplishing this task, you will understand the basics of file-serving, dynamic routing, and the separation of front-end and back-end development. 

### Specifications

##### Summary

Develop a server which can respond to GET requests for resources by their filename i.e. visiting localhost:8080/public/1.png in a browser will display the 1.png located in this repository's public folder. 

##### Routing

Routes need to be dynamic to be able to accomplish this goal. Only a single route will need to be defined in index.js to accomplish this goal. 

[Express Routing](https://expressjs.com/en/guide/routing.html)  
[Express Params](http://expressjs.com/en/api.html#req.params)

##### Files

The relevant filenames captured from the route will need to be read from the filesystem and sent as the response to the requesting client. 

[Express File sending](http://expressjs.com/en/4x/api.html#res.sendFile)

##### Directory View

Folders will need to be represented through UI to inform users which files are available in the current directory. 

The Directory View should list all filenames along with a file icon `glyphicon glyphicon-file` [Glyphicons](http://getbootstrap.com/components/)

All nested folder names inside the current directory should be displayed along with a folder icon `glyphicon glyphicon-folder-close`

If the current directory has a parent directory, the parent directory link should be available as well using an open folder icon `glyphicon glyphicon-folder-close`

Clicking files will simply display the file. Clicking on folders will allow users to browse the selected directory. 

[fs.stat](https://nodejs.org/api/fs.html#fs_fs_stat_path_callback)  
[fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)  
[callbacks](https://docs.nodejitsu.com/articles/getting-started/control-flow/what-are-callbacks/)

##### Server-side Rendering

The easiest way to generate the Directory View is using server-side templating. 

You will need to use [EJS](http://www.embeddedjs.com/getting_started.html/)  
[How it can work with Express](https://www.codementor.io/nodejs/tutorial/node-with-express-and-ejs)

##### Instructions

Please clone this repository. Branch from master, then work from your branch. Push your progress during the day upstream into Github. 
[Git Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)

##### Dependencies

[File System](https://nodejs.org/api/fs.html)  
[Express](http://expressjs.com/)  
[EJS](http://www.embeddedjs.com/)  
[Bootstrap](http://getbootstrap.com/)  
[Git](https://git-scm.com)


## Assignment 2

### Specifications

##### Summary
Create a front-end, client-side, single-page web application that displays the Directory View via Ajax requests.

##### Directory View
The entire Directory View from the first assignment will be displayed as a single page app. There is also another section on the same page alongside the Directory View that will display the currently clicked file (text and images only).

Only one file should be displayed at a time. Display as a text or an image accordingly.

##### Server-side
The server will only serve the index html page. EJS will no longer be used. Use your static files server from assignment 1 to serve static files. All routes other than the index route should respond with JSON objects and/or links to the static files.

##### JQuery
Use this javascript framework to make ajax calls and manipulate the DOM.

[JQuery](https://jquery.com/)

##### Ajax
Ajax is a client-side script that allows you to exchange data with a server to update parts of a web page without reloading the entire page. JQuery provides several ajax methods to use.

[Ajax](http://api.jquery.com/jquery.ajax/)


