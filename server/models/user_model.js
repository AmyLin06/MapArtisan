const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const UserSchema = new Schema(
    {
        userName: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        passwordHash: { type: String, required: true },
        maps: [{type: ObjectId, ref: 'Map'}],
        profilePictureUrl:{ type: String},
        // profilePicture: { type: ObjectId, ref: 'Image' }
        //maybe we need a file storage service Amazon S3
        //The String store the URL
    },
    { timestamps: true },
)

module.exports = mongoose.model('User', UserSchema)
