const mongoose = require('mongoose');

const packageAdvantgeSchema = new mongoose.Schema({
    active: {
        type: Boolean,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true, });


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    advantages: {
        type: [{
            type: packageAdvantgeSchema,
            required: true,
        }],
        required: [true, "name is required"],
    },
    price: {
        type: Number,
        default: 0,
    },
}, { timestamps: true, });

module.exports = mongoose.model('Package', schema);