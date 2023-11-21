const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  filename: String,
  s3Url: String, // Store the S3 URL or key
  // Other metadata fields
});

module.exports = mongoose.model('Image', ImageSchema);
