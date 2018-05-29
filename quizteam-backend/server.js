const express = require('express');
const mongoose = require('mongoose');
const models = require('./schemas.js');
const bodyParser = require('body-parser');
const routes = require('./routes.js');
const app = express();
const port = 3000;

// Connect MongoDB with Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/quizteamDB', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    print("MongoDB is connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

app.listen(port);
print("Quizteam API is live!");
