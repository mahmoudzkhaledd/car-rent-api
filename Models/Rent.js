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
        index: true,
        required: [true, "Car Id is required !"],
    },
    startingDate: {
        type: String,
        trim: true,
        required: [true, "Starting Date is required !"],
    },
    finished: {
        type: Boolean,
        default: false,
    },
    endingDate: {
        type: String,
        trim: true,
        required: [true, "Ending Date is required !"],
    },
    clientName: {
        type: String,
        trim: true,
        required: [true, "Client Name is required !"],
    },
    clientPhone: {
        type: String,
        trim: true,
        required: [true, "Client Phone is required !"],
    },
    clientIdentity: {
        type: String,
        trim: true,
        required: [true, "Client Identity is required !"],
    },
    totalPrice: {
        type: Number,

        required: [true, "Total Price is required !"],
    },
    paidPrice: {
        type: Number,
        required: [true, "Paid Price is required !"],
    },
    remainingPrice: {
        type: Number,
        required: [true, "Remaining Price is required !"],
    },

}, { timestamps: true, });

module.exports = mongoose.model('Rent', schema);