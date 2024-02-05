const asyncHandeler = require('express-async-handler');
const Team = require('../../../../Models/Team');
const Invitation = require('../../../../Models/Invitation');
const ObjectId = require('mongoose').Types.ObjectId


exports.changeInvState = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const invId = req.params.id;
        if (!ObjectId.isValid(invId)) {
            return res.sendStatus(404);
        }
        const { accept } = req.body;
        const inv = await Invitation.findOne({
            userId: userModel.id,
            _id: invId,
        });
        if (inv == null) {
            return res.sendStatus(404);
        }
        if (accept) {
            await Team.updateOne({
                _id: inv.teamId,
            }, {
                $push: {
                    members: userModel.id,
                },
                $pull: {
                    pendingInvitations: userModel.id,
                }
            });
        }
        await inv.deleteOne();
        res.sendStatus(200);
    }
)