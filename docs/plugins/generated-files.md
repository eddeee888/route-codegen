## Generated files

Note: this is a work in progress. Ideally, each plugin should create their own doc.

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
