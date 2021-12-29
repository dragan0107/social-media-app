const router = require('express').Router();
const { userRegister, userLogin } = require('../controllers/authController');

router.post('/register', userRegister).post('/login', userLogin);

module.exports = router;
