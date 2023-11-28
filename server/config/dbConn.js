const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// MongoDB connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: false, // Set to true if you want retryWrites
};

mongoose.connect(process.env.DB_CONNECT, options).catch((e) => {
  console.error("Connection error", e.message);
});
console.log("Connected to MongoDB...");
const db = mongoose.connection;

module.exports = db;
