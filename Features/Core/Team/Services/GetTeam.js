const asyncHandeler = require('express-async-handler');
const Team = require('../../../../Models/Team');
const ObjectId = require('mongoose').Types.ObjectId

exports.getTeam = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Can't find this team!" });
        }
        const team = await Team.findOne({
            _id: id,
            $or: [
                {
                    leader: userModel.id,
                },
                {
                    members: {
                        $in: [userModel.id],
                    }
                },
            ]
        }).populate([
            {
                path: "leader",
                select: { firstName: 1 },
            },
            {
                path: "members",
                select: { firstName: 1 },
            },
            {
                path: "pendingInvitations", 
            },
        ]);
        console.log(team);
        res.status(200).json({ team })
    }
)