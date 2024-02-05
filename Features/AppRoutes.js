const appRoute = require('express').Router();
const authRoutes = require('./Auth/AuthRoutes');
const coreRoutes = require('./Core/CoreRoutes');
const adminRoutes = require("./Admin/AdminRoutes")
const { userValidatorMiddleware } = require('../middlewares/UserValidatorMiddleware');
const { adminValidatorMiddleware } = require('../middlewares/AdminValidator');

appRoute.use("/admin", adminValidatorMiddleware, adminRoutes);
appRoute.use(authRoutes);
appRoute.use(userValidatorMiddleware);
appRoute.use(coreRoutes);


appRoute.all('*', (req, res) => {
    res.status(404).json({ msg: `Can't find this route "${req.originUrl}"` });
});

module.exports = appRoute;