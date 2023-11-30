const MapMetaData = require("../models/map-model");
const User = require("../models/user-model");
const auth = require("../auth");

createMap = async (req, res) => {
  console.log("in server create map");
  if (auth.verifyUser(req) === null) {
    return res.status(400).json({
      errorMessage: "UNAUTHORIZED",
    });
  }
  const body = req.body;
  console.log("createMap body: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Map",
    });
  }

  try {
    const user = await User.findOne({ email: body.ownerEmail });

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    console.log("user found: " + JSON.stringify(user));

    const map = new MapMetaData({
      ownerID: user._id,
      ownerUsername: user.userName,
      mapTitle: body.name || "Untitled",
      lastOpened: new Date(),
    });

    user.maps.push(map._id);

    // Save the user and the new mapmetadata
    await Promise.all([user.save(), map.save()]);

    console.log("map: " + map.toString());

    return res.status(201).json({
      map: map,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      errorMessage: "Error creating map",
    });
  }
};

deleteMap = async (req, res) => {
  if (auth.verifyUser(req) === null) {
    return res.status(400).json({
      errorMessage: "UNAUTHORIZED",
    });
  }
  console.log("delete map with id: " + JSON.stringify(req.params.id));
  console.log("delete " + req.params.id);
  Map.findById({ _id: req.params.id }, (err, map) => {
    console.log("map found: " + JSON.stringify(map));
    if (err) {
      return res.status(404).json({
        errorMessage: "Map not found!",
      });
    }

    // DOES THIS LIST BELONG TO THIS USER?
    async function asyncFindUser(map) {
      User.findOne({ _id: map.ownerID }, (err, user) => {
        console.log("user._id: " + user._id);
        if (user._id == req.ownerId) {
          console.log("correct user!");
          Playlist.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({});
          }).catch((err) => console.log(err));
        } else {
          console.log("incorrect user!");
          return res.status(400).json({
            errorMessage: "authentication error",
          });
        }
      });
    }
    asyncFindUser(map);
  });
};

module.exports = {
  createMap,
  deleteMap,
};
