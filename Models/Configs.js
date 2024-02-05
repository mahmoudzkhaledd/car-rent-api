const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    shareTemplateSteps: [{
        text: String,
        time: String,
    }],

}, { timestamps: true, });

module.exports = mongoose.model('Configs', schema);