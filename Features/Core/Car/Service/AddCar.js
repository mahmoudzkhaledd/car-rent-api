const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Image = require('../../../../Models/Image');
const { uploadImage } = require('../../../../services/Cloudinary/UploadImage');
exports.addNewCar = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        let {
            name,
            model,
            panelNumber,
            thumbnailImage,
            notes,
        } = req.body;

        const tmpCar = await Car.findOne({ panelNumber: panelNumber });

        if (tmpCar != null) {
            return res.sendStatus(400);
        }

        try {
            const car = await Car.create({
                userId: userModel.id,
                name,
                model,
                panelNumber,
                thumbnailImage: null,
                notes,
            });
            if (thumbnailImage != null && thumbnailImage != "") {
                const result = await uploadImage(thumbnailImage, userModel.id, car._id);
                thumbnailImage = null;
                if (result.data != null) {
                    const img = await Image.create({
                        ...result.data,
                        userId: userModel.id,
                        type: "thumbnail",
                        carId: car._id,
                    });
                    await car.updateOne({
                        thumbnailImage: img._id,
                    });
                } else {
                    thumbnailImage = null;
                }

            }
            res.status(200).json({ car });
        } catch (err) {
            if (err.code == 11000) {
                return res.sendStatus(400);
            }
            return res.status(401).json({ msg: err.msg });
        }

    }
)