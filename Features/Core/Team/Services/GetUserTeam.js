const asyncHandeler = require('express-async-handler');
const Team = require('../../../../Models/Team');

exports.getUserTeam = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const leadingTeams = await Team.find({
            leader: userModel.id,
        });
        const teams = await Team.find({
            members: {
                $in: [userModel.id]
            },
        });

        res.status(200).json({ leadingTeams, teams })
    }
)