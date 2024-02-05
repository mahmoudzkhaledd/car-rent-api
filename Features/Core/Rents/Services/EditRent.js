const asyncHandeler = require('express-async-handler');
const Rent = require('../../../../Models/Rent');
function doDateRangesIntersect(start1, end1, start2, end2) {
    return start1 <= end2 && end1 >= start2;
}
exports.editRent = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const rentId = req.params.id;
        
        const {
            carId,
            startingDate,
            endingDate,
            clientName,
            clientPhone,
            clientIdentity,
            totalPrice,
            paidPrice,
            remainingPrice,
        } = req.body;
        console.log(req.body);
        if (!require('mongoose').Types.ObjectId.isValid(carId) || !require('mongoose').Types.ObjectId.isValid(rentId)) {
            return res.sendStatus(404);
        }
        const rent = await Rent.findOne({
            _id: rentId,
            userId: userModel.id,
        });
        if (rent == null) {
            return res.sendStatus(404);
        }
        const carRents = await Rent.find({
            _id: {
                $ne: rent._id,
            },
            carId: carId, 
            userId: userModel.id,
        });
        for (const rent of carRents) {
            var range1Start = new Date(startingDate);
            var range1End = new Date(endingDate);
            var range2Start = new Date(rent.startingDate);
            var range2End = new Date(rent.endingDate);

            if (doDateRangesIntersect(range1Start, range1End, range2Start, range2End)) {
                return res.status(405).json({
                    msg: `This car is booked from ${rent.startingDate} to ${rent.endingDate}, and it overlaps with your selected dates.`,
                });
            }
        }
        const result = await rent.updateOne({
            carId,
            startingDate,
            endingDate,
            clientName,
            clientPhone,
            clientIdentity,
            totalPrice,
            paidPrice,
            remainingPrice,
        });
        res.status(200).json({ result });
    }
)