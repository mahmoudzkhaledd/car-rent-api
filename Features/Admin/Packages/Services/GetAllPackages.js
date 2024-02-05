const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.getAllPackages = asyncHandeler(
    async (req, res, next) => {
        const packages = await Package.find();
        res.status(200).json({ packages });
    }
)