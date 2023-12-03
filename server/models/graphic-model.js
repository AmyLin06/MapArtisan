const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GraphicSchema = new Schema(
  {
    ownerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mapID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MapMetaData",
      required: true,
    },
    layers: {
      type: [{ layerName: String, layerType: String, data: Buffer }],
      default: [],
    },
    markers: {
      type: [{ iconKey: String, coordinates: { lat: Number, lng: Number } }],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mapgraphics", GraphicSchema);
