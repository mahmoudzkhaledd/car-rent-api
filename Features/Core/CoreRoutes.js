const appRouter = require('express').Router();
const carRoutes = require('./Car/CarRoutes');
const rentsRoutes = require('./Rents/RentsRoutes');
const teamRoutes = require('./Team/TeamRoutes');
appRouter.use('/teams', teamRoutes);
appRouter.use('/cars', carRoutes);
appRouter.use('/rents', rentsRoutes);

module.exports = appRouter;  