const asyncHandeler = require('express-async-handler');
const Team = require('../../../../Models/Team');
const User = require('../../../../Models/User');
const Invitation = require('../../../../Models/Invitation');
const ObjectId = require('mongoose').Types.ObjectId;
exports.inviteUserToTeam = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const { userId } = req.body;
        const teamId = req.params.id;
        if (userModel.id == userId) {
            return res.status(404).json({ msg: "You can't invite yourself !" });
        }

        if (!ObjectId.isValid(userId) || await User.findById(userId) == null) {
            return res.status(404).json({ msg: "The user does not exists!" });
        }
        if (!ObjectId.isValid(teamId)) {
            return res.status(404).json({ msg: "Can't find the specified team" });
        }
        const team = await Team.findById(teamId)
            .populate("pendingInvitations");
        if (team == null) {
            return res.status(404).json({ msg: "Can't find the specified team" });
        }
        for (const inv of team.pendingInvitations) {
            if (inv.userId == userId) {
                return res.status(404).json({ msg: "This user is already invited to this team" });
            }
        }
        for (const mem of team.members) {
            if (mem == userId) {
                return res.status(404).json({ msg: "This user is already in this team" });
            }
        }
        const invite = await Invitation.create({
            leaderId: userModel.id,
            userId: userId,
            teamId: team._id,
        })
        await team.updateOne({
            $push: {
                pendingInvitations: invite._id,
            }
        });
        res.status(200).json({ invite });
    }
)