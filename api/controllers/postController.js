const Post = require('../models/Post');
const User = require('../models/User');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// Add new post.
exports.addPost = catchAsync(async (req, res, next) => {
    const newPost = await Post.create(req.body);
    res.status(201).json({
        message: 'Post created',
        newPost,
    });
});

// Update a post.
exports.updatePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (post.userId === req.body.userId) {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.postId,
            req.body,
            { new: true }
        );
        res.status(200).json({
            message: 'Post successfully updated',
            updatedPost,
        });
    } else {
        return next(
            new AppError('You can not update other peoples posts.', 401)
        );
    }
});

// Delete a single post.
exports.deletePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    post.deleteOne();
    res.status(200).json({
        message: 'Successfully deleted the post.',
    });
});

// Get a single post.

exports.getPost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    res.status(200).json({
        message: 'Post found.',
        post,
    });
});

// Get timeline posts.

exports.getTimelinePosts = catchAsync(async (req, res, next) => {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendsPosts = await Promise.all(
        currentUser.following.map((friend) => Post.find({ userId: friend }))
    );
    const allPosts = userPosts.concat(...friendsPosts);
    // const exampleDate = new Date(allPosts[0].createdAt).getTime();
    allPosts.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    res.status(200).json({
        message: 'Success',
        allPosts,
    });
});

// Get all posts from a single user

exports.getUserPosts = catchAsync(async (req, res, next) => {
    const foundUser = await User.findOne({ username: req.params.username });
    const allPosts = await Post.find({ userId: foundUser._id }).sort(
        '-createdAt'
    );
    res.status(200).json({
        message: 'Success',
        allPosts,
    });
});

// Like a post.
exports.likePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post.likes.includes(req.body.userId)) {
        //if no likes, it will add one

        if (post.dislikes.includes(req.body.userId)) {
            // If there was a dislike by this user before, we remove it before adding a like.
            await post.updateOne({ $pull: { dislikes: req.body.userId } });
        }

        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json({
            message: 'Post has been liked',
        });
    } else {
        //if there is a like already, it takes it away
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json({
            message: 'Post has been unliked',
        });
    }
});

// Dislike a post.
exports.dislikePost = catchAsync(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post.dislikes.includes(req.body.userId)) {
        //if no dislikes, it will add one

        if (post.likes.includes(req.body.userId)) {
            // If there was a like by this user before, we remove it before adding a dislike.
            await post.updateOne({ $pull: { likes: req.body.userId } });
        }

        await post.updateOne({ $push: { dislikes: req.body.userId } });
        res.status(200).json({
            message: 'Post has been disliked.',
        });
    } else {
        //if there is a like already, it takes it away
        await post.updateOne({ $pull: { dislikes: req.body.userId } });
        res.status(200).json({
            message: 'Dislike has been removed.',
        });
    }
});
