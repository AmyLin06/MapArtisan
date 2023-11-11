const express = require("express");
const PORT = 4000;

const app = express();

//sets up middleware
app.use(express.json());

app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
