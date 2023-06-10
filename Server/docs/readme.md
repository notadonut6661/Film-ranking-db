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



## How to run the server

1. Install all the dependencies 
``` sh
npm i
```
2. Start server in not developer mode 
``` sh
 npm run start
```

3. If you want your server to update every time you save changes run server in developer mode
``` sh
npm run dev
```

## Testing

To test routes we use post.cmd file


## Uri Decoding

UriDecoder is a class that takes 1 parameter that defines how to decode uri, and has 1 public method "Decode" which will return decoded uri as object, if you have query 