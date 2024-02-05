const { changeInvState } = require('./Services/ChangeInvitationState');
const { createTeam } = require('./Services/CreateTeam');
const { getUserInvitations } = require('./Services/GetInvitations');
const { getTeam } = require('./Services/GetTeam');
const { getUserTeam } = require('./Services/GetUserTeam');
const { inviteUserToTeam } = require('./Services/InviteUser');

const appRouter = require('express').Router();
appRouter.get('/', getUserTeam);
appRouter.get('/invitations', getUserInvitations);
appRouter.post('/invitations/:id/accept', changeInvState);
appRouter.get('/:id', getTeam);
appRouter.get('/:id/invite', inviteUserToTeam);
appRouter.post('/', createTeam);

module.exports = appRouter;  