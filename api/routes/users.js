const router = require('express').Router();
const {
    getUser,
    updateUser,
    deleteUser,
    followUser,
} = require('../controllers/userController');

router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id/follow', followUser);

module.exports = router;
