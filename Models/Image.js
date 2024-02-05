const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required !"],
    },
    carId: {
        type: mongoose.Schema.ObjectId,
        ref: "Car",
    },
    type: {
        type: String,
        enum: ["thumbnail", 'image',"profileImage"],
    },
    asset_id: String,
    public_id: String,
    version: String,
    version_id: String,
    signature: String,
    width: Number,
    height: Number,
    format: String,
    resource_type: String,
    created_at: String,
    tags: [String],
    bytes: Number,
    type: String,
    etag: String,
    placeholder: Boolean,
    url: String,
    secure_url: String,
    folder: String,
    original_filename: String,
    api_key: String,
}, { timestamps: true, });

module.exports = mongoose.model('Image', schema);