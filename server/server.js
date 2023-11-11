const express = require("express");
const PORT = 4000;

const app = express();

//sets up middleware
app.use(express.json());

//sets up custom router middleware
const authRoute = require("./routes/auth-router");
app.use("/api", authRoute);

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
