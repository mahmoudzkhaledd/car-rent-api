const { getAllPackages } = require('./Services/GetAllPackages');
const { sendPackageOrder } = require('./Services/SendPackageOrder');

const appRouter = require('express').Router();
appRouter.get('/', getAllPackages);
appRouter.post('/:id/subscribe', sendPackageOrder);
module.exports = appRouter;  