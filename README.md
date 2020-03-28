# route-codegen

This library generates route modules which can be used to manage inner and inter app routing. Given a route pattern, linking components, typescript interfaces and helper functions / hooks are generated automatically to make routing safe and easy.

## Installation

```bash
$ yarn add route-codegen
```

Or

```bash
$ npm i route-codegen
```

## Configuration

Add `route-codegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /app/login
      signup: /app/signup
      logout: /app/logout
      me: /app/me
    routingType: ReactRouterV5
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes
    # Use one of these `reactRouterV5LinkOptions`, `nextJSLinkOptions`, `defaultLinkOptions`
    # options below if you want to custom how Link is created
    reactRouterV5LinkOptions:
      importCustomLink:
        componentDefaultImport: true
        propsNamedImport: LinkProps
        hrefProp: to
        from: common/components/Link
      useParams: true
      useRedirect: true
    nextJSLinkOptions:
      importCustomLink:
        componentDefaultImport: true
        propsNamedImport: LinkProps
        hrefProp: href
        from: src/common/components/NextJSLink
    defaultLinkOptions:
      importCustomLink:
        componentNamedImport: CustomAnchorComponent
        propsNamedImport: AnchorProps
        hrefProp: href
        from: src/common/ui/Anchor
      propsInterfaceName: AnchorProps

  # an app without `routes` is still valid. In this case, this app can still generate url to other apps
  express-server:
    generateLink: false
    destinationDir: server/src/routes

  # leave out `destinationDir` if no route needs to be generated. Other apps still generate routes to this app
  legacy:
    routes:
      legacyApp: /legacy/app
```

## Generating route modules

```bash
$ yarn route-codegen
```

Or

```bash
$ npx route-codegen
```

### CLI Options

- `config`: link to the yml config file:
  eg. `yarn route-codegen --config path/to/route-codegen.yml`

- `stacktrace`: see full stacktrace of errors
  e.g. `yarn route-codegen --stacktrace`

## Developing

### Build it!

We need to build from TS -> JS to be able to run the generator. For the changes to reflect, after making changes in `src`, run the following:

```bash
$ yarn build
```

### Build and run sample config

```bash
$ yarn test:sample
```

- Sample config file here can be found [here](./sample/routegen.yml) and the [generated code here](./sample/output)

### How it works

- Read the config
- Go through each "app"
- Look at the routes needed to generate and destination folders
- Generate each route functions into its own modules in the destination folder ( this helps codesplitting )
