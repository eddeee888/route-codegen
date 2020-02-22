# react-route-generator

This is the MVP of the code generator for route types that are written in https://github.com/pillarjs/path-to-regexp which is what [react-router](https://github.com/ReactTraining/react-router) uses internally.

The generated types can be used to type generic `Route` component props

## Install

```
$ yarn add react-route-generator
```

Or

```
$ npm i react-route-generator
```

## Create config

Add `routegen.yml` to project root. Example:

```
apps:
  client:
    routes:
      login: /app/login
      signup: /app/signup
      logout: /app/logout
      me: /app/me
    routingType: ReactRouter
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes

```

## Generate

```
$ yarn routegen
```

Or

```
$ npx routegen
```

## Developing

### Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```
$ yarn run build
```

### Run it!

```
$ yarn run generate
```

### Or Do it all in one command!

```
$ yarn run test:cli
```

### How it works

- Reads in the config
- Go through each "app"
- Look at the routes it needs to generate and destination folder
- Generate each route into its own file in the destination folder ( this helps codesplitting )
- The files are generated into `tests/output` folder for now

## TODO

- [x] Bring over `createRoute` function which uses the generated types to generate the route objects
- [x] Break `index.ts` into smaller files
- [x] Handle inter app routing
- [x] Handle NextJS routing
- [x] Add yaml file for config
- [x] Make this CLI
- [x] Publish
- [x] Generate route / link creators
- [ ] Generate url function needs to take URL query. Maybe pass this into each `createLink` as a function so route & link always have the same function.
- [ ] Tests
- [ ] Set up CI
- [ ] Clean up
