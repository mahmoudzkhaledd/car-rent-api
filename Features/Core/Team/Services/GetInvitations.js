const asyncHandeler = require('express-async-handler');
const Invitation = require('../../../../Models/Invitation');

exports.getUserInvitations = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const invitations = await Invitation.find({
            userId: userModel.id,
        }).populate([
            {
                path: "leaderId",
                select: { firstName: 1 },
            },
            {
                path: "teamId",
                select: { name: 1 },
            },
        ]);

        res.status(200).json({ invitations })
    }
)