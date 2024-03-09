const asyncHandeler = require('express-async-handler');
const Rent = require('../../../../Models/Rent');
const History = require('../../../../Models/HistoryRecord');
const ObjectId = require('mongoose').Types.ObjectId;

exports.finishRent = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const rentId = req.params.id;
        if (!ObjectId.isValid(rentId)) {
            return res.status(404).json({ msg: "Can't find this rent, please try again." });
        }
        const rent = await Rent.findOne({
            _id: rentId,
            userId: userModel.id,
        })
        if (rent == null) {
            return res.status(404).json({ msg: "Can't find this rent, please try again." });
        }
        rent.finished = !rent.finished;
        await rent.save();
        await History.create({
            userId: userModel.id,
            rentId: rent._id,
            type: rent.finished ? 'finish_rent' : 'active_rent',
        });
        res.sendStatus(200);
    }
)