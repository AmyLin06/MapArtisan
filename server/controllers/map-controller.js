const MapMetaData = require("../models/map-model");
const MapGraphic = require("../models/graphic-model");
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

    //create the map meta data object
    const map = new MapMetaData({
      ownerID: user._id,
      ownerUsername: user.userName,
      mapTitle: body.name || "Untitled",
      lastOpened: new Date(),
    });

    user.maps.push(map._id);

    //create the corresponding map graphic object
    const graphic = new MapGraphic({
      ownerID: user._id,
      mapID: map._id,
    });

    // Save the user and the new mapmetadata
    await Promise.all([user.save(), map.save(), graphic.save()]);

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

updateMapMetaData = async (req, res) => {
  console.log("in server update map");
  if (auth.verifyUser(req) === null) {
    return res.status(400).json({
      errorMessage: "UNAUTHORIZED",
    });
  }
  const body = req.body;
  console.log("updateMapMetaData body: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Map",
    });
  }

  try {
    const mapMetaData = await MapMetaData.findOne({ _id: body.mapID });

    if (!mapMetaData) {
      return res.status(404).json({
        errorMessage: "Map not found",
      });
    }

    console.log("map found: " + JSON.stringify(mapMetaData));

    //verify if this user is allowed to make changes to the MapMetaData
    const user = await User.findOne({ _id: mapMetaData.ownerID });
    if (user._id.toString() !== req.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication error" });
    }
    const updateQuery = { $set: body.field };
    const options = { new: true }; // This option returns the updated document
    const updatedDocument = await MapMetaData.findOneAndUpdate(
      { _id: body.mapID },
      updateQuery,
      options
    );

    if (updatedDocument) {
      console.log(`Document ${body.mapID} updated successfully.`);
      return res.status(201).json({
        map: updatedDocument,
      });
    } else {
      console.log(`Document ${body.mapID} not found or no updates applied.`);
      return res.status(400).json({
        errorMessage: "Document not found or no updates applied.",
      });
    }
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      errorMessage: "Error updating map meta data",
    });
  }
};

updateMapGraphicById = async (req, res) => {
  const body = req.body;
  console.log("updateMapGraphic body: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide map graphics",
    });
  }

  try {
    const mapgraphic = await MapGraphic.findOne({ _id: req.params.id });
    console.log("graphic:", mapgraphic);
    if (!mapgraphic) {
      return res.status(404).json({ message: "Map graphics not found!" });
    }

    const user = await User.findOne({ _id: mapgraphic.ownerID });
    if (user._id.toString() !== req.userId) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication error" });
    }

    mapgraphic.layers = body.mapgraphic.layers;
    mapgraphic.markers = body.mapgraphic.markers;
    await mapgraphic.save();

    return res.status(200).json({
      success: true,
      id: mapgraphic._id,
      message: "Map graphic updated successfully!",
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error, message: "Map graphic failed to update successfully!" });
  }
};

getUserMaps = async (req, res) => {
  console.log("in server getUserMaps");

  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(404).json({
        errorMessage: "User not found",
      });
    }

    const mapMetaDataList = user.maps;
    const detailedMapMetaDataList = await Promise.all(
      mapMetaDataList.map(async (mapMetaData) => {
        const detailedMapMetaData = await MapMetaData.findById(mapMetaData._id);
        return detailedMapMetaData;
      })
    );

    return res.status(201).json({
      maps: detailedMapMetaDataList,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      errorMessage: "Error finding user's maps",
    });
  }
};

getMapMetaDataById = async (req, res) => {
  console.log("in server getMapMetaDataById");
  try {
    const detailedMapMetaData = await MapMetaData.findById(req.params.mapId);

    return res.status(201).json({
      map: detailedMapMetaData,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      errorMessage: "Error finding map by ID",
    });
  }
};

getMapGraphicById = async (req, res) => {
  try {
    const mapgraphic = await MapGraphic.findOne({ mapID: req.params.mapId });
    if (!mapgraphic) {
      return res
        .status(400)
        .json({ success: false, error: "Map graphic not found" });
    }
    const user = await User.findOne({ _id: mapgraphic.ownerID });
    if (user._id == req.userId) {
      return res.status(200).json({
        success: true,
        mapgraphic: mapgraphic,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Authentication error" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  createMap,
  deleteMap,
  updateMapMetaData,
  getUserMaps,
  getMapMetaDataById,
  updateMapGraphicById,
  getMapGraphicById,
};
