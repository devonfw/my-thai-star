import * as AWS from 'aws-sdk';
import { databaseURL } from '../src/config';

const mode = process.argv[2] || undefined;

if (mode) process.env.MODE = mode;

function createTables() {
    let creds;
    let conf;
    if (!process.env.MODE || process.env.MODE!.trim() !== 'test') {
        creds = new AWS.Credentials('akid', 'secret', 'session');
        conf = {
            credentials: creds,
            endpoint: databaseURL,
            region: 'us-west-2',
        };
    } else {
        creds = new AWS.Credentials('akid2', 'secret2', 'session2');
        conf = {
            credentials: creds,
            endpoint: databaseURL,
            region: 'us-west-2',
        };
    }

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
            TableName: 'DishCategory',
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
            TableName: 'InvitedGuest',
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
            TableName: 'Booking',
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
            TableName: 'Table',
        },
    ];

    tables.forEach((params) => {
        dynamodb.createTable(params, (err: Error, data2: any) => {
            if (err) {
                console.error('Unable to create table ' + params.TableName + '. Error JSON:', JSON.stringify(err, null, 2));
            } /*else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }*/
        });
    });
}

createTables();
process.env.MODE = undefined;