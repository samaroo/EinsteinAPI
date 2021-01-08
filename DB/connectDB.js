const mongoose = require('mongoose');

const dbName = process.env.DB_NAME;
const username = process.env.DB_USRNAME;
const password = process.env.DB_PASSWORD;

const URI = `mongodb+srv://${username}:${password}@serverinformation.a4wdl.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log(`Connected to DB: ${dbName}`);
}

module.exports = connectDB;