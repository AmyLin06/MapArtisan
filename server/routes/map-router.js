const express = require("express");
// const app = express();
// const UserModel = require("../models/user-model");
const router = express.Router();
const MapController = require("../controllers/map-controller");
const auth = require("../auth");

// router.route("/get-users").get((req, res) => {
//   UserModel.find({})
//     .then(function (users) {
//       res.json(users);
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// });

router.post("/create", auth.verify, MapController.createMap);
router.put("/updatemetadata", auth.verify, MapController.updateMapMetaData);
router.put(
  "/updategraphic/:id",
  auth.verify,
  MapController.updateMapGraphicById
);
router.get("/usermaps", auth.verify, MapController.getUserMaps);
router.get("/mapgraphic/:mapId", auth.verify, MapController.getMapGraphicById);
router.get("/mapById/:mapId", auth.verify, MapController.getMapMetaDataById);

module.exports = router;
