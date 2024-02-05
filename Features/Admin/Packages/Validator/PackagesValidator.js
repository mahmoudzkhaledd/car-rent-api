const validator = require('../../../../middlewares/validatorMiddleware');
const { check } = require('express-validator');
const configs = require('../../../../ServerConfigs/ServerConfigs.json');
module.exports.addPackageValidator = [
    check("name").isLength({ min: 3, max: 100 }).trim().withMessage("يجب أن يكون الاسم بين 3 و 100 احرف"),
    check("description").isLength({ min: 3, max: 300 }).trim().withMessage("يجب أن يكون الوصف بين 3 و 100 احرف"),
    check("price")
        .isLength({ min: 3, max: 300 }).trim().toFloat().withMessage("يجب ادخال سعر صحيح للباقة"),
    check("advantages.*.active")
        .isBoolean().withMessage("يجب ادخال مميزات الباقة بشكل صحيح"),

    check("advantages.*.description")
        .isLength({ min: 3, max: 100 }).trim().withMessage("يجب أن يكون وصف المميزات بين 3 و 100 حرف"),

    validator,
];