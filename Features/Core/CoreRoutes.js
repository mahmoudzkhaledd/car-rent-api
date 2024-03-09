const appRouter = require('express').Router();
const carRoutes = require('./Car/CarRoutes');
const rentsRoutes = require('./Rents/RentsRoutes');
const teamRoutes = require('./Team/TeamRoutes');
const packagesRoutes = require('./Packages/PackageRoutes');
const historyRoutes = require('./History/HistoryRoutes');



appRouter.use('/history', historyRoutes);
appRouter.use('/teams', teamRoutes);
appRouter.use('/cars', carRoutes);
appRouter.use('/rents', rentsRoutes);
appRouter.use('/packages', packagesRoutes);

module.exports = appRouter;  