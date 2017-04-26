import { Credentials } from "aws-sdk";
import * as dynamo from "./data-collector/src/adapters/fn-dynamo";
import * as s3 from "./data-collector/src/adapters/fn-s3";
import fn from "./data-collector/src/index";

// Dynamo
const creds = new Credentials("akid", "secret", "session");
fn.setDB(dynamo, { endpoint: "http://localhost:8000/", region: "us-west-2", credentials: creds });

export default{
    getDihses: async (callback: Function) => {
        try{
            let res = await fn.table('Dish').promise();

            callback(null, res);
        }catch(err){
            callback(err);
        }
    }
}