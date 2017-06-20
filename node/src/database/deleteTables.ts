import * as AWS from 'aws-sdk';
import { databaseURL } from '../config';
/*
const creds = new AWS.Credentials('akid', 'secret', 'session');
const conf = {
    credentials: creds,
    endpoint: 'http://localhost:8000/',
    region: 'us-west-2',
};

const dynamodb = new AWS.DynamoDB(conf);*/

let creds;
let conf;
if (!process.env.MODE || process.env.MODE.trim() !== 'test') {
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

/*
const tables = [
    {
        TableName: "Category",
    },
    {
        TableName: "DishCategory",
    },
    {
        TableName: "Dish",
    },
    {
        TableName: "DishIngredient",
    },
    {
        TableName: "Ingredient",
    },
    {
        TableName: "ReservationMenu",
    },
    {
        TableName: "Reservation",
    },
    {
        TableName: "Invitation",
    },
    {
        TableName: "InvitationGuest",
    },
    {
        TableName: "User",
    },
    {
        TableName: "UserRole",
    },
];

tables.forEach((params) => {
    dynamodb.deleteTable(params, (err: Error, data: any) => {
        if (err) {
            console.error("Unable to delete table. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
});*/

dynamodb.listTables().eachPage((err, data) => {
    if (err) {
        console.error(err); // an error occurred
        return false;
    } else if (data && data.TableNames) {
        data.TableNames.map((elem) => {
            return {
                TableName: elem,
            };
        }).forEach((params) => {
            dynamodb.deleteTable(params, (err2: Error, data2: any) => {
                if (err2) {
                    console.error('Unable to delete table. Error JSON:', JSON.stringify(err2, null, 2));
                }
            });
        });
    }

    return true;
});