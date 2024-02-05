const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Rent = require('../../../../Models/Rent');
const { cloudinary } = require('../../../../services/Cloudinary/UploadImage');
const Image = require('../../../../Models/Image');
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
            return res.sendStatus(400);
        }
        const dependRentsCount = await Rent.count({ carId: carId });
        if (dependRentsCount != 0) {
            return res.sendStatus(401);
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
                return res.sendStatus(410);
            }
        }
        await car.deleteOne();
        res.sendStatus(200);
    }
)