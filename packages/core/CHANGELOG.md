# @route-codegen/core

## 0.5.0

### Minor Changes

- 79d42ef: [Breaking change] Split plugins into own modules and update yml usage
- 403ecb2: [Breaking change] Generated Redirect components now take urlParams
- 7f5d7ce: [Breaking change] Update Link component props to handle urlParams as the main routing props

### Patch Changes

- 0eafc15: Convert all generators into classes that expose a generate function

## 0.4.0

### Minor Changes

- c76be6a: Update all UrlParts refs to UrlParams
- ad7a325: [Breaking change] Update generateUrl usage. UrlParams are now passed in as an object.

### Patch Changes

- 40c51a3: Update deps

## 0.3.1

### Patch Changes

- f33b3dd: Lint minor type issues
- c6ef5ab: Make default generate options false

## 0.3.0

### Minor Changes

- 2857d34: Add generate.rootIndex. Merge all generate\* options into generate object

## 0.2.2

### Patch Changes

- 21be2af: Add NextJS suggested file paths

## 0.2.1

### Patch Changes

- 9e1e472: NextJS loose mode templates use NextJS types for path params

## 0.2.0

### Minor Changes

- 3831241: Add mode to react router config. Values are "strict" or "loose". Default is "loose"
- 2035a4e: Implement strict mode nextjs

## 0.1.1

### Patch Changes

- b64c883: Update READMEs

## 0.1.0

### Minor Changes

- e9dc945: Initial working end-to-end commit

## 0.0.4

### Patch Changes

- 66d63a5: Add LICENSE

## 0.0.3

### Patch Changes

- ddf286b: Remove LICENSE

## 0.0.2

### Patch Changes

- d64d1a0: - Update import paths of `generateUrl` and `RedirectServerSide` to new packages
- 474cf2f: Add LICENSE
