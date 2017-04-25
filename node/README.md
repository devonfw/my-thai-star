## Installation

### Dependencies

No more dependencies out of the package.json are needed, so the first command required for the installation is:

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
