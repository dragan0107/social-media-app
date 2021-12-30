const router = require('express').Router();

const {
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
} = require('../controllers/userController');

router
    .get('/:id', getUser)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .put('/:id/follow', followUser)
    .put('/:id/unfollow', unfollowUser);

module.exports = router;
