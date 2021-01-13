const mongoose = require("mongoose");
require('mongoose-long')(mongoose);
const {Types: {Long}} = mongoose;

const roleToEmojiMapSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true
    },
    emoji: {
        type: String,
        required: true
    }
});

const reactRoleMessagesSchema = new mongoose.Schema({
    channelID: {
        type: Long,
        required: true
    },
    messageID: {
        type: Long,
        required: true
    },
    roleToEmojiMap: {
        type: [roleToEmojiMapSchema],
        required: true
    }
});

const serverSchema = new mongoose.Schema({
    serverID: {
        type: Long,
        required: true
    },
    reactRoleMessages: {
        type: [reactRoleMessagesSchema],
        required: false
    }
}, {timestamps: true});

let Server = mongoose.model('Server', serverSchema);

module.exports = Server;