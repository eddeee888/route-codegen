# react-route-generator

This is the MVP of the code generator for route types that are written in https://github.com/pillarjs/path-to-regexp which is what [react-router](https://github.com/ReactTraining/react-router) uses internally.

The generated types can be used to type generic `Route` component props

## Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```
npm run build
```

## Run it!

```
npm run generate
```

## Or Do it all in one command!

```
npm run integration
```

## How it works

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
- [ ] Publish this
