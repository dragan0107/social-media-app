const router = require('express').Router();

const {
    getUser,
    updateUser,
    deleteUser,
    followUser,
    unfollowUser,
    getFriends,
} = require('../controllers/userController');

router
    .get('/', getUser)
    .get('/friends/:userId', getFriends)
    .put('/:id', updateUser)
    .delete('/:id', deleteUser)
    .put('/:id/follow', followUser)
    .put('/:id/unfollow', unfollowUser);

module.exports = router;
