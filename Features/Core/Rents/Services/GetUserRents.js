const asyncHandeler = require('express-async-handler');
const Rent = require('../../../../Models/Rent');

exports.getUserRents = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const selectNumber = req.query.selectNumber;
        const sort = req.query.sort;

        const rents = Rent.find({
            userId: userModel.id,
        }).populate('carId', { images: 0 });
        if (sort == "date") {
            rents.sort('-createdAt');
        }
        if (Number(selectNumber) != null) {
            rents.limit(Number(selectNumber));
        }
        const ans = await rents;
        res.status(200).json({ rents: ans });
    }
)