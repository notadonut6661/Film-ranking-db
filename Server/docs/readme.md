# Filesystem guide

## Folders

* node_modules: git-ignored folder that contains node modules, if you've just downloaded the repository from Github, you have to use the npm installation command.

```sh
npm install
```

* utils: Contains pure utility functions
* Routes: contains the base class Route.class, its children,  files Router.ts and Routes.ts first is the function that reads object Routes and applies all it's member to the server, second file contains object Routes that contains different Routes as a class.
* dist: contains final build.



## How to run the server

1. Install all the dependencies 
``` sh
npm i
```
2. Start the server in not developer mode 
``` sh
 npm run start
```

3. If you want your server to update every time you save changes run the server in developer mode
``` sh
npm run dev
```

## Testing

To test routes we use post.cmd file


## Uri Decoding

UriDecoder is a class that takes 1 parameter that defines how to decode URI and has 1 public method "Decode" which will return decoded uri as an object.

## ENV

- DB_HOST
- DB_PORT
- DB_NAME
- DB_USER
- DB_PASSWORD
- PORT
- QUERY_SEPARATOR
