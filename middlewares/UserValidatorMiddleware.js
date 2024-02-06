const jwt = require('jsonwebtoken');
//const User = require('../Models/User');
const unProtectedRoutes = [
    '/signout',
    '/portfolios/:id',
];

function matchRoute(incomingRoute) {
    for (const route of unProtectedRoutes) {
        const regexRoute = new RegExp('^' + route.replace(/:[a-zA-Z0-9]+/g, '([a-zA-Z0-9]+)') + '$');
        if (regexRoute.test(incomingRoute)) {
            return true;
        }
    }
    return false;
}



exports.userValidatorMiddleware = async (req, res, next) => {
    
    try {
        const token = (req.headers.token).split(' ')[1];
        const userModel = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if (!userModel.verifiedEmail && process.env.APP_MODE != 'dev') {
            return res.status(455).json({
                "msg": "Account is not verified !",
            });
        } else {
            res.locals.userModel = userModel;
            return next();
        }
    } catch (err) {
        if (matchRoute(req.originalUrl)) {
            return next();
        }
        return res.status(455).json({ "msg": "Unauthorized !" });
    }
}
    