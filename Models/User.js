const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First Name is required!"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last Name is required!"]
    },
    companyName: {
        type: String,
        trim: true,
        required: [true, "Company Name is required!"]
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"]
    },
    phone: {
        type: String,
        trim: true,
        required: [true, "Phone is required!"]
    },
    birthdate: {
        type: String,
        trim: true,
        required: [true, "Birthdate is required!"]
    },
    gender: {
        type: Boolean,
        required: [true, "Gender is required!"]
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    leadingTeam: {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
        default: null,
    },
    team: {
        type: mongoose.Schema.ObjectId,
        ref: "Team",
        default: null,
    },
    banned: {
        type: Boolean,
        default: false,
    },
    package: {
        type: mongoose.Schema.ObjectId,
        ref: "Package",
        default: null,
    },
    profilePic: String,
}, { timestamps: true, });

module.exports = mongoose.model('User', schema);