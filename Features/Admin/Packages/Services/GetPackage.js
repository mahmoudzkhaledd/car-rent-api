const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.getPackage = asyncHandeler(
    async (req, res, next) => {
        const packageId = req.params.id;
        if (!ObjectId.isValid(packageId)) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الباقة"
            })
        }
        const package = await Package.findById(packageId);
        res.status(200).json({ package });
    }
)