const appRouter = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const usersRouters = require('./Users/UsersRoute');
const adminsRoutes = require('./Admins/AdminsRoutes');
const packagesRoutes = require('./Packages/PackagesRoutes');
const orderRoutes = require('./Order/OrderRoutes');
// const imagesRoutes = require('./Images/ImagesRoutes');


appRouter.use(authRoutes);
appRouter.use("/admins", adminsRoutes);
appRouter.use("/packages", packagesRoutes);

appRouter.use("/orders", orderRoutes);
appRouter.use("/users", usersRouters);
// appRouter.use("/images", imagesRoutes); 
module.exports = appRouter;      