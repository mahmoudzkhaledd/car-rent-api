const { addNewPackage } = require('./Services/AddPackage');
const { deletePackage } = require('./Services/DeletePackage');
const { getAllPackages } = require('./Services/GetAllPackages');
const { getPackage } = require('./Services/GetPackage');
const { addPackageValidator } = require('./Validator/PackagesValidator')

const { adminRolesValidator } = require('../../../middlewares/RolesValidator');
const appRouter = require('express').Router();


appRouter.get('/', adminRolesValidator(['SeeAllPackages']), getAllPackages);
appRouter.get('/:id', adminRolesValidator(['SeeSpecificPackage']), getPackage);
appRouter.post('/add', adminRolesValidator(['AddPackage']), addPackageValidator, addNewPackage);
appRouter.delete('/:id', adminRolesValidator(['DeletePackage']), deletePackage);
module.exports = appRouter;  