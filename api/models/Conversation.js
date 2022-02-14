const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    { timestamps: true }
);

// eslint-disable-next-line new-cap
const Conversation = new mongoose.model('conversation', conversationSchema);

module.exports = Conversation;
