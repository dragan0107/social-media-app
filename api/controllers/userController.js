const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.getUser = async (req, res) => {
    try {
        const { username, userId } = req.query;

        const foundUser = username
            ? await User.findOne({ username })
            : await User.findById(userId);
        const { password, updatedAt, ...rest } = foundUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong.',
        });
    }
};

exports.updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                req.body.password = await bcrypt.hash(req.body.password, 12);
            } catch (error) {
                return res.status(400).json({
                    message: 'Something went wrong.',
                });
            }
        }
        try {
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
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }
};

exports.deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'User successfully deleted.',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    }
};

exports.followUser = async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
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
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    } else {
        res.status(400).json({
            message: "You can't follow yourself.",
        });
    }
};

exports.unfollowUser = async (req, res) => {
    if (req.params.id !== req.body.userId) {
        try {
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
        } catch (error) {
            res.status(500).json({
                message: 'Something went wrong.',
            });
        }
    } else {
        res.status(400).json({
            message: "You can't unfollow yourself.",
        });
    }
};
