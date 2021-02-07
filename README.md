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

- [NextJS](https://github.com/zeit/next.js/) v9.3.4^
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
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    destinationDir: src/routes
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
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    generate:
      linkComponent: true
      redirectComponent: true
      useParams: true
      useRedirect: true
      rootIndex: true # Create a "barrel" style index function that exports all route modules
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
      about: /about
    routingType: NextJS
    destinationDir: client-seo/src/routes

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

Check out this [example config of a website](https://github.com/eddeee888/base-app-monorepo/blob/master/services/route-manager/route-codegen.yml) that has multiple services:

- One [create-react-app](https://create-react-app.dev/) with [react-router](https://reactrouter.com/)
- One [NextJS](https://nextjs.org/) app
- One express server

## Configuration

### Path parameters

Path parameter patterns are a subset of https://github.com/pillarjs/path-to-regexp:

- `:path`: This matches any string.
- `:path?`: This matches an optional string.
- `:path(enum1|enum2)`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string.
- `:path(enum1|enum2)?`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string. This param is optional.

### Customising links

If you have custom links ( e.g. to apply styling on top of underlying link components ), check out the [link options doc](./docs/LINK_OPTIONS.md).

### CLI Options

| Name       | Default           | Description                                                                 |
| ---------- | ----------------- | --------------------------------------------------------------------------- |
| config     | route-codegen.yml | The name of the config file.                                                |
| stacktrace | false             | Turn on stack trace. Used to debug errors if they occur.                    |
| verbose    | false             | Turn on infos and logs. Used to see more information about the current run. |

Example

```bash
yarn route-codegen --verbose --stacktrace --config path/to/routegen.yml
```

## Generated files

### Pattern file

[Example](./sample/outputs/default/app/routes/user/patternUser.ts)

This file contains the pattern of a route and typescript interfaces that come with it.

### Generate URL file

[Exampe](./sample/outputs/default/app/routes/user/generateUrlUser.ts)

This file contains a function to generate the URL of a particular route. Interfaces from the pattern files are used here to ensure type safety. This function is used in other components / functions of the route module to ensure URLs are generated the same way.

### Link component

[react-router v5 example](./sample/outputs/default/app/routes/user/LinkUser.tsx)

[NextJS example](./sample/outputs/default/seo/routes/home/LinkHome.tsx)

[Default anchor example](./sample/outputs/default/app/routes/about/LinkAbout.tsx)

Each routing framework has different API for their link. The generated `Link` component is an abstraction that handles:

- destination of a link
- URL origin e.g. `https://example.com`
- path parameters
- query strings
- client-side vs server-side routing

```typescript
// react-router v5 ( client-side )
<Link to="/users/100/profile?from=home" />

// NextJS ( client-side )
<Link href="/users/100/profile?from=home" />

// Normal anchor ( server-side )
<a href="/users/100/profile?from=home" />
```

The generated Link component has the same props so you can do the following in any app:

```typescript
// Works in any app
<LinkUser path={{ id: "100" }} query={{ from: "home" }} />
```

Or with origin:

```typescript
<LinkUser path={{ id: "100" }} query={{ from: "home" }} origin="https://example.com" />
```

### Redirect component

Similar to the `Link` component but redirects the user when mounted. If this option is used make sure that `@route-codegen/react` is installed in the consuming app.

### Other files

- `useParams`: Get dynamic params in the URL. Available for `react-router` and `NextJS`. [Example](./sample/outputs/default/app/routes/user/useParamsUser.ts)

- `useRedirect`: Creates a function to redirect the user to a route. [Example](./sample/outputs/default/app/routes/user/useRedirectUser.ts)

## Development

If you want to see how the codegen works, check out the [development guide](./docs/DEVELOPMENT.md).
