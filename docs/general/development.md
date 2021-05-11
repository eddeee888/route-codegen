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

## Build and generate examples files

```bash
yarn generate:examples
```

Sample config files here can be found [here](../examples/routegen.yml) and the [generated code here](../examples/outputs)

## How the codegen works

- Read the config.
- Go through each app.
- External routes are analysed, marked and merged into the app's route map.
- Run the first `pattern` plugin. The generated artifacts are used in other plugins.
- Run through the `general`, `route-internal` and `route-external` plugins and generate files accordingly. The artifacts are collected as an array.
- Run `generated-files-processor` plugins and collect any generated artifacts.
- Create files from artifacts.

## CLI Options

| Name       | Default           | Description                                                                 |
| ---------- | ----------------- | --------------------------------------------------------------------------- |
| config     | route-codegen.yml | The name of the config file.                                                |
| stacktrace | false             | Turn on stack trace. Used to debug errors if they occur.                    |
| verbose    | false             | Turn on infos and logs. Used to see more information about the current run. |

Example

```bash
yarn route-codegen --verbose --stacktrace --config path/to/routegen.yml
```
