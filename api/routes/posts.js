const router = require('express').Router();
const {
    addPost,
    updatePost,
    deletePost,
} = require('../controllers/postController');

router
    .post('/create', addPost)
    .put('/update/:postId', updatePost)
    .delete('/delete/:postId', deletePost);

module.exports = router;
