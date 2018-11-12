import { Credentials, DynamoDB } from 'aws-sdk';
import dynamo from '@oasp/oasp4fn/dist/adapters/fn-dynamo';
import oasp4fn from '@oasp/oasp4fn';
import * as mock from './mockDatabase';
import * as _ from 'lodash';
import { databaseURL } from '../src/config';

const mode = process.argv[2] || undefined;

if (mode) process.env.MODE = mode;

function deleteData() {
    let dynamodb: DynamoDB;

    let creds;
    if (!process.env.MODE || process.env.MODE!.trim() !== 'test') {
        creds = new Credentials('akid', 'secret', 'session');
        oasp4fn.setDB(dynamo, { endpoint: databaseURL, region: 'us-west-2', credentials: creds });
        dynamodb = new DynamoDB({ endpoint: databaseURL, region: 'us-west-2', credentials: creds });
    } else {
        creds = new Credentials('akid2', 'secret2', 'session2');
        oasp4fn.setDB(dynamo, { endpoint: databaseURL, region: 'us-west-2', credentials: creds });
        dynamodb = new DynamoDB({ endpoint: databaseURL, region: 'us-west-2', credentials: creds });
    }

    dynamodb.listTables().eachPage((err, data) => {
        if (err) {
            console.error(err); // an error occurred
            return false;
        } else if (data && data.TableNames) {
            data.TableNames.forEach((name) => {
                oasp4fn.table(name).map((elem: { id: string }) => elem.id).promise().then((res: string[]) => {
                    let cp = [...res];
                    while (cp.length > 0) {
                        if (cp.length <= 25) {
                            const n = [...cp];
                            cp = [];
                            oasp4fn.delete(name, n).promise().then((res2) => {
                                console.log('Data from table ' + name + ' has been deleted');
                            }, (err2) => {
                                console.error(err2);
                            });
                        } else {
                            const n = _.slice(cp, 0, 25);
                            cp = _.slice(cp, 25, cp.length);
                            oasp4fn.delete(name, n).promise().then((res2) => {
                                console.log('Data from table ' + name + ' has been deleted');
                            }, (err2) => {
                                console.error(err2);
                            });
                        }
                    }
                }, (err2) => {
                    console.error(err2);
                });
            });
        }

        return true;
    });
}

deleteData();
process.env.MODE = undefined;