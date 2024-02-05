const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');

exports.addNewPackage = asyncHandeler(
    async (req, res, next) => {
        const package = await Package.create(req.body);
        res.status(200).json({ package });
    }
)