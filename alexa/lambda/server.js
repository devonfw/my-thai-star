const { handler } = require("./index");
const bodyParser = require("body-parser");
var express = require("express");

const PORT = 3001;

const app = express();
app.use(bodyParser.json());

app.post("/", (req, res) => {
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Revieved request from ${ip}`)
  const body = req.body;
  handler(body, null, (_invokeErr, response) => {
    res.send(JSON.stringify(response));
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
