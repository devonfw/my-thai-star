import { Credentials, DynamoDB } from 'aws-sdk';
import dynamo from '@oasp/oasp4fn/dist/adapters/fn-dynamo';
import fn from '@oasp/oasp4fn';
import * as mock from './mockDatabase';

// Dynamo

let dynamodb: DynamoDB;

let creds;
if (!process.env.MODE || process.env.MODE.trim() !== 'test') {
    creds = new Credentials('akid', 'secret', 'session');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
    dynamodb = new DynamoDB({ endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
} else {
    creds = new Credentials('akid2', 'secret2', 'session2');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
    dynamodb = new DynamoDB({ endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
}

dynamodb.listTables().eachPage((err, data) => {
    if (err) {
        console.error(err); // an error occurred
        return false;
    } else if (data && data.TableNames) {
        data.TableNames.forEach((name) => {
            fn.table(name).project('id').delete().promise().then((res) => {
                console.log('Data from table ' + name + ' has been deleted');
            }, (err) => {
                console.error(err);
            });
        });
    }

    return true;
});