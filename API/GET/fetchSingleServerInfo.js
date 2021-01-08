const Server = require('../../DB/serverModel');

const fetchSingleServerInfo = async (req, res) => {
    let serverID = req.params.serverID;
    let {token} = req.body;

    //if the request isn't coming from Einstein, forbid it
    if(token !== process.env.TOKEN){
        //403 status is forbidden
        res.status(403);
        res.send("Forbidden: You are not Einstein");
        return;
    }

    const result = await Server.findOne({serverID}).exec();

    if(result){
        res.status(200);
        res.json(result);
    }
    else{
        res.status(404);
        res.send("Error: serverID not found in database");
    }
};

module.exports = fetchSingleServerInfo;