const asyncHandeler = require('express-async-handler');
const History = require('../../../../Models/HistoryRecord');
const { toNumber } = require('../../../../Utils/Helper');
exports.getUserHistory = asyncHandeler(
    async (req, res, next) => {
        const max = toNumber(req.query.max);
        if (max == null) {

        }
        const histories = History.find({
            userId: res.locals.userModel.id,
        });
        if (max) {
            histories.limit(max);
        }
        const data = await histories;
        res.status(200).json({ histories: data });
    }
)