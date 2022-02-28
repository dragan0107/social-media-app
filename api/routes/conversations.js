const router = require('express').Router();

const {
    createConversation,
    getConversations,
    getConversationsTwoUsers,
} = require('../controllers/conversationController');

router
    .post('/', createConversation)
    .get('/:userId', getConversations)
    .get('/:firstUserId/:secondUserId', getConversationsTwoUsers);

module.exports = router;
