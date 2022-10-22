const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Token generator;

const generateToken = (id) =>
    jwt.sign({ id: id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const createSendToken = (user, res) => {
    const token = generateToken(user._id);
    const cookieOptions = {
        expires: new Date(Date.now() + 4 * 24 * 3600 * 1000),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

    const { password, ...rest } = user._doc;

    res.cookie('jwt', token);

    res.status(201).json({
        message: 'Success',
        user: rest,
        jwt: token,
    });
};

//Register
exports.userRegister = catchAsync(async (req, res) => {
    // try {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    });

    createSendToken(newUser, res);
});

exports.userLogin = catchAsync(async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return next(
            new AppError('Username or password not input. Try again.', 400)
        );
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
        return next(new AppError('User not found.', 404));
    }

    const validatePass = await bcrypt.compare(password, foundUser.password);

    if (!validatePass) {
        return next(new AppError('Wrong credentials.', 404));
    }
    createSendToken(foundUser, res);
});

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
    if (!token) {
        return next(new AppError('No token, please login again!', 404));
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
            return next(new AppError('No user with that token.', 404));
        }
    } else {
        return next(new AppError('Invalid token, please login again!', 403));
    }
    next();
};
