const asyncHandeler = require('express-async-handler');

const Order = require('../../../../Models/Order');
const User = require('../../../../Models/User');
const ObjectId = require('mongoose').Types.ObjectId;

exports.changeOrderStatge = asyncHandeler(
    async (req, res, next) => {

        const accept = req.query.state == 'accept';
        const orderId = req.params.id;
        if (!ObjectId.isValid(orderId)) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الطلب"
            })
        }
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({
                msg: "لم نتمكن من ايجاد الطلب"
            })
        }
        if (accept) {
            await User.updateOne({ _id: order.userId }, {
                package: order.packageId,
                order: null,
            });
        }
        await order.deleteOne();
        res.status(200).json({
            msg: "تم التغيير بنجاح"
        })
    }
)