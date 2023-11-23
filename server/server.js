const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

//set up CORS
const corsOptions = require("./configs/corsOptions");
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes

//sets up express middleware to parse incoming requests
app.use(express.urlencoded({ extended: true }));

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
