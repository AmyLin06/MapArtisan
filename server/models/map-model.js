const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mapMetaData = new Schema(
  {
    mapTitle: { type: String, default: "Untitled" },
    likes: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    ownerUsername: { type: String, required: true },
    comments: {
      type: [
        {
          username: String,
          comment: String,
          date: Date,
        },
      ],
      default: [],
    },
    publishedDate: { type: Date, required: false },
    isPublished: { type: Boolean, default: false },
    lastOpened: { type: Date, required: true },
  },
  //timestamps would add a "createdAt" and "updatedAt" field to the document
  { timestamps: true }
);

module.exports = mongoose.model("MapMetaData", mapMetaData);
