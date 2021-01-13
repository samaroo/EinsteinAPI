const Server = require('../../DB/serverModel');

const registerReactRoleMessage = async (req, res) => {
    let {serverID} = req.params;
    let {messageID} = req.body;
    let {channelID} = req.body;
    let {roleToEmojiMap} = req.body;
    let {token} = req.body;

    //if the request isn't coming from Einstein, forbid it
    if(token !== process.env.TOKEN){
        //403 status is forbidden
        res.status(403);
        res.send("Forbidden: You are not Einstein");
        return;
    }

    const check = await Server.findOne({serverID}).exec();

    if(!check){
        console.log("Error: Target serverID not found :(");
        res.status(404);
        res.send("Error: serverID provided not found in database");
        return;
    }

    let newMessageArray = [...check.reactRoleMessages, {messageID, channelID, roleToEmojiMap}];

    // `doc` is the document _before_ `update` was applied
    let jsonDoc = await Server.findOneAndUpdate(
        {serverID}, 
        {reactRoleMessages: newMessageArray},
        {lean: true}
    );

    if(jsonDoc){
        res.status(200);
        const result = await Server.findOne({serverID}).exec();
        res.json(result);
    }
    else{
        res.status(400);
        res.send("Error: update was unsuccessful");
    }
};

module.exports = registerReactRoleMessage;