const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Token generator;

const generateToken = (id) =>
    jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, res) => {
    const token = generateToken(user._id);

    res.status(201).json({
        message: 'User registered',
        user: user,
        jwt: token,
    });
};

//Register
exports.userRegister = async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
        });

        const { password, isAdmin, ...rest } = newUser._doc;

        createSendToken(rest, res);
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong..',
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
