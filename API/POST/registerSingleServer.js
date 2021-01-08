const Server = require('../../DB/serverModel');

const registerSingleServer = async (req, res) => {
    let {serverID} = req.params;
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
        const data = {
            serverID,
            reactRoleMessages: []
        };

        //instance of model, AKA a "document"
        const serverPost = new Server(data);

        console.log("saving...");

        console.log("saving...");

        const result = await serverPost.save();

        if(result){
            console.log("Successfully sent data to remote databse :)");
            res.status(200);
            res.json(result);
        }
        else{
            res.status(400);
            res.send("Error sending data to remote database");
        }
    }
    else{
        res.status(200);
        res.json(check);
    }
    
};

module.exports = registerSingleServer;