const router = require('express').Router();

const {
    newMessage,
    getMessages,
} = require('../controllers/messagesController');

router.get('/:conversationId', getMessages).post('/', newMessage);

module.exports = router;
