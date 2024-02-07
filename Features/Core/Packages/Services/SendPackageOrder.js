const asyncHandeler = require('express-async-handler');
const Package = require('../../../../Models/Package');
const Order = require('../../../../Models/Order');
const User = require('../../../../Models/User');
exports.sendPackageOrder = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const user = await User.findById(userModel.id);
        const packageId = req.params.id;
        if (await Package.findById(packageId) == null) {
            return res.status(400).json({
                msg: "Can't find the specified package!",
            });
        }
        if (user.package != null) {
            return res.status(400).json({
                msg: "You are already subscribed in a package!",
            });
        }
        if (user.order != null) {
            return res.status(400).json({
                msg: "You already sent an order.",
            });
        }
        const order = await Order.create({
            userId: user._id,
            packageId: packageId,
        });
        user.order = order._id;
        await user.save();
        return res.status(200).json({
            order,
        });
    }
)