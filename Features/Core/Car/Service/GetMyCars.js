const asyncHandeler = require('express-async-handler');
const Car = require('../../../../Models/Car');
exports.getUserCars = asyncHandeler(
    async (req, res, next) => {
        const page = req.query.page || 0;
        const search = req.query.search || "";
        const userModel = res.locals.userModel;
        const regex = new RegExp(`^${search}`, 'i');
        const cars = await Car.find({
            userId: userModel.id,
            $or: [
                {
                    name: {
                        $regex: regex,
                    },
                },
                {
                    panelNumber: {
                        $regex: regex,
                    },
                },
            ]

        }, { images: 0, notes: 0 }).skip(page * 10).limit(10).populate([
            {
                path: 'thumbnailImage',
                select: { _id: 1, url: 1, userId: 1, },
            },
        ]);;
        res.status(200).json({ cars });
    }
)