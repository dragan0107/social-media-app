const Message = require('../models/Message');

exports.newMessage = async (req, res) => {
    try {
        const newMsg = await Message.create(req.body);

        res.status(200).json({
            message: 'Message sent.',
            newMsg,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong.',
            error,
        });
    }
};

// Get all messages from a specific conversation by its ID.
exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error,
        });
    }
};
