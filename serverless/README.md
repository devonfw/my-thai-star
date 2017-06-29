## Installation

### Database dependencies

This server uses the same database that node backend, so, first of all you must change to node directory and follow the instructions in order to install the database.

### Dependencies

No more dependencies out of the package.json are needed, so the first command required for the installation is:

    $ npm install

or

    $ yarn

Although, for the environment to work properly, some packages have to be installed globally, so you have to execute these commands next:

    $ npm install -g typescript ts-node mocha serverless nodemon

## Execution

### OASP4Fn

Execute the command:

    $ npm run fun

This command will generate the necessary files to deploy and build your handlers.

### Start

Execute the command:

    $ npm run offline

### Testing

You can test the correct behaviour of the business logic using the command:

    $ npm run test

Also, you can visualize if some of the changes are going wrong when you save it, without executing every time the previous command, to do this you can run the next command on a new shell:

    $ npm run test:auto