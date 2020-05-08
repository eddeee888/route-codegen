# Link options

## Overview

Apart from the default `pattern` and `generateUrl` files, each route module could contain extra components or hooks. Depending on what you need, you can use the following options to declare what you need for each routing type:

- React router v5: `reactRouterV5LinkOptions`
- NextJS: `nextJSLinkOptions`
- Normal anchor: `defaultLinkOptions`

Note that you can have more than one option for one app. For example, `reactRouterV5LinkOptions` and `defaultLinkOptions` could be used together for one app. Depending on whether client side or server side routing is needed, the right option will be used.
If `generateLinkComponent`, `generateUsePararms` or `generateUseRedirect` are declared in link options, they would override the top-level settings with the same name.

## reactRouterV5LinkOptions

### Options

| Option                    | Sub option             | Type    | Default   | Description                                                                                                                                                                                              |
| ------------------------- | ---------------------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importCustomLink          |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of `react-route-dom`'s Link . Default option would be used if this is undefined. If this is defined, the sub options must be handled. |
|                           | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                                            |
|                           | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                                      |
|                           | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                              |
|                           | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                                |
|                           | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                                   |
| generateLinkComponent     | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                                  |
| generateRedirectComponent | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                              |
| generateUseParams         | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, `useParams` a helper function would be generated for each route if the route has dynamic path.                                                                       |
| generateUseRedirect       | N/A                    | boolean | true      | <b>Optional</b>. If this is true, `useRedirect` a helper function would be generated for each route.                                                                                                     |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    routingType: ReactRouterV5
    destinationDir: mainApp/routes
    reactRouterV5LinkOptions:
      importCustomLink:
        componentDefaultImport: true
        propsNamedImport: LinkProps
        hrefProp: to
        from: common/components/Link
      useParams: true
      useRedirect: true

  auth:
    routes:
      user: /login
      account: /signup
    routingType: ReactRouterV5
    destinationDir: auth/routes
    reactRouterV5LinkOptions:
      importCustomLink:
        componentNamedImport: CustomLinkComponent
        propsNamedImport: LinkProps
        hrefProp: customTo
        from: common/components/Link
      useParams: false
      useRedirect: false
```

## nextJSLinkOptions

### Options

| Option                    | Sub option             | Type    | Default   | Note                                                                                                                                                                                       |
| ------------------------- | ---------------------- | ------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| importCustomLink          |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of `next/link`. Default option would be used if this is undefined. If this is defined, the sub options must be handled. |
|                           | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                              |
|                           | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                        |
|                           | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                |
|                           | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                  |
|                           | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                     |
| generateLinkComponent     | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                    |
| generateRedirectComponent | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                |
| generateUseParams         | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a `useParams` helper function would be generated for each route if the route has dynamic path.                                                         |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    routingType: NextJS
    destinationDir: mainApp/routes
    nextJSLinkOptions:
      importCustomLink:
        componentDefaultImport: true
        propsNamedImport: LinkProps
        hrefProp: href
        from: common/components/Link
      useParams: false

  auth:
    routes:
      user: /login
      account: /signup
    routingType: NextJS
    destinationDir: auth/routes
    nextJSLinkOptions:
      importCustomLink:
        componentNamedImport: CustomLinkComponent
        propsNamedImport: LinkProps
        hrefProp: customHref
        from: common/components/Link
```

## defaultLinkOptions

### Options

| Option                    | Sub option             | Type    | Default   | Note                                                                                                                                                                                          |
| ------------------------- | ---------------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importCustomLink          |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of native `<a />`. Default option would be used if this is undefined. If this is defined, the sub options must be handled. |
|                           | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                                 |
|                           | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                           |
|                           | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                   |
|                           | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                     |
|                           | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                        |
| generateLinkComponent     | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                       |
| generateRedirectComponent | N/A                    | boolean | true      | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                   |
| generateUseRedirect       | N/A                    | boolean | true      | <b>Optional</b>. If this is true, `useRedirect` a helper function would be generated for each route.                                                                                          |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    routingType: Default
    destinationDir: mainApp/routes
    defaultLinkOptions:
      importCustomLink:
        componentDefaultImport: true
        propsNamedImport: LinkProps
        hrefProp: href
        from: common/components/Link

  auth:
    routes:
      user: /login
      account: /signup
    routingType: Default
    destinationDir: auth/routes
    generateLinkComponent: true # This would be overridden
    defaultLinkOptions:
      importCustomLink:
        componentNamedImport: CustomLinkComponent
        propsNamedImport: LinkProps
        hrefProp: customHref
        from: common/components/Link
      generateLinkComponent: false
      generateUseParams: false
```
