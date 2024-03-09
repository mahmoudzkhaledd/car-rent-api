const asyncHandeler = require('express-async-handler');
const Team = require('../../../../Models/Team');
const History = require('../../../../Models/HistoryRecord');

exports.createTeam = asyncHandeler(
    async (req, res, next) => {
        const userModel = res.locals.userModel;
        const { name } = req.body;
        if (name == null || name.length > 100 || name.length < 3) {
            return res.status(200).json({ msg: 'Team name must be between 3 and 100 characters' });
        }
 
        const team = await Team.create({ name, leader: userModel.id });
        await team.populate('leader');
        await History.create({
            userId: userModel.id,
            temId: team._id,
            type: 'create_team',
        });
        res.status(200).json({ team });
    }
)