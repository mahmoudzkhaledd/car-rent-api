const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User Id is required !"],
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required !"],
    },
    model: {
        type: String,
        trim: true,
        required: [true, "Model is required !"],
    },
    panelNumber: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Panel Number is required !"],
    },

    images: [{
        type: mongoose.Schema.ObjectId,
        ref: "Image",
    }],
    thumbnailImage: {
        type: mongoose.Schema.ObjectId,
        ref: "Image",
    },
    notes: {
        type: String,
        default: "",
        trim: true,
    },
}, { timestamps: true, });

module.exports = mongoose.model('Car', schema);