## Installation

### Dependencies

The first command required for the installation is:

    $ npm install

or 

    $ yarn

Although, for the environment to work properly, some packages have to be installed globally, so you have to execute these commands next:

    $ npm install -g mocha

    $ npm install -g ts-node

    $ npm install -g typescript

    $ npm install -g nodemon

or

    $ yarn global add mocha

    $ yarn global add ts-node

    $ yarn global add typescript

    $ yarn global add nodemon

## Config

Before build and execute the server, you must modify server configs. To do this you must edit the file src/config.ts.

* secret: configure the secret word for jwt tokens.
* mailConfig:  configure how the emails will be sent.
    * api: usign the Jose's email program
    * mock: printing the email at console
    * both: api + mock
    * none: do nothing
* emailAPIaddr: route to email server
* frontendURL: route to frontend server
* serverURL: route to this server
* databaseURL: route to database server

## Build

To compile all typescript sources you should run:

    $ npm run build

or 

    $ yarn build

## Database

First of all, download DynamoDB in order to work with it in local: [http://docs.aws.amazon.com/...](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

### Running DynamoDB Local:

Move to the folder where you unzip the DynamoDB and run the command:

    $ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar

### Create tables:

Go back to the project folder and run the command:

    $ npm run database

or

    $ yarn database

## Execution

### Start

To switch on the server run the command:

    $ npm run start

or

    $ yarn start

## Testing

Before execute any test, you must create a new database for this purpose:

    $ npm run database:test

or

    $ yarn database:test

In order to run all unit test, run the command:

    $ npm run test

or

    $ yarn test

## Debugging

Not implemented yet.

## Nodemon

Build and monitors the server, with the nodemon command instead of node:

    $ npm run serve

or

    $ yarn serve
