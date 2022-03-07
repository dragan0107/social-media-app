const Message = require('../models/Message');
const catchAsync = require('../utils/catchAsync');

exports.newMessage = catchAsync(async (req, res, next) => {
    const newMsg = await Message.create(req.body);

    res.status(200).json({
        message: 'Message sent.',
        newMsg,
    });
});

// Get all messages from a specific conversation by its ID.
exports.getMessages = catchAsync(async (req, res, next) => {
    const messages = await Message.find({
        conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
});
