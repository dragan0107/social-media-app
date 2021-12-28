const bcrypt = require('bcrypt');
const User = require('../models/User');
//Register
exports.userRegister = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        res.status(201).json({
            msg: 'user registered',
            user: newUser,
        });
    } catch (error) {
        res.status(400).json({
            message: 'something went wrong',
            error: error,
        });
    }
};

exports.userLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({
            message: 'Username or password not input. Try again.',
        });
    }

    try {
        const foundUser = await User.findOne({ username });

        if (!foundUser) {
            return res.status(404).json({ message: "User doesn't exist." });
        }

        const validatePass = await bcrypt.compare(password, foundUser.password);

        if (!validatePass) {
            return res.status(404).json({
                message: 'Wrong credentials.',
            });
        }
        //If everything's ok, it will send success message.
        res.status(200).json({
            message: 'Login success.',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong',
            error: error,
        });
    }
};
