export const config: any = {
    pageSizes: [8, 16, 24],
    pageSizesDialog: [4, 8, 12],
    roles: [
        {name: 'CUSTOMER', permission: 0},
        {name: 'WAITER', permission: 1},
    ],
};

export enum BackendType {
    IN_MEMORY,
    REST,
    GRAPHQL,
}

export class BackendConfig {
    environmentType: BackendType;
    restServiceRoot: string;
}


export class AuthenticationConfig {
  domain:string;
  client_id:string;
  redirect_uri:string;
  signin_id:string;
  signin_po:string;
  signup_po:string;
  reset_po:string;
  editprofile:string;
};

let redirect_uri="http://localhost:4200/loginCallback";
let domain="devonb2c.onmicrosoft.com"
let client_id="27b353b1-bd61-4698-b8dd-297a6ab97781";
let signin_id="8b78701a-b914-4374-be76-2dbd15f42cd5";
let signin_po="B2C_1_signin";
let signup_po="B2C_1_signup";
let reset_po="B2C_1_resetpw";
let editprofile="B2C_1_profile";
export const authenticationConfig: AuthenticationConfig = {editprofile:editprofile, reset_po:reset_po,signin_po:signin_po,signup_po:signup_po,domain:domain, redirect_uri:redirect_uri, client_id:client_id, signin_id:signin_id};