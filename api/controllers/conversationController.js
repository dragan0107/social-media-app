const Conversation = require('../models/Conversation');
const catchAsync = require('../utils/catchAsync');
// Create a new conversation between 2 users.
exports.createConversation = catchAsync(async (req, res, next) => {
    const newConv = await Conversation.create({
        members: [req.body.senderId, req.body.receiverId],
    });
    res.status(201).json({
        message: 'Conversation created',
        newConv,
    });
});

// Get all conversations from a given userId
exports.getConversations = catchAsync(async (req, res, next) => {
    const conversations = await Conversation.find({
        members: { $in: [req.params.userId] },
    });
    res.status(201).json({
        message: 'Conversation found',
        conversations,
    });
});

//Get conversation including 2 users.

exports.getConversationsTwoUsers = catchAsync(async (req, res, next) => {
    const conversation = await Conversation.findOne({
        members: {
            $all: [req.params.firstUserId, req.params.secondUserId],
        },
    });

    res.status(200).json(conversation);
});
