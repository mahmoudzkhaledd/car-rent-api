const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
exports.getUserCar = asyncHandeler(
    async (req, res, next) => {
        const carId = req.params.id;
        if (!require('mongoose').Types.ObjectId.isValid(carId)) {
            return res.sendStatus(404);
        }
        const userModel = res.locals.userModel;

        
        const car = await Car.findOne({
            _id: carId,
            userId: userModel.id,
        }).populate([
            {
                path: 'thumbnailImage',
                select: { _id: 1, url: 1, userId: 1, },
            },
            {
                path: 'images',
                select: { _id: 1, url: 1, userId: 1, },
            },
        ]);
        if (car == null) {
            return res.sendStatus(404);
        }
   
        res.status(200).json({ car });
    }
)