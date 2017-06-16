import { Credentials } from 'aws-sdk';
import dynamo from '@oasp/oasp4fn/dist/adapters/fn-dynamo';
import fn from '@oasp/oasp4fn';
import * as mock from './mockDatabase';

// Dynamo
let creds;
if (!process.env.MODE || process.env.MODE.trim() !== 'test') {
    creds = new Credentials('akid', 'secret', 'session');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
} else {
    creds = new Credentials('akid2', 'secret2', 'session2');
    fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });
}
// fn.setDB(dynamo, { endpoint: 'http://localhost:8000/', region: 'us-west-2', credentials: creds });

fn.insert('Dish', mock.Dish).then((res: string) => {
    console.log('\nAll dishes inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('Ingredient', mock.Ingredient).then((res: string) => {
    console.log('\nAll ingredients inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('Category', mock.Category).then((res: string) => {
    console.log('\nAll categories inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('DishCategory', mock.DishCategory).then((res: string) => {
    console.log('\nAll dishCategory inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('UserRole', mock.UserRole).then((res: string) => {
    console.log('\nAll User roles inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('User', mock.User).then((res: string) => {
    console.log('\nAll Users inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});

fn.insert('Table', mock.Table).then((res: string) => {
    console.log('\nAll tables inserted');
    console.log(res);
}, (err: Error) => {
    console.error(err);
});