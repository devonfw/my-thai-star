NOTE:

The application is deployed at http://de-mucdevondepl01:8091
To read the emails sended by the application you can go to http://de-mucdevondepl01:8092

IMPORTANT: The application is working but there is something peding:

- Test: all test are missing
- JSDoc: all classes/methods do not have a proper JSDoc.
- Better exception handling: layer service shouldn't know anything about the HTTP response to the client. Thats why we throw a normal Error in the service layer and then we catch them at controller layer and send to the client the proper HTTP error. This mechanism is OK, but we can improve it by creating errors and then adding an error handling which is the responsible to send the correct HTTP error to the client. This feature will arrive soon.

---

## Installation

### Dependencies

The first command required for the installation is:

```bash
yarn
```

WARNING: some libraries used in this implementation needs to be compiled. In order to be able to do that in windows, you need the **windows-build-tools** package globally installed (_npm install --global windows-build-tools_).

NOTE: to be sure that you install the same package as us, please avoid the usage of npm for install dependencies.

## Configuration

The configuration files are in the following path: src/config/\*.ts

Each file contains the following parameters to be retrieved by the configuration service depending on the execution environment:

- isDev: True if you are using a development environment.
- host: Host url .
- port: Port number on where the requests are to be listened.
- globalPrefix: The global prefix of the application
- jwtConfig: Auth JWT module configuration
- swaggerConfig: Swagger module configuration
- clientUrl: Client url.
- mailerConfig: Mailer module configuration.
- database: Database configuration.

### Database

In this implementation mariadb is used as persistence system with TypeOrm.

For develop and testing, a in memory sqlite database is used.

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
