const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mapSchema = new Schema(
  {
    mapTitle: { type: String, default: "Untitled" },
    // mapPic: { type: ImageSchema, required: true },
    likes: { type: Number, default: 0 },
    forks: { type: Number, default: 0 },
    ownerUsername: { type: String, required: true },
    // layers: {
    //   type: [
    //     {
    //       layerName: String,
    //       data: Buffer,
    //     },
    //   ],
    //   required: true,
    //   default: [],
    // },
    comments: {
      type: [
        {
          userName: String,
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

module.exports = mongoose.model("Map", mapSchema);
