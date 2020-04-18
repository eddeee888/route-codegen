![](https://github.com/eddeee888/route-codegen/workflows/route-codegen%20CI/badge.svg)

# route-codegen

This library generates route modules which can be used to manage client-side ( e.g. [react-router](https://github.com/ReactTraining/react-router), [NextJS](https://github.com/zeit/next.js/), etc. ) and server-side routing ( normal `<a />`).

Given a route pattern, automatically detect and generate link components to go to routes in the same app via client-side routing or routes in a different app via server-side routing. Typescript interfaces and helper functions / hooks are generated as well to make routing safe and easy.

This library can help you avoid routing errors like this:

![CRAroutenotfound](https://user-images.githubusercontent.com/33769523/77838225-9de4da00-71bd-11ea-991f-a3721a537dc8.gif)

## Installation

### Single app project

If you only have one app, you can install at project root:

```bash
yarn add route-codegen
```

Or

```bash
npm i route-codegen
```

Add `route-codegen.yml` to project root. Example:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    destinationDir: client/src/routes
```

More details about [config file](#configuration).

### Monorepo / multi-app project

[Example mono repo](https://github.com/eddeee888/base-react-app)

If you have more than one app and want to manage all routes in one config file, you will need to run the cli command at project root. Run the following at project root or in a route manager package:

```bash
yarn add -D route-codegen
```

Or

```bash
npm i --save-dev route-codegen
```

The library contains some utility functions for the generated files. Therefore, it also needs to be installed in each app:

```bash
yarn add route-codegen
```

Or

```bash
npm i route-codegen
```

Add `route-codegen.yml` to project root / route manager package. Example:

```yml
apps:
  client:
    routes:
      login: /login
      logout: /logout
      user: /user/:id/:subview(profile|pictures)?
    routingType: ReactRouterV5 # "ReactRouterV5", "NextJS" or "Default" ( normal <a />)
    destinationDir: client/src/routes

  client-seo:
    routes:
      home: /
    routingType: NextJS
    destinationDir: client-seo/src/routes

  # An app without `routes` is still valid.
  # In this case, this app can still generate url to other apps
  # `generateLinkComponent`, `generateUseParams` and `generateUseRedirect` should be false to avoid generating unncessary files
  express-server:
    generateLinkComponent: false
    generateUseParams: false
    generateUseRedirect: false
    destinationDir: server/src/routes

  # Leave out `destinationDir` if no route needs to be generated.
  # Other apps still generates routes to navigate to this app
  legacy:
    routes:
      legacyApp: /legacy/app
```

More details about [config file](#configuration).

## Configuration

### Path parameters

Path parameter patterns are a subset of https://github.com/pillarjs/path-to-regexp:

- `:path`: This matches any string.
- `:path?`: This matches an optional string.
- `:path(enum1|enum2)`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string.
- `:path(enum1|enum2)?`: This only matches if path value is `enum1` or `enum2` for React Router V5. For others, it matches any string. This param is optional.

### Customising links

If you have custom links ( e.g. to apply styling on top of underlying link components ), check out the [link options doc](./docs/LINK_OPTIONS.md).

## Generating route modules

```bash
yarn route-codegen
```

Or

```bash
npx route-codegen
```

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

[Example](./sample/output/app/routes/user/patternUser.ts)

This file contains the pattern of a route and typescript interfaces that come with it.

### Generate URL file

[Exampe](./sample/output/app/routes/user/generateUrlUser.ts)

This file contains a function to generate the URL of a particular route. Interfaces from the pattern files are used here to ensure type safety. This function is used in other components / functions of the route module to ensure URLs are generated the same way.

### Link component

[react-router v5 example](./sample/output/app/routes/user/LinkUser.tsx)

[NextJS example](./sample/output/seo/routes/home/LinkHome.tsx)

[Default anchor example](./sample/output/app/routes/about/LinkAbout.tsx)

Each routing framework has different API for their link. The generated `Link` component is an abstraction that handles:

- destination of a link
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
<LinkUser path={{ id: '100' }} urlQuery={{ from: 'home' }} />
```

### Other files

- `useParams`: Applicable for `react-router`. Uses `useParams`. The difference is this has path interface bound so the result is typed. [Example](./sample/output/app/routes/user/useParamsUser.ts)

- `useRedirect`: Applicable for `react-router`. Uses `useHistory` internally. Creates a function to redirect the user to a route. [Example](./sample/output/app/routes/user/useRedirectUser.ts)

## Development

If you want to see how the codegen works, check out the [development guide](./docs/DEVELOPMENT.md).
