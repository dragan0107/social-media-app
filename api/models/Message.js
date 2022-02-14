const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
    },
    { timestamps: true }
);

// eslint-disable-next-line new-cap
const Message = new mongoose.model('message', messageSchema);

module.exports = Message;
