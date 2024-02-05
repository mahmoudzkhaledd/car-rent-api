const asyncHandeler = require('express-async-handler');
const Rent = require('../../../../Models/Rent');

exports.getRent = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        
        const rentId = req.params.id;
        const rent = await Rent.findOne({
            userId: userModel.id,
            _id: rentId,
        }).populate([
            {
                path: 'carId',
                select: { images: 0 },
            },
        ]);
        if (rent == null) { 
            return res.sendStatus(404);
        }
        await rent.populate("carId.thumbnailImage", { _id: 1, url: 1, userId: 1, });

        res.status(200).json({ rent });
    }
)