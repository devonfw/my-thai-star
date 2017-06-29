
export interface Context {  
    done: Function,
    succed: Function,
    fail: Function,
    getRemainigTimeInMillis: Function,
    functionName: string,
    memoryLimitInMB: number,
    functionVersion: string,
    invokedFunctionArn: string,
    awsRequestId: string,
    logGroupName: string,
    logStreamName: string,
    identity: object,
    clientContext: object
}

export interface HttpEvent {  
  method: string;
  path: {[name: string]: string};
  body: any;
  query: {[name: string]: string};
  headers: { [key: string]: string; };
}

export interface S3Event {  
    Records: S3Record[]
}

interface S3Record {
    eventVersion: string;
    eventTime: string;
    requestParameters: {sourceIPAddress: string};
    s3: S3Info;
    responseElements: {'x-amz-id-2': string, 'x-amz-request-id': string};
    awsRegion: string;
    eventName: string,
    userIdentity: {principalId: string};
    eventSource: string;
}

interface S3Info {
    configurationId: string;
    object: {sequencer: string, key: string};
    bucket: {
        arn: string,
        name: string,
        ownerIdentity: {principalId: string};
    };
    s3SchemaVersion: string; 
}

export interface Login {
    user: string;
    password: string;
}
