const appRouter = require('express').Router();
const { addNewCar } = require('./Service/AddCar');
const { updateCar } = require('./Service/UpdateCar');
const { deleteCar } = require('./Service/DeleteCar');
const { getUserCars } = require('./Service/GetMyCars');
const { getUserCar } = require('./Service/GetUserCar');
const { deleteImage } = require('./Service/DeleteImage');
const { uploadImageToGalary } = require('./Service/AddImagToGalary');


appRouter.post('/', addNewCar);
appRouter.get('/', getUserCars);
appRouter.route('/:id')
    .put(updateCar)
    .delete(deleteCar)
    .get(getUserCar);
appRouter.post('/:id/images/', uploadImageToGalary);

appRouter.delete('/:id/images/:imageId', deleteImage)
module.exports = appRouter;  