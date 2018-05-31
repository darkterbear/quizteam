//dependencies
const request = require("request-promise");
const hat = require("hat");
const models = require("./schemas.js");
const mongoose = require("mongoose");

const Rooms = mongoose.model('Rooms');

/*
  Creates a new room w/ random room code 100000-999999, random adminSecret
*/
exports.createRoom = (req, res) => {
  
  // generate random number
  var roomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  
  var adminSecret = hat();
 
  
  var newRoom = new Rooms({
    roomCode: roomCode,
    adminSecret: adminSecret,
    quizletSetID: req.body.quizlet_set_id
  });
  
  newRoom.save().then((err) => {
    res.json({
      resp_code: 100,
      room_code: roomCode,
      admin_secret: adminSecret
    });
  });
}

// deletes the room
exports.destroyRoom = (req, res) => {
  
}


exports.joinRoom = (req, res) => {
  
}

exports.leaveRoom = (req, res) => {
  
}

exports.startGame = (req, res) => {
  
}
