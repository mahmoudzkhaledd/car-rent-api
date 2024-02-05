const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    leaderId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Leader id is required"],
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User id is required"],
    },
    teamId: {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
        required: [true, "Team id is required"],
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'refused'],
        default: "pending",
    },

}, { timestamps: true, });

module.exports = mongoose.model('Invitation', schema);