const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mapMetaData = new Schema(
  {
    ownerID: { type: mongoose.Schema.Types.ObjectId },
    mapTitle: { type: String, default: "Untitled" },
    template: { type: String, default: "Regular" },
    userLiked: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
        },
      ],
      default: [],
    },
    forks: { type: Number, default: 0 },
    // ownerEmail: { type: String, required: true },
    ownerUsername: { type: String, required: true },
    publishedDate: { type: Date, required: false },
    isPublished: { type: Boolean, default: false },
    lastOpened: { type: Date, required: true },
  },
  //timestamps would add a "createdAt" and "updatedAt" field to the document
  { timestamps: true }
);

module.exports = mongoose.model("MapMetaData", mapMetaData);
