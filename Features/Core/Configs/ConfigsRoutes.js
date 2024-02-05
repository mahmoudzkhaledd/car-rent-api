const appRouter = require('express').Router();
const { getConfigs } = require('./Services/GetConfigs')
appRouter.get('/', getConfigs);
module.exports = appRouter;