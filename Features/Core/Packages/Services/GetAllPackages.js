const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
exports.getAllPackages = asyncHandeler(
    async (req, res, next) => {
        const packages = await Package.find();
        res.status(200).json({ packages });
    }
)