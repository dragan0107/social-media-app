const User = require('../models/User');
//Register
exports.userRegister = (req, res) => {
    res.status(201).json({
        msg: 'user registered',
    });
};
