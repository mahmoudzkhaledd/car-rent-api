const { v2: cloudinary } = require('cloudinary')


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
exports.uploadImage = async (image,userId,carId) => {
    try {
        const result = await cloudinary.uploader.upload('data:image/jpeg;base64,' + image,{
            folder:`users/${userId}/cars/${carId}`
        });
        return {
            error: null,
            data: result,
        };
    } catch (err) {
        return {
            error: err,
            data: null,
        };
    }
};
exports.cloudinary = cloudinary;
