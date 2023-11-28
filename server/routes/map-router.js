const express = require("express");
const app = express();
const UserModel = require("../models/user_model");
const router = express.Router();
const MapController = require("../controllers/map-controller");
const auth = require("../auth");

router.route("/get-users").get((req, res) => {
  UserModel.find({})
    .then(function (users) {
      res.json(users);
    })
    .catch(function (err) {
      console.log(err);
    });
});

module.exports = router;
