const express = require('express');
const mongoose = require('mongoose');
const models = require('./schemas.js');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const sockets = require('./sockets.js');
const app = express();
const port = 3000;

// Connect MongoDB with Mongoose

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/quizteamDB', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log("MongoDB is connected!");
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

sockets.io(io);

app.use((req,res,next) => {
    req.io = io;
    next();
});
server.listen(port);
console.log("Quizteam API is live!");
