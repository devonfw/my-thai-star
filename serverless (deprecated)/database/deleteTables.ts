import * as AWS from 'aws-sdk';
import { databaseURL } from '../src/config';

const mode = process.argv[2] || undefined;

if (mode) process.env.MODE = mode;

function deleteTables() {
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
}

deleteTables();
process.env.MODE = undefined;