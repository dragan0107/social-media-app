const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: 3,
            max: 20,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 6,
        },
        profilePic: {
            type: String,
            default: '',
        },
        coverPic: {
            type: String,
            default: '',
        },
        followers: {
            type: Array,
            default: [],
        },
        following: {
            type: Array,
            default: [],
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// eslint-disable-next-line new-cap
const User = new mongoose.model('user', userSchema);

module.exports = User;
