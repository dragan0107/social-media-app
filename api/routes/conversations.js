const router = require('express').Router();

const {
    createConversation,
    getConversations,
} = require('../controllers/conversationController');

router.post('/', createConversation).get('/:userId', getConversations);

module.exports = router;
