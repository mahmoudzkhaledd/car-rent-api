const asyncHandeler = require('express-async-handler');
const Admin = require('../../../../Models/Admin');
const { decrement } = require('../../../../Models/Counter');
const ObjectId = require('mongoose').Types.ObjectId;

exports.deleteAdmin = asyncHandeler(
    async (req, res, next) => {
        const adminId = req.params.id;
        if (adminId == null || !ObjectId.isValid(adminId)) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        const admin = await Admin.findById(adminId);
        if (admin == null) {
            return res.status(400).json({ msg: "لم نتمكن من ايجاد المدير." });
        }
        if (admin.master) {
            return res.status(400).json({ msg: "لا يمكن حذف الحساب الاساسي" });
        }

        if (count != null) {
            return res.status(400).json({ msg: "هناك طلبات قائمة تعتمد على هذا المدير" });
        }

        await admin.deleteOne();
        await decrement('admins')
        res.status(200).json({ msg: "تم الحذف بنجاح" });
    }
)