const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
const Image = require('../../../../Models/Image');
const { cloudinary } = require('../../../../services/Cloudinary/UploadImage');
exports.deleteImage = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const imageId = req.params.imageId;
        const carId = req.params.id;
        
        const image = await Image.findOne({
            _id: imageId,
            userId: userModel.id,

        });

        if (image == null) return res.sendStatus(404);
        
        try {
            const result = await cloudinary.uploader.destroy(image.public_id);
            if (result.result != 'ok') {
                return res.sendStatus(405);
            }

            if (image.type == "thumbnail") {
                await Car.updateOne({ _id: image.carId, userId: userModel.id }, {
                    thumbnailImage: null,
                });
            }else if(image.type == 'image'){
                await Car.updateOne({ _id: image.carId, userId: userModel.id }, {
                    $pull: { images: image._id }
                });
            }
            await image.deleteOne();
        } catch (ex) {
            
        }
        res.sendStatus(200);
    }
)