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
        } else {
            console.log("Deleted table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
})