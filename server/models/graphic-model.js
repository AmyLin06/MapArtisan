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
      type: [
        {
          filename: String,
          fileRef: String,
          polygonColorStyle: [
            { layerKey: Number, color: String, border: String },
          ],
        },
      ],
      default: [],
    },
    markers: {
      type: [
        {
          iconKey: String,
          coordinates: { lat: Number, lng: Number },
          message: String,
          draggable: Boolean,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mapgraphics", GraphicSchema);
