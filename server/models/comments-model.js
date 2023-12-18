const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const CommentsSchema = new Schema(
  {
    mapID: { type: mongoose.Schema.Types.ObjectId },
    comments: {
      type: [
        {
          userID: mongoose.Schema.Types.ObjectId,
          username: String,
          comment: String,
          date: Date,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comments", CommentsSchema);
