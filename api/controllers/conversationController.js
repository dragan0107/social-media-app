const Conversation = require('../models/Conversation');

// Create a new conversation between 2 users.
exports.createConversation = async (req, res) => {
    try {
        const newConv = await Conversation.create({
            members: [req.body.senderId, req.body.receiverId],
        });
        res.status(201).json({
            message: 'Conversation created',
            newConv,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

// Get all conversations from a given userId
exports.getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(201).json({
            message: 'Conversation found',
            conversations,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};

//Get conversation including 2 users.

exports.getConversationsTwoUsers = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: {
                $all: [req.params.firstUserId, req.params.secondUserId],
            },
        });

        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};
