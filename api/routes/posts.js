const router = require('express').Router();

const {
    getPost,
    getTimelinePosts,
    addPost,
    updatePost,
    deletePost,
    likePost,
    dislikePost,
} = require('../controllers/postController');

router
    .get('/:postId', getPost)
    .get('/timeline/:userId', getTimelinePosts)
    .post('/create', addPost)
    .put('/update/:postId', updatePost)
    .delete('/delete/:postId', deletePost)
    .put('/:postId/like', likePost)
    .put('/:postId/dislike', dislikePost);

module.exports = router;
