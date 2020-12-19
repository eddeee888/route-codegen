# Development

## Clone it!

```bash
git clone git@github.com:eddeee888/route-codegen.git
```

## Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```bash
yarn build
```

## Unit tests

```bash
yarn test # All files
yarn test:core # Only tests in the core package
```

## Build and generate sample files

```bash
yarn generate:sample
```

Sample config files here can be found [here](../sample/routegen.yml) and the [generated code here](../sample/outputs)

## How the codegen works

- Read the config.
- Go through each app.
- Look at the routes needed to generate and destination folders.
- Generate each route modules in the destination folder in different files ( this helps codesplitting ).
- Detect client-side routing ( inner app ) and create components with client-side links based on `routingType` libraries / frameworks.
- Detect server-side routing ( inter app ) and create components with `<a />` underneath.
