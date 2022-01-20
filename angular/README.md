# My Thai Star restaurant

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.18.

**UPDATE:** Angular CLI has been updated to 13.1.2 version. 

**NOTE:** There won't be anymore updates to angular unless there is some breaking change in the future versions.

## Install or update the project

In order to update Angular CLI globally follow the nest steps:

```
$ npm uninstall -g angular-cli @angular/cli
$ npm cache clean
$ npm install -g @angular/cli
```

If you have a previous version of this project you must update the node modules. It is very important to point out that this project is using **yarn** and for that reason you can see committed in the repository `yarn.lock`. Therefore, it is mandatory to use it when installing dependencies as follows:

Windows:

```bash
$ rmdir /s node_modules
$ rmdir /s dist
$ yarn
```

Linux or macOS:

```bash
$ rm -rf node_modules dist
$ yarn
```

To test the application as a **PWA** you will need a small http server:

```bash
$ npm i -g http-server
```

## Run the project

There are the following alternatives in order to run My Thai Star Angular client with the different server technologies and environments:

```bash
$ yarn start                     # Local OASP4J server
$ yarn serve:pwa                 # Build and run the app as PWA
$ yarn serve:prod                # Production server
$ yarn serve:prodcompose         # Production server with Docker compose
$ yarn serve:node                # Node.js or local Serverless server
```

If you want to use `npm run`, use it instead of `yarn` in the above commands. It will work as you are not installing dependencies.

## Build

Run `npm run build` or `yarn build` to build the project. The build artifacts will be stored in the `dist/` directory.

- Use the `:prod` flag for a production build with AOT compilation or `:prodcompose` for a production build for the production server and Docker compose environment.
- Use the `:pwa` flag to build the application as a PWA.

Check the different build alternatives in the `package.json` file alongside the serve scripts.

## Electron

Electron support has been included in this new My Thai Star release. We have included scripts to run, build and package My Thai Star Angular as a desktop app.

### Serve

```bash
$ yarn electron:start            # Build, run and serve in dev mode locally
$ yarn electron:local            # Build, run and serve in prod mode locally
```

### Build and package

The built app will be generated in the `release` folder.

```bash
$ yarn electron:windows          # Build and package as a Windows app
$ yarn electron:linux            # Build and package as a Linux app
$ yarn electron:mac              # Build and package as a macOS app
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
