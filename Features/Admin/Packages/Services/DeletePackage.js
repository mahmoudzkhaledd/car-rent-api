const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const configs = require('../../../../ServerConfigs/ServerConfigs.json');

exports.deletePackage = asyncHandeler(
    async (req, res, next) => {
        const packageId = req.params.id;
        if (!ObjectId.isValid(packageId)) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الباقة"
            })
        }
        const package = await Package.findById(packageId)
        if (!package) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الباقة"
            })
        }
        const user = await User.findOne({
            package: package._id,
        })
        if (user != null) {
            return res.status(404).json({
                msg: "هناك مستخدمين يعتمدون على هذه الباقة"
            })
        }
        await package.deleteOne();
        return res.status(200).json({
            msg: "تم حذف الباقة"
        })
    }
)