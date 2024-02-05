const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    leader: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Team Leader is required"],
    },
    members: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: [true, "Team Leader is required"],
        }],
        default: [],
    },
    name: {
        type: String,
        required: [true, "Team name is required"],
    },
    description: {
        type: String,
        default: "",
    },
    pendingInvitations: {
        type: [{
            type: mongoose.Schema.ObjectId,
            ref: "Invitation",
            required: [true, "Invitation Leader is required"],
        }],
        default: [],
    }
}, { timestamps: true, });

module.exports = mongoose.model('Team', schema);