import * as AWS from 'aws-sdk';

const creds = new AWS.Credentials('akid', 'secret', 'session');
const conf = {
    credentials: creds,
    endpoint: 'http://localhost:8000/',
    region: 'us-west-2',
};

const dynamodb = new AWS.DynamoDB(conf);

const tables = [
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Dish',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Category',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Ingredient',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'OrderDishExtraIngredient',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Invitation',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'InvitationGuest',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'User',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'UserRole',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'OrderLine',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Order',
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: 'id',
                AttributeType: 'S',
            },
        ],
        KeySchema: [
            {
                AttributeName: 'id',
                KeyType: 'HASH',
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: 'Reservation',
    },
];

tables.forEach((params) => {
    dynamodb.createTable(params, (err: Error, data: any) => {
        if (err) {
            console.error('Unable to create table ' + params.TableName + '. Error JSON:', JSON.stringify(err, null, 2));
        } /*else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }*/
    });
});
