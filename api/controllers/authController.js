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

    const { password, ...rest } = user._doc;

    res.status(201).json({
        message: 'Success',
        user: rest,
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

        // const { password, ...rest } = newUser._doc;

        createSendToken(newUser, res);
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
        createSendToken(foundUser, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'something went wrong',
            error: error,
        });
    }
};

exports.protect = async (req, res, next) => {
    let token;

    //Checks if there is an auth header and if it starts with bearer, and tries to obtain the token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }
    //If no token, asks user to login again and provide a new token
    console.log(token);
    if (!token) {
        return res.status(404).json({
            message: 'No token, please login again!',
        });
    }

    //token verification

    let decodedToken;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (!err) {
            decodedToken = decoded;
        }
    });
    if (decodedToken) {
        try {
            await User.findById(decodedToken.id);
        } catch (error) {
            return res.status(404).json({
                message: 'No user with that token.',
            });
        }
    } else {
        return res.status(404).json({
            message: 'Invalid token, please login again!',
        });
    }
    next();
};
