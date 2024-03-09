const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        enum: ["add_car", "edit_car","rent_car", "finish_rent","active_rent", "remove_rent", "create_team"],
        required: true,
    },
    carId: {
        type: mongoose.Types.ObjectId,
        ref: 'Car',
    },
    rentId: {
        type: mongoose.Types.ObjectId,
        ref: 'Car',
    },
    temId: {
        type: mongoose.Types.ObjectId,
        ref: 'Car',
    },

}, { timestamps: true, });

module.exports = mongoose.model('History', schema);