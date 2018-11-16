## Installation

### Dependencies

No more dependencies out of the package.json are needed, so the first command required for the installation is:

    $ npm install

or

    $ yarn

Although, for the environment to work properly, some packages have to be installed globally, so you have to execute these commands next:

    $ npm install -g typescript ts-node mocha serverless nodemon

### Database dependencies

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

### OASP4Fn

Execute the command:

    $ npm run fun

This command will generate the necessary files to deploy and build your handlers.

### Start

Execute the command:

    $ npm run offline

## Testing

Before execute any test, you must create a new database for this purpose:

    $ npm run database:test

or

    $ yarn database:test

Then, you can test the correct behaviour of the business logic using the command:

    $ npm run test

Also, you can visualize if some of the changes are going wrong when you save it, without executing every time the previous command, to do this you can run the next command on a new shell:

    $ npm run test:auto