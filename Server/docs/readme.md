# Filesystem guide 

## Folders

* node_modules: git-ignored folder that contains node modules, if you've just downloaded repository from github, you have to use npm installation command.

```sh
npm install
```

* logs: contains folders for log types, they are filled by special class.
* utils: class that contains pure utility functions
* Routes: contains  base class Route.class, its children,  files Router.ts and Routes.ts first is the function that reads object Routes and applies all it's member to the server, second file contains object Routes that contains different Routes as a class.
* dist: contains final build.



# How to run the server: 

1. Install all the dependencies 
```
npm i
```