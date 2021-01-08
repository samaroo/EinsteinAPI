const express = require('express');
const connectDB = require('./DB/connectDB');
const bodyParser = require('body-parser');

//import GET functions
const availablePaths = require('./API/GET/availablePaths');
const fetchSingleServerInfo = require('./API/GET/fetchSingleServerInfo');
const fetchAllReactRoleMessages = require('./API/GET/fetchAllReactRoleMessages');

//import POST fucntions
const registerSingleServer = require('./API/POST/registerSingleServer');
const registerReactRoleMessage = require('./API/POST/registerReactRoleMessage');

const app = express();

// for parsing application/json
app.use(express.json());
// for parsing req.body from x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//GET routes
app.get("/", availablePaths);
app.get("/:serverID", fetchSingleServerInfo);
app.get("/:serverID/reactRoleMessages", fetchAllReactRoleMessages);

//POST routes
app.post("/:serverID", registerSingleServer);
app.post("/:serverID/reactRoleMessages", registerReactRoleMessage);

const PORT = process.env.PORT || 8000;

//after connecting to mongoDB database, start listening
connectDB()
.then((result) => {
    console.log("Successfully connected to database...");
    console.log("Server is listening...");
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})
.catch((error) => {
    console.log(error);
});