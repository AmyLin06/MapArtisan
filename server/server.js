const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

//sets up express middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));

//set up CORS
const corsOptions = require("./configs/corsOptions");
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://your-frontend.com");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

app.use(express.json());
app.use(cookieParser());

//sets up custom router middleware
const authRoute = require("./routes/auth-router");
app.use("/auth", authRoute);

//setting up an event listener on the db object
//listen for events, and the "error" event is emitted when there is an error with the database connection
const db = require("./configs/dbConn");
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
