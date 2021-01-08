const Server = require('../../DB/serverModel');

const fetchAllReactRoleMessages = async (req, res) => {
    let {serverID} = req.params;
    let {token} = req.body;

    //if the request isn't coming from Einstein, forbid it
    if(token !== process.env.TOKEN){
        //403 status is forbidden
        res.status(403);
        res.send("Forbidden: You are not Einstein");
        return;
    }

    const result = await Server.findOne({serverID}).exec();

    if(!result){
        console.log("Error: Target serverID does not exist :(");
        res.status(400);
        res.send("Error: serverID provided does not exist in the database");
        return
    }

    res.status(200);
    res.json({
        serverID,
        reactRoleMessages: result.reactRoleMessages
    });
};

module.exports = fetchAllReactRoleMessages;