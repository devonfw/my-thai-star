## Installation

### Dependencies

The first command required for the installation is:

    $ npm install

or

    $ yarn

## Configuration

The configuration files are in the following path: src/config/\*.ts

Each file contains the following parameters to be retrieved by the configuration service depending on the execution environment:

- HOST: Host url .
- PORT: Port number on where the requests are to be listened.
- DB_URI: String of the database connection if needed. (Sqlite does not need it).
- JWT_KEY: JWT secret to encrypt tokens.
- SWAGGER_TITLE: Your App title for Swagger
- SWAGGER_DESCRIPTION: Your App description for Swagger
- SWAGGER_VERSION: Your App Version for Swagger
- SWAGGER_BASEPATH: Your App BasePath for Swagger.

### Database

In this implementation Sqlite3 is used as persistence system with TypeOrm, no url nor further configuration needed.

Database configuration parameters are in ormconfig.json in root folder.

## Build

To compile all typescript sources you should run:

    $ npm run build

or

    $ yarn build

## Execution

### Start

To switch on the server run the command:

    $ npm run start

or

    $ yarn start

## Testing

    $ npm test

or

    $ yarn test
