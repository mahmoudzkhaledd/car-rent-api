const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Rent = require('../../../../Models/Rent');
const History = require('../../../../Models/HistoryRecord');
function doDateRangesIntersect(start1, end1, start2, end2) {
    return start1 <= end2 && end1 >= start2;
}
exports.rentCar = asyncHandeler(
    async (req, res, next) => {
        const carId = req.params.id;
        const userModel = res.locals.userModel;
        const {
            startingDate,
            endingDate,
            clientName,
            clientPhone,
            clientIdentity,
            totalPrice,
            paidPrice,
            remainingPrice,
        } = req.body;

        if (!require('mongoose').Types.ObjectId.isValid(carId)) {
            return res.sendStatus(404);
        }
        const car = await Car.findOne({
            _id: carId,
            userId: userModel.id,
        });
        if (car == null) {
            return res.sendStatus(404);
        }

        const carRents = await Rent.find({ carId: car._id, userId: userModel.id, });
        for (const rent of carRents) {
            var range1Start = new Date(startingDate);
            var range1End = new Date(endingDate);
            var range2Start = new Date(rent.startingDate);
            var range2End = new Date(rent.endingDate);

            if (doDateRangesIntersect(range1Start, range1End, range2Start, range2End)) {
                return res.status(405).json({
                    msg: `This car is booked from ${rent.startingDate.split(' ')[0]} to ${rent.endingDate.split(' ')[0]}, and it overlaps with your selected dates.`,
                });
            }
        }

        const rent = await Rent.create({
            startingDate,
            endingDate,
            clientName,
            clientPhone,
            clientIdentity,
            totalPrice,
            paidPrice,
            remainingPrice,
            userId: userModel.id,
            carId: carId,
        });
        await History.create({
            userId: userModel.id,
            rentId: rent._id,
            type: 'rent_car',
        });
        res.status(200).json({ rent });
    }
)