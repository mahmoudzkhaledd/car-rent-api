const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "user id is required"],
    },
    packageId: {
        type: mongoose.Schema.ObjectId,
        ref: "Package",
        required: [true, "package id is required"],
    },
}, { timestamps: true, });

module.exports = mongoose.model('Order', schema);