const AWS = require("aws-sdk");
const config = require("./config");
const http = require("http");
const { CognitoIdentity } = require("aws-sdk");

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

module.exports.createReservation = (
  name,
  email,
  date,
  assistants,
  delivery
) => {

  return new Promise((resolve, reject) => {
    date = new Date(date);
    const body = JSON.stringify({
      booking: {
        bookingDate: date.toISOString(),
        name,
        email,
        assistants: assistants,
        delivery: delivery,
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

      let responseObjectString = '';
      res.on("data", (d) => {
        responseObjectString += d.toString();
        process.stdout.write(d);
      });
      res.on("end", (d) => {
        resolve(JSON.parse(responseObjectString));
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
};

module.exports.createDelivery = async (name, email, orderlines, address) => {
  let today = new Date();
  let todayIn2Mins = new Date(today.setMinutes(today.getMinutes() + 2));
  let reservation = await this.createReservation(
    name,
    email,
    todayIn2Mins.toISOString(),
    1,
    true
  );

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      booking: {
        bookingToken: reservation.bookingToken,
      },
      address: address,
      orderLines: orderlines.map((el) => {
        return {
          orderLine: { dishId: el.dish.id, amount: el.amount, comment: "" },
          extras: [],
        };
      }),
    });
    const options = {
      port: config.myThaiStarBackend.port,
      path: config.myThaiStarBackend.createOrderEndpoint,
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

module.exports.createOrder = async (
  name,
  email,
  orderlines,
  combinedDate,
  assistants
) => {
  let reservation = await this.createReservation(
    name,
    email,
    combinedDate,
    assistants,
    false
  );

  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      booking: {
        bookingToken: reservation.bookingToken,
      },
      orderLines: orderlines.map((el) => {
        return {
          orderLine: { dishId: el.dish.id, amount: el.amount, comment: "" },
          extras: [],
        };
      }),

    });
    const options = {
      port: config.myThaiStarBackend.port,
      path: config.myThaiStarBackend.createOrderEndpoint,
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

module.exports.getActiveOrders = async (emailC) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      email: emailC,
    });
    const options = {
      port: config.myThaiStarBackend.port,
      path: config.myThaiStarBackend.getActiveOrdersEndpoint,

      method: "POST",
      host: config.myThaiStarBackend.host,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    };

    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      let responseObjectString = "";
      res.on("data", (d) => {
        responseObjectString += d.toString();
        process.stdout.write(d);
      });
      res.on("end", (d) => {
        resolve(JSON.parse(responseObjectString));

      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
};
module.exports.getDishes = async (size, number) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      categories:[],
      pageable:{
        pageSize: size,
        pageNumber: number,
        sort: []
      }
    });
    const options = {
      port: config.myThaiStarBackend.port,
      path: config.myThaiStarBackend.getDishesEndpoint,

      method: "POST",
      host: config.myThaiStarBackend.host,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length,
      },
    };

    const req = http.request(options, (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      let responseObjectString = "";
      res.on("data", (d) => {
        responseObjectString += d.toString();
        process.stdout.write(d);
      });
      res.on("end", (d) => {
        resolve(JSON.parse(responseObjectString));

      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(body);
    req.end();
  });
}