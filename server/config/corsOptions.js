const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: (origin, callback) => {
    console.log("DEBUG request origin: ", origin);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("OMG Not allowed by CORS :("));
    }
  },
  credentials: true,
};

module.exports = corsOptions;
