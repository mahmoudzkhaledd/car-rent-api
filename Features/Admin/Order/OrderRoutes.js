const { changeOrderStatge } = require('./Services/ChangeOrderStatge');

const appRouter = require('express').Router();
appRouter.post('/:id/change-state', changeOrderStatge)
module.exports = appRouter;      