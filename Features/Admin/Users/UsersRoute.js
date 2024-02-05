const appRouter = require('express').Router();
const { getAllUsers } = require('./Services/GetAllUsers');
const { getUser } = require('./Services/GetUser');
const { banUser } = require('./Services/BanUser');
const { activeUserAccount } = require('./Services/ActiveUserAccount');
const { adminRolesValidator } = require('../../../middlewares/RolesValidator');

appRouter.get('/', adminRolesValidator(["SeeAllUsers"]), getAllUsers)
appRouter.get('/:id', adminRolesValidator(["SeeSingleUser"]), getUser)
appRouter.post('/:id/ban', adminRolesValidator(["BanUnBanUser"]), banUser)
appRouter.post('/:id/active-account', adminRolesValidator(["ActiveUnActiveUserAccount"]), activeUserAccount)
module.exports = appRouter;  