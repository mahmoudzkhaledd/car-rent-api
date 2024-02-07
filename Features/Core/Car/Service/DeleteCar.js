const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Rent = require('../../../../Models/Rent');
const { cloudinary } = require('../../../../services/Cloudinary/UploadImage');
const Image = require('../../../../Models/Image');
const ObjectId = require('mongoose').Types.ObjectId;

/*
    400: car not found.
    401: there are rents depends on this car, please wait until the rent ends and try again.
    410: failed to delete car image from the server.
*/
exports.deleteCar = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const carId = req.params.id;
        if (!ObjectId.isValid(carId)) {
            return res.status(400).json({
                msg: "Car not found."
            });
        }
        const dependRentsCount = await Rent.count({ carId: carId });
        if (dependRentsCount != 0) {
            return res.status(401).json({
                msg: "There are rents depends on this car, please wait until the rent ends and try again."
            });
        }
        const car = await Car.findOne({ _id: carId, userId: userModel.id, })
            .populate([
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
            return res.status(400).json({
                msg: "Car not found."
            });
        }
        if (car.thumbnailImage) {
            await cloudinary.uploader.destroy(car.thumbnailImage.public_id);
            await Image.deleteOne({
                _id: car.thumbnailImage._id,
                userId: userModel.id,
            });
            car.thumbnailImage = null;
        }
        for (let i = 0; i < car.images.length; i++) {
            const result = await cloudinary.uploader.destroy(car.images[i].public_id);
            if (result.result == 'ok') {
                await Image.deleteOne({
                    _id: car.images[i]._id,
                    userId: userModel.id,
                });
            } else {
                return res.status(410).json({
                    msg: "Failed to delete car image from the server"
                });
            }
        }
        await car.deleteOne();
        res.sendStatus(200);
    }
)