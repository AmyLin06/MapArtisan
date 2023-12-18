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
    } else if (user._id != req.userId) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Authentication error" });
    }

    console.log("user found: " + JSON.stringify(user));

    //create the map meta data object
    const map = new MapMetaData({
      ownerID: user._id,
      template: body.template,
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

duplicateMap = async (req, res) => {
  console.log("in server duplicate map");
  const body = req.body;
  console.log("duplicateMap body: " + JSON.stringify(body));
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a Map",
    });
  }

  try {
    const user = await User.findOne({ email: body.ownerEmail });
    const mapMetaData = await MapMetaData.findById(body.mapId);
    const mapgraphic = await MapGraphic.findOne({ mapID: body.mapId });

    console.log("mapMetaData: ");
    console.log(mapMetaData);
    if (!user || !mapMetaData || !mapgraphic) {
      return res.status(404).json({
        errorMessage: "Missing necessary information to duplicate",
      });
    } else if (!mapMetaData.isPublished) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Authentication error" });
    }

    console.log("user found: " + JSON.stringify(user));

    //create the map meta data object
    const map = new MapMetaData({
      ownerID: user._id,
      ownerUsername: user.userName,
      mapTitle: mapMetaData.mapTitle,
      lastOpened: new Date(),
    });

    user.maps.push(map._id);

    //create the corresponding map graphic object
    const graphic = new MapGraphic({
      ownerID: user._id,
      mapID: map._id,
      layers: mapgraphic.layers,
      markers: mapgraphic.markers,
    });
    mapMetaData.forks = mapMetaData.forks + 1; //increment the number of forks

    // Save the user and the new mapmetadata
    await Promise.all([
      user.save(),
      map.save(),
      graphic.save(),
      mapMetaData.save(),
    ]);
    console.log("map: " + map.toString());

    return res.status(201).json({
      map: map,
    });
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      errorMessage: "Error duplicating map",
    });
  }
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
    if (user._id.toString() !== req.userId && !body.field.userLiked) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication error" });
    }

    let updateQuery = { $set: body.field };
    const options = { new: true }; // This option returns the updated document

    //used for liking/un-liking a map
    if (body.field.userLiked) {
      let userLikedList = mapMetaData.userLiked;

      //check if the user has already liked this map
      const existingUserIndex = userLikedList.findIndex(
        (userId) => userId.toString() === req.userId.toString()
      );

      if (existingUserIndex !== -1) {
        //remove the user from the array
        userLikedList = userLikedList.filter(
          (userId) => userId.toString() !== req.userId.toString()
        );
      } else userLikedList.push(body.field.userLiked[0]);
      updateQuery = {
        $set: {
          userLiked: userLikedList,
        },
      };
    }

    //update document
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

    //user is asking for their own maps
    let detailedMapMetaDataList;
    if (user.email == req.params.userEmail) {
      const mapMetaDataList = user.maps;
      detailedMapMetaDataList = await Promise.all(
        mapMetaDataList.map(async (mapMetaData) => {
          const detailedMapMetaData = await MapMetaData.findById(
            mapMetaData._id
          );
          return detailedMapMetaData;
        })
      );
    } else {
      //asking for another user's maps -> can only view their published maps
      detailedMapMetaDataList = await MapMetaData.find({
        $and: [{ ownerID: req.userId }, { isPublished: true }],
      });
    }

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

getCommunityMaps = async (req, res) => {
  console.log("in server getCommunityMaps");

  try {
    const detailedMapMetaDataList = await MapMetaData.find({
      isPublished: true,
    });

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

getPublishedMapsByUserId = async (req, res) => {};

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
    const detailedMapMetaData = await MapMetaData.findById(req.params.mapId);

    //user is asking for their own maps OR graphics of another user's published map
    if (user._id == req.userId || detailedMapMetaData.isPublished) {
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

deleteMap = async (req, res) => {
  try {
    const mapMetaData = await MapMetaData.findOne({ _id: req.params.mapId });
    if (!mapMetaData) {
      return res.status(404).json({ errorMessage: "Map not found!" });
    }
    const user = await User.findOne({ _id: mapMetaData.ownerID });
    if (user._id.toString() !== req.userId) {
      return res.status(400).json({ errorMessage: "Authentication error" });
    }

    await MapMetaData.findOneAndDelete({ _id: req.params.mapId });
    await MapGraphic.findOneAndDelete({ mapID: req.params.mapId });
    user.maps = user.maps.filter(
      (mapId) => mapId.toString() !== req.params.mapId
    );
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Map sucessfully deleted!",
    });
  } catch (error) {
    return res.status(500).json({ errorMessage: "Internal server error" });
  }
};

isLikedMap = async (req, res) => {
  try {
    const mapMetaData = await MapMetaData.findOne({ _id: req.params.mapId });
    console.log("meta data:", mapMetaData);
    if (!mapMetaData) {
      return res.status(404).json({ message: "Map not found!" });
    }

    const user = await User.findOne({ _id: req.userId });
    if (user._id.toString() !== req.userId && !mapMetaData.isPublished) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication error" });
    }

    let userLikedList = mapMetaData.userLiked;
    let isLiked = false;
    //check if the user has already liked this map
    const existingUserIndex = userLikedList.findIndex(
      (userId) => userId.toString() === user._id.toString()
    );

    if (existingUserIndex !== -1) {
      //user has liked this map before
      isLiked = true;
    }

    return res.status(201).json({
      success: true,
      isLiked: isLiked,
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: "Unable to check if this user has liked this map",
    });
  }
};

module.exports = {
  createMap,
  duplicateMap,
  deleteMap,
  updateMapMetaData,
  getUserMaps,
  getCommunityMaps,
  getMapMetaDataById,
  updateMapGraphicById,
  getMapGraphicById,
  isLikedMap,
};
