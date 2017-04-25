import * as AWS from "aws-sdk";

const creds = new AWS.Credentials("akid", "secret", "session");
const conf = {
    credentials: creds,
    endpoint: "http://localhost:8000/",
    region: "us-west-2",
};

const dynamodb = new AWS.DynamoDB(conf);

const tables = [
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "Dish",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "DishCategory",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "Category",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "DishIngredient",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "Ingredient",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "ReservationMenu",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "Reservation",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "Invitation",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "InvitationGuest",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "User",
    },
    {
        AttributeDefinitions: [
            {
                AttributeName: "Id",
                AttributeType: "S",
            },
        ],
        KeySchema: [
            {
                AttributeName: "Id",
                KeyType: "HASH",
            },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
        TableName: "UserRole",
    },
];

tables.forEach((params) => {
    dynamodb.createTable(params, (err: Error, data: any) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
});