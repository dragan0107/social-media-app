const Post = require('../models/Post');

// Add new post.
exports.addPost = async (req, res) => {
    try {
        const newPost = await Post.create(req.body);
        res.status(201).json({
            message: 'Post created',
            newPost,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong, please try again.',
        });
    }
};

// Update a post.
exports.updatePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.postId,
            {
                $set: req.body,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            message: 'Post successfully updated',
            post,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong, please try again.',
            error,
        });
    }
};

exports.deletePost = async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json({
            message: 'Successfully deleted the post.',
        });
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong, please try again.',
            error,
        });
    }
};
