const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');

exports.getUser = catchAsync(async (req, res, next) => {
    const { username, userId } = req.query;

    const foundUser = username
        ? await User.findOne({ username })
        : await User.findById(userId);
    const { password, updatedAt, ...rest } = foundUser._doc;
    res.status(200).json(rest);
});

exports.updateUser = catchAsync(async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 12);
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            message: 'User info successfully updated.',
            updatedUser,
        });
    }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'User successfully deleted.',
        });
    }
});

exports.followUser = catchAsync(async (req, res, next) => {
    if (req.params.id !== req.body.userId) {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            const updatedUser = await currentUser.updateOne({
                $push: { following: req.params.id },
            });
            res.status(200).json({
                message: 'User has been followed.',
                followers: updatedUser.followers,
            });
        } else {
            res.status(403).json({
                message: 'You already follow this user.',
            });
        }
    } else {
        res.status(400).json({
            message: "You can't follow yourself.",
        });
    }
});

exports.unfollowUser = catchAsync(async (req, res, next) => {
    if (req.params.id !== req.body.userId) {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
            await user.updateOne({ $pull: { followers: req.body.userId } });
            const updatedUser = await currentUser.updateOne({
                $pull: { following: req.params.id },
            });
            res.status(200).json({
                message: 'User has been unfollowed.',
                followers: updatedUser.followers,
            });
        } else {
            res.status(403).json({
                message: 'You do not follow this user.',
            });
        }
    } else {
        res.status(400).json({
            message: "You can't unfollow yourself.",
        });
    }
});

exports.getFriends = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    const friends = await Promise.all(
        user.following.map((friendId) => User.findById(friendId))
    );

    const friendsList = [];
    friends.map((friend) => {
        const { _id, username, profilePic } = friend;
        friendsList.push({ _id, username, profilePic });
    });
    res.status(200).json(friendsList);
});
