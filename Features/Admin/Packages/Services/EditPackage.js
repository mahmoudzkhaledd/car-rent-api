const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.editPackage = asyncHandeler(
    async (req, res, next) => {
        const packageId = req.params.id;
        if (!ObjectId.isValid(packageId)) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الباقة"
            })
        }
        const updt = await Package.updateOne({ _id: packageId }, req.body);
        res.status(updt.modifiedCount != 0 ? 200 : 400)
            .json({ msg: updt.modifiedCount == 0 ? "لم نتمكن من ايجاد الباقة" : "تم تعديل الباقة بنجاح" });
    }
)