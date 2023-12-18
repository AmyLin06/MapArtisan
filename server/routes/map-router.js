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
router.post("/message", auth.verify, MapController.message);
router.put(
  "/updategraphic/:id",
  auth.verify,
  MapController.updateMapGraphicById
);
router.get("/usermaps/:userEmail", auth.verify, MapController.getUserMaps);
router.get("/profilemaps/:id", auth.verify, MapController.getProfileMaps);

router.get("/mapgraphic/:mapId", auth.verify, MapController.getMapGraphicById);
router.get("/mapById/:mapId", auth.verify, MapController.getMapMetaDataById);
router.get("/communitymaps", auth.verify, MapController.getCommunityMaps);
router.delete("/deletemap/:mapId", auth.verify, MapController.deleteMap);
module.exports = router;
