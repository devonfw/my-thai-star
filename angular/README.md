# My Thai Star restaurant

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18.

**UPDATE:** Angular CLI has been updated to 6.0.1 version.

## Install or update the project

In order to update Angular CLI globally follow the nest steps:

```
$ npm uninstall -g angular-cli @angular/cli
$ npm cache clean
$ npm install -g @angular/cli
```

If you have a previous version of this project you must update the node modules:

Windows:

```bash
$ rmdir /s node_modules
$ rmdir /s dist
$ npm install
```

Linux or macOS:

```bash
$ rm -rf node_modules dist
$ npm install
```

To test the application as a **PWA** you will need a small http server:

```bash
$ npm i -g http-server
```

## Yarn

Project tested with the latest [Yarn](https://yarnpkg.com/lang/en/) version. Instead of using `npm` you can do the following:

```bash
$ rm -rf node_modules dist
$ yarn
```

If you have a previous version of this project run the following command:

```bash
$ yarn upgrade
```

## Run the project

There are the following alternatives in order to run My Thai Star Angular client with the different server technologies and environments:

```bash
$ npm run start                     # Local OASP4J server
$ npm run serve:pwa                 # Build and run the app as PWA
$ npm run serve:prod                # Production server
$ npm run serve:prodcompose         # Production server with Docker compose
$ npm run serve:node                # Node.js or local Serverless server
```

If you want to use `yarn`, use it instead of `npm run` in the above commands.

## Build

Run `npm run build` or `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

- Use the `:prod` flag for a production build with AOT compilation or `:prodcompose` for a production build for the production server and Docker compose environment.
- Use the `:pwa` flag to build the application as a PWA.

Check the different build alternatives in the `package.json` file alongside the serve scripts.

## Electron

Electron support has been included in this new My Thai Star release. We have included scripts to run, build and package My Thai Star Angular as a desktop app.

### Serve

```bash
$ npm run electron:start            # Build, run and serve in dev mode locally
$ npm run electron:local            # Build, run and serve in prod mode locally
```

### Build and package

The built app will be generated in the `release` folder.

```bash
$ npm run electron:windows          # Build and package as a Windows app
$ npm run electron:linux            # Build and package as a Linux app
$ npm run electron:mac              # Build and package as a macOS app
```

## Running unit tests

Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io). Use the `:ci` flag to run tests in headless mode for CI environments.

## Compodoc documentation

1.  Please, install globally [Compodoc](https://compodoc.github.io/website/) by `npm i -g @compodoc/compodoc`.
2.  Run the script `yarn compodoc` or `npm run compodoc`.
3.  Then open the generated documentation served at http://127.0.0.1:8080/.

**NOTE:** Compodoc has not been installed locally in the project, since we have detected some issues that recommends for the moment to use the global installation. In future versions `@compodoc/compodoc` development dependency will be included in the project.

## Further help

To get more help on the `angular-cli` use `ng --help` or go check out the [Angular-CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
