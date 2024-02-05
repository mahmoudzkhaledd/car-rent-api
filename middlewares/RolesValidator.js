const roles = {};
exports.adminRolesValidator = (requiredRoles = []) => {
    for (const role of requiredRoles) {
        roles[role] = true;
    }

    return (req, res, next) => {
        console.log(roles);
        const admin = res.locals.adminModel;
        const adminRoles = admin.roles || {};
        for (const role of requiredRoles) {
            if (!adminRoles[role]) {
                return res.status(400).json({ msg: "ليس لديك الصلاحية للقيام بهذه العملية" })
            }
        }
        return next();
    };
}