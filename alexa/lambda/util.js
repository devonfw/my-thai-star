const AWS = require("aws-sdk");
const config = require("./config");
const http = require("http");

const s3SigV4Client = new AWS.S3({
  signatureVersion: "v4",
});

module.exports.getS3PreSignedUrl = function getS3PreSignedUrl(s3ObjectKey) {
  const bucketName = process.env.S3_PERSISTENCE_BUCKET;
  const s3PreSignedUrl = s3SigV4Client.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: s3ObjectKey,
    Expires: 60 * 1, // the Expires is capped for 1 minute
  });
  console.log(`Util.s3PreSignedUrl: ${s3ObjectKey} URL ${s3PreSignedUrl}`);
  return s3PreSignedUrl;
};

module.exports.createReservation = (name, email, date) => {
  return new Promise((resolve, reject) => {
    date = new Date(date);
    console.log(date);
    const body = JSON.stringify({
      booking: {
        bookingDate: date.toISOString(),
        name,
        email,
        assistants: 1,
      },
    });

    const options = {
      port: config.myThaiStarBackend.port,
      path: config.myThaiStarBackend.createBookingEndpoint,
      method: "POST",
      host: config.myThaiStarBackend.host,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    };

    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      res.on("data", (d) => {
        process.stdout.write(d);
      });
      res.on("end", (d) => {
        resolve();
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
};
