const express = require("express");
const router = express.Router();

router.post("/user", (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
