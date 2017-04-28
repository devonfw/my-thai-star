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

Finally, we need to clone serverless-data-collector into our project:
Clone serverless-data-collector into project:

    $ mkdir src/data-collector
    $ cd src/data-collector
    $ git clone https://github.com/devonfw/serverless-data-collector.git .

## Database

First of all, download DynamoDB in order to work with it in local: [http://docs.aws.amazon.com/...](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)

### Running DynamoDB Local:

    $ java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar

### Create tables:

Delete all tables:

    $ npm run database-delete

Create all tables:

    $ npm run database-create

Insert all data:

    $ npm run database-seeds

To delete+create+insert data:

    $ npm run database

## Execution

### Build

To compile all typescript sources you should run:

    $ npm run build

or 

    $ yarn build

### Start

To switch on the server and send some http petitions on your localhost (http://localhost:3000), run the command:

    $ npm run start

or

    $ yarn start

Before switch on the server, this command compile all sources too.


### Testing

Not implemented yet.

### Debugging

Not implemented yet.

### Nodemon

Build and monitors the server, with the nodemon command instead of node:

    $ npm run serve

or

    $ yarn run serve
