const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
        },
        image: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        dislikes: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

// eslint-disable-next-line new-cap
const Post = new mongoose.model('post', postSchema);

module.exports = Post;
