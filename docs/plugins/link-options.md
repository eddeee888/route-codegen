# Link options

Note: This doc is a work in progress. Ideally, each plugin should have its own doc.

## Overview

Apart from the default `pattern` and `generateUrl` files, each route module could contain extra components or hooks. Depending on what you need, you can use the following options to declare what you need for each routing type:

Note that you can have more than one option for one app. For example, `reactRouterV5LinkOptions` and `defaultLinkOptions` could be used together for one app. Depending on whether client side or server side routing is needed, the right option will be used.
If `generate.linkComponent`, `generate.usePararms` or `generate.useRedirect` are declared in link options, they would override the top-level settings with the same name.

## reactRouterV5LinkOptions

### Options

| Option           | Sub option             | Type    | Default   | Description                                                                                                                                                                                              |
| ---------------- | ---------------------- | ------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importCustomLink |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of `react-route-dom`'s Link . Default option would be used if this is undefined. If this is defined, the sub options must be handled. |
|                  | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                                            |
|                  | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                                      |
|                  | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                              |
|                  | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                                |
|                  | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                                   |
| generate         |                        | object  |           | <b>Optional</b>                                                                                                                                                                                          |
|                  | linkComponent          | boolean | false     | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                                  |
|                  | redirectComponent      | boolean | false     | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                              |
|                  | useParams              | boolean | false     | <b>Optional</b>. If this is `true`, `useParams` a helper function would be generated for each route if the route has dynamic path.                                                                       |
|                  | useRedirect            | boolean | false     | <b>Optional</b>. If this is true, `useRedirect` a helper function would be generated for each route.                                                                                                     |
| mode             | N/A                    | enum    | "loose"   | <b>Optional</b>. "strict" or "loose" ( default ). If this is "strict", error will be thrown if type safety is not guaranteed                                                                             |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    destinationDir: mainApp/routes
    plugins:
      - name: typescript-react-router-5
        config:
          importCustomLink:
            componentDefaultImport: true
            propsNamedImport: LinkProps
            hrefProp: to
            from: common/components/Link
          generate:
            useParams: true
            useRedirect: true

  auth:
    routes:
      user: /login
      account: /signup
    destinationDir: auth/routes
    plugins:
      - name: typescript-react-router-5
        config:
          importCustomLink:
            componentNamedImport: CustomLinkComponent
            propsNamedImport: LinkProps
            hrefProp: customTo
            from: common/components/Link
          generate:
            useParams: false
            useRedirect: false
          mode: "strict"
```

## nextJSLinkOptions

### Options

| Option           | Sub option             | Type    | Default   | Note                                                                                                                                                                                                                              |
| ---------------- | ---------------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importCustomLink |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of `next/link`. Default option would be used if this is undefined. If this is defined, the sub options must be handled.                                        |
|                  | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                                                                     |
|                  | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                                                               |
|                  | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                                                       |
|                  | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                                                         |
|                  | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                                                            |
| generate         |                        | object  |           | <b>Optional</b>                                                                                                                                                                                                                   |
|                  | linkComponent          | boolean | false     | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                                                           |
|                  | redirectComponent      | boolean | false     | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                                                       |
|                  | useParams              | boolean | false     | <b>Optional</b>. If this is `true`, a `useParams` helper function would be generated for each route if the route has dynamic path.                                                                                                |
| mode             | N/A                    | enum    | "loose"   | <b>Optional</b>. "strict" or "loose" ( default ). If this is "strict", error will be thrown if type safety is not guaranteed. This allows better route handling at component level but may not be the the recommended Next.JS way |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    destinationDir: mainApp/routes
    plugins:
      - name: typescript-next-js
        config:
          importCustomLink:
            componentDefaultImport: true
            propsNamedImport: LinkProps
            hrefProp: href
            from: common/components/Link
          generate:
            useParams: false

  auth:
    routes:
      user: /login
      account: /signup
    routingType: NextJS
    destinationDir: auth/routes
    plugins:
      - name: typescript-next-js
        config:
          importCustomLink:
            componentNamedImport: CustomLinkComponent
            propsNamedImport: LinkProps
            hrefProp: customHref
            from: common/components/Link
          mode: "loose"
```

## defaultLinkOptions

### Options

| Option           | Sub option             | Type    | Default   | Note                                                                                                                                                                                          |
| ---------------- | ---------------------- | ------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| importCustomLink |                        | object  | undefined | <b>Optional</b>. Use this if you want to use a custom link instead of native `<a />`. Default option would be used if this is undefined. If this is defined, the sub options must be handled. |
|                  | componentDefaultImport | boolean | undefined | <b>Optional</b>. Set this to `true` if the custom link component uses default export. Either this or `componentNamedImport` must be declared.                                                 |
|                  | componentNamedImport   | string  | undefined | <b>Optional</b>. Use this if the custom link component uses named export. Either this or `componentDefaultImport` must be declared.                                                           |
|                  | propsNamedImport       | string  | undefined | <b>Required</b>. The named export of the custom link props.                                                                                                                                   |
|                  | hrefProp               | string  | undefined | <b>Required</b>. The prop that the custom link component uses to set the destination of the link e.g. `href` for `<a />`.                                                                     |
|                  | from                   | string  | undefined | <b>Required</b>. Absolute path to the custom link component and props.                                                                                                                        |
| generate         |                        | object  |           | <b>Optional</b>                                                                                                                                                                               |
|                  | linkComponent          | boolean | false     | <b>Optional</b>. If this is `true`, a link component would be generated for each route.                                                                                                       |
|                  | redirectComponent      | boolean | false     | <b>Optional</b>. If this is `true`, a redirect component would be generated for each route.                                                                                                   |
|                  | useRedirect            | boolean | false     | <b>Optional</b>. If this is true, `useRedirect` a helper function would be generated for each route.                                                                                          |

### Example

```yml
apps:
  mainApp:
    routes:
      user: /app/users/:id/:subview(profile|pictures)?
      account: /app/account
    destinationDir: mainApp/routes
    plugins:
      - name: typescript-anchor
        config:
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
    generate:
      linkComponent: true # This would be overridden
    plugins:
      - name: typescript-anchor
        config:
          importCustomLink:
            componentNamedImport: CustomLinkComponent
            propsNamedImport: LinkProps
            hrefProp: customHref
            from: common/components/Link
          generate:
            linkComponent: false
            useParams: false
```