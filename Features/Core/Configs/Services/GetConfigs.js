const asyncHandeler = require('express-async-handler');
const Configs = require('../../../../Models/Configs');

exports.getConfigs = asyncHandeler(async (req, res, next) => {
    const config = await Configs.findById('655df5c5d487f045753e4e1c');
    res.json({ configs: config });
});