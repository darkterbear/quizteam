const express = require('express');
const mongoose = require('mongoose');
const models = require('./schemas.js');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const sockets = require('./sockets.js');
const app = express();
const cors = require('cors');
const port = 3000;
const path = require('path');

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
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    //res.header("Access-Control-Allow-Origin", "http://quizteam.dsys32.com");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req,res,next) => {
    req.io = io;
    next();
});

routes(app);

var server = require('http').createServer(app);
var io = require('socket.io')(server);

sockets.io(io);

server.listen(port);
console.log("Quizteam API is live!");
