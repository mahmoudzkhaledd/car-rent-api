const appRouter = require('express').Router();
const { rentCar } = require('./Services/RentCar');
const { getUserRents } = require('./Services/GetUserRents');
const { getRent } = require('./Services/GetRent');
const { editRent } = require('./Services/EditRent');
const { rentCarValidator } = require('./Validators/RentValidators');
const { deleteRent } = require('./Services/DeleteRent');

appRouter.get('/', getUserRents);
appRouter.route('/:id')
    .get(getRent)
    .put(editRent)
    .delete(deleteRent);
appRouter.post('/cars/:id/rent', rentCarValidator, rentCar);

module.exports = appRouter;  