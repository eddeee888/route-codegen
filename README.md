![CI](https://github.com/eddeee888/route-codegen/workflows/CI/badge.svg)
![Release](https://github.com/eddeee888/route-codegen/workflows/Release/badge.svg)

# route-codegen

Route Codegen is a library that generates Typescript functions, hooks and types for routing purposes. There are many areas in modern web application routing:

- URL generation
- Safely accessing dynamic path params of a URL
- Linking to a route inside the app vs linking to an external route
- Making sure href of all anchors are correct when route patterns change

Route Codegen aims to simplify workflows by keeping apps' routes in one config file and generates the code to handle routing concerns.

## Supports

- [Next.js](https://github.com/zeit/next.js/) v9.3.4^
- [React router](https://github.com/ReactTraining/react-router) v5^

## Installation

```bash
yarn add -D @route-codegen/core
yarn add @route-codegen/utils
yarn add @route-codegen/react # Only if you use generate.redirectComponent option
```

Or

```bash
npm i --save-dev @route-codegen/core
npm i @route-codegen/utils
npm i @route-codegen/react # Only if you use generate.redirectComponent option
```

## Basic usage

Add `route-codegen.yml` to your project root:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    destinationDir: src/routes
    plugins:
      - name: "typescript-pattern"
      - name: "typescript-generate-url"
      - name: "typescript-react-router-5"
      - name: "typescript-root-index"
```

Then run the following command:

```bash
yarn route-codegen
```

Or

```bash
npx route-codegen
```

You will get fully typed functions to generate URLs to login, logout and user routes. These files are accompanied by related types based on the app's main routing approach.

### Advanced usage

If you have more than one app and want to manage all routes in one config file, you can use one config file to do so:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    destinationDir: client/src/routes
    generate:
      linkComponent: true
      redirectComponent: true
      useParams: true
      useRedirect: true
    plugins:
      - name: "typescript-pattern"
      - name: "typescript-generate-url"
      - name: "typescript-react-router-5"
      - name: "typescript-anchor"
      - name: "typescript-root-index"

  client-seo:
    routes:
      home: /
      about: /about
    destinationDir: client-seo/src/routes
    plugins:
      - name: "typescript-pattern"
      - name: "typescript-generate-url"
      - name: "typescript-next-js"
      - name: "typescript-anchor"
      - name: "typescript-root-index"

  # An app without `routes` will get generated code to support routing to other apps.
  express-server:
    destinationDir: server/src/routes

  # An app without `destinationDir` will not get generated code.
  # Other apps will get generated code to support routing to this app.
  legacy:
    routes:
      legacyApp: /legacy/app

  # Origin can be used to prefix the URL path of certain apps.
  # ${...} Can be used to pass environment variables to the config yml
  externalApp:
    origin: https://${SUB_DOMAIN}.external.com
    routes:
      externalAppHome: /
```

## Configuration

### Path parameters

Path parameter patterns are a subset of https://github.com/pillarjs/path-to-regexp:

- `:path`: This matches any string.
- `:path?`: This matches an optional string.
- `:path(enum1|enum2)`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string.
- `:path(enum1|enum2)?`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string. This param is optional.

### Plugins

Checkout the [list of plugins](./packages/core/src/plugins). ( More docs coming soon! )

### Customising links

If you have custom links ( e.g. to apply styling on top of underlying link components ), check out the [link options doc](./docs/plugins/link-options.md).

## Development

If you want to see how the codegen works, check out the [development guide](./docs/general/development.md).
