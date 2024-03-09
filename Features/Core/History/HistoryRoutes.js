
const { getUserHistory } = require('./Services/getUserHistory');

const appRouter = require('express').Router();
appRouter.get('/', getUserHistory);
module.exports = appRouter;  