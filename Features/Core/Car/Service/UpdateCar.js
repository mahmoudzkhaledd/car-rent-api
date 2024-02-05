const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Image = require('../../../../Models/Image');
const ObjectId = require('mongoose').Types.ObjectId;
const { uploadImage } = require('../../../../services/Cloudinary/UploadImage');

exports.updateCar = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const carId = req.params.id;
        if (!ObjectId.isValid(carId)) {
            return res.sendStatus(400);
        }
        const {
            name,
            model,
            panelNumber,
            thumbnailImage,
            notes,
        } = req.body;
        const tmpCar = await Car.findOne({
            _id: {
                $ne: carId,
            },
            panelNumber: panelNumber,
        });
        if (tmpCar != null) return res.sendStatus(400);
        const car = await Car.findOne({
            _id: carId,
            userId: userModel.id,
        });
        if (car == null) return res.sendStatus(404);
        let updatedImage = null;
        if (thumbnailImage != null && thumbnailImage != "") {
            const result = await uploadImage(thumbnailImage, userModel.id, car._id);
            updatedImage = await Image.create({
                type: "thumbnail",
                userId: userModel.id,
                carId: car._id,
                ...result.data,
            });
        }
        const carUpdated = await car.updateOne({
            name,
            model,
            panelNumber,
            notes,
            thumbnailImage: updatedImage != null ? updatedImage._id : car.thumbnailImage,
        });
        res.sendStatus(carUpdated.modifiedCount != 0 ? 200 : 400);
    }
)