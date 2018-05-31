//dependencies
const request = require("request-promise");
const models = require("./schemas.js");
const mongoose = require("mongoose");

const Rooms = mongoose.model('Rooms');

/*
  Creates a new room w/ random room code 100000-999999, random adminSecret
*/
exports.createRoom = (req, res) => {
  var roomCode;
  var adminSecret;
  // generate random number
  // while check the other roomcodes to make sure its not taken
  
  var newRoom = new Room({
    roomCode: roomCode,
    adminSecret: adminSecret,
    quizletSetID: req.body.quizlet_set_id
  });
  
  newRoom.save().then(() => {
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
