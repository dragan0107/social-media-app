const router = require('express').Router();

const {
    getPost,
    getUserPosts,
    getTimelinePosts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
} = require('../controllers/postController');

const { protect } = require('../controllers/authController');

router
    .get('/:postId', getPost)
    .get('/user/:username', getUserPosts)
    .get('/timeline/:userId', protect, getTimelinePosts)
    .post('/create', addPost)
    .put('/update/:postId', updatePost)
    .delete('/delete/:postId', protect, deletePost)
    .put('/:postId/like', likePost)
    .put('/:postId/dislike', dislikePost);

module.exports = router;
