const asyncHandeler = require('express-async-handler');
const Rent = require('../../../../Models/Rent');
const ObjectId = require('mongoose').Types.ObjectId;

exports.deleteRent = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const rentId = req.params.id;
        if (!ObjectId.isValid(rentId)) {
            return res.status(404).json({ msg: "Can't find this rent, please try again." });
        }
        const ans = await Rent.deleteOne({
            _id: rentId,
            userId: userModel.id,
        })
        if (ans.deletedCount == 0) { 
            return res.status(404).json({ msg: "Can't find this rent, please try again." });
        }
        res.sendStatus(200);
    }
)