const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

dotenv.config()
const PORT = process.env.PORT || 4000;
const app = express();

//sets up middleware
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

//sets up custom router middleware
const authRoute = require("./routes/auth-router");
app.use("/auth", authRoute);
// const mapRoute = require('./routes/map-router')
// app.use('/', mapRoute);


const db = require('./db')
db.on('error', console.error.bind(console, 'MongoDB connection error:'))


// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



