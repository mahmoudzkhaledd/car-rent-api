const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Image = require('../../../../Models/Image');
const { uploadImage } = require('../../../../services/Cloudinary/UploadImage');
exports.uploadImageToGalary = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const { image: imageToUpload } = req.body;
        const carId = req.params.id;

        const car = await Car.findOne({
            _id: carId,
            userId: userModel.id,
        });
        if (car == null) {
            return res.sendStatus(404);
        }
        if (car.images.length > 100) {
            return res.sendStatus(401);
        }
        const result = await uploadImage(imageToUpload, userModel.id, car._id);
        if (result.data == null) {
            return res.sendStatus(402);
        }
        const image = await Image.create({
            ...result.data,
            type: 'image',
            userId: userModel.id,
        });
        car.images.push(image._id);
        await car.save();
        res.status(200).json({ image });
    }
)