const mongoose = require("mongoose");

const reactRoleMessagesSchema = new mongoose.Schema({
    channelID: {
        type: Number,
        required: true
    },
    messageID: {
        type: Number,
        required: true
    }
});

const serverSchema = new mongoose.Schema({
    serverID: {
        type: Number,
        required: true
    },
    reactRoleMessages: {
        type: [reactRoleMessagesSchema],
        required: false
    }
}, {timestamps: true});

let Server = mongoose.model('Server', serverSchema);

module.exports = Server;