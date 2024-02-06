const { getAllPackages } = require('./Services/GetAllPackages');

const appRouter = require('express').Router();
appRouter.get('/', getAllPackages);
module.exports = appRouter;  