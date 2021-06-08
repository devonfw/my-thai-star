/*
 * Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/* ## DEPRECATION NOTICE

This script has been deprecated and is no longer supported. 
Please use the [ASK Toolkit for VS Code]
(https://marketplace.visualstudio.com/items?itemName=ask-toolkit.alexa-skills-kit-toolkit), 
which provides a more end-to-end integration with Visual Studio Code. If you 
use another editor/IDE, please check out the [ASK SDK Local Debug package at npm]
(https://www.npmjs.com/package/ask-sdk-local-debug).

*/

const net = require("net");
const fs = require("fs");
const bodyParser = require("body-parser");

const localDebugger = net.createServer();

var express = require("express");
const app = express();
const port = 3001;

app.use(bodyParser.json());
const skillInvoker = require(getAndValidateSkillInvokerFile());

const HTTP_HEADER_DELIMITER = "\r\n";
const HTTP_BODY_DELIMITER = "\r\n\r\n";
const DEFAULT_HANDLER_NAME = "handler";
const lambdaHandlerName = getLambdaHandlerName();

app.post("/", (req, res) => {
  const body = req.body;
  console.log(`Request envelope: ${JSON.stringify(body)}`);
  skillInvoker[lambdaHandlerName](body, null, (_invokeErr, response) => {
    res.send(JSON.stringify(response));
    console.log(`Response envelope: ${JSON.stringify(response)}`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


function getAndValidateSkillInvokerFile() {
    const fileNameArgument = getArgument('skillEntryFile');
    if (!fs.existsSync(fileNameArgument)) {
        throw new Error(`File not found: ${fileNameArgument}`);
    }
    return fileNameArgument;
}

function getLambdaHandlerName() {
    return getArgument('lambdaHandler', DEFAULT_HANDLER_NAME);
}

function getArgument(argumentName, defaultValue) {
    const index = process.argv.indexOf(`--${argumentName}`);
    if (index === -1 || typeof process.argv[index + 1] === 'undefined') {
        if (defaultValue === undefined) {
            throw new Error(`Required argument - ${argumentName} not provided.`);
        } else {
            return defaultValue;
        }
    }
    return process.argv[index + 1];
}