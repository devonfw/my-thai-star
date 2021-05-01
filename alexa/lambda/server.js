const net = require('net');
const server = net.createServer();
const {handler} = require("./index")

const PORT = 3001;
const HOST_NAME = "localhost"
const HTTP_HEADER_DELIMITER = '\r\n';
const HTTP_BODY_DELIMITER = '\r\n\r\n';

server.listen(PORT, HOST_NAME, () => {
    console.log(`Starting server on port ${PORT}.`);
});

server.on('connection', (socket) => {
    console.log(`Connection from: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.on('data', (data) => {
        const body = JSON.parse(data.toString().split(HTTP_BODY_DELIMITER).pop());
        handler(body, null, (_invokeErr, response) => {
            response = JSON.stringify(response);
            socket.write(`HTTP/1.1 200 OK${HTTP_HEADER_DELIMITER}Content-Type: application/json;charset=UTF-8${HTTP_HEADER_DELIMITER}Content-Length: ${response.length}${HTTP_BODY_DELIMITER}${response}`);
        });
    });
});