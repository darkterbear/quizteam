//dependencies
const axios = require('axios');
const request = require('request-promise');
const hat = require('hat');
const models = require('./schemas.js');
const mongoose = require('mongoose');
var rooms = require('./sockets').rooms;
const config = require('./config')

const Rooms = mongoose.model('Rooms');
const quizletBaseURL = 'https://api.quizlet.com/2.0/sets/';

/*
  Creates a new room w/ random room code 100000-999999, random adminSecret
*/
exports.createRoom = (req, res) => {
  if (req.body.quizletSetID == null) {
    res.json({
      resp_code: 1,
      resp_msg: 'null parameters'
    });
    return;
  }

  axios.get(quizletBaseURL + req.body.quizletSetID + '?client_id=kjKPWqeGJf&whitespace=1').then((data) => {
    data = data.data;
    console.log(data);
    if ('error' in data || !('terms' in data)) {
      res.json({
        resp_code: 3,
        resp_msg: 'quizlet set data doesnt exist'
      });
      return;
    }

    // generate random number
    var roomCode = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    var adminSecret = hat();

    for (var index in data.terms) {
      data.terms[index].index = index;
    }

    var newRoom = new Rooms({
      roomCode: roomCode,
      adminSecret: adminSecret,
      quizletSetID: req.body.quizletSetID,
      cards: data.terms
    });

    newRoom.save().then((err) => {
      res.json({
        resp_code: 100,
        room_code: roomCode,
        admin_secret: adminSecret,
        setTitle: data.title,
        cards: data.terms
      });
    });
  }).catch((error) => {
    console.log('axios: fetch quizlet set data error: ' + error);
    res.json({
      resp_code: 10,
      resp_msg: 'axios: fetch quizlet set data error: ' + error
    });
  });
}

// deletes the room
exports.destroyRoom = (req, res) => {
  if (req.body.adminSecret == null || req.body.roomCode == null) {
    res.json({
      resp_code: 1,
      resp_msg: 'null parameters'
    });
    return;
  }

  Rooms.findOneAndDelete({
    adminSecret: req.body.adminSecret,
    roomCode: req.body.roomCode
  }, (removedRoom) => {
    res.json({
      resp_code: 100
    });
  });
}

exports.startGame = (req, res) => {
  if (req.body.adminSecret == null || req.body.roomCode == null) {
    res.json({
      resp_code: 1,
      resp_msg: 'null parameters'
    });
    return;
  }

  Rooms.findOne({
    adminSecret: req.body.adminSecret,
    roomCode: req.body.roomCode
  }, (err, room) => {
    if (err || room == null) {
      res.json({
        resp_code: 2,
        resp_msg: 'room not found or admin secret incorrect'
      });
      return;
    }
    req.io.to(room.roomCode).emit('startGame');
    startGame();
    res.json({
      resp_code: 100
    });
  });
}

function startGame(roomCode) {
  let room = rooms[roomCode];

  //give players random cards
  let indices = []
  let usedCardIndices = []
  for (var index in room.availableCards) {
    indices.push(index)
  }

  for (var index = 0; index < room.players.length; index++) {
    var socket = room.players[index];

    for (var i = 0; i<config.numberOfCardsPerPlayer;i++) {
      //generate random card, no duplicates
      var randomIndex = getRandomInt(0, indices.length)
      var randomCard = room.availableCards[indices[randomIndex]];
      usedCardIndices.push(indices.splice(randomIndex, 1)[0]);
      
      //emit player cards to players
      socket.emit('addCard', randomCard);
    }
  }

  for (var index in usedCardIndices) {
    room.currentlyPlayerCards[usedCardIndices[index]] = true;
  }

  //random shown cards
  for (var i = 0; i < config.numberofShownCards; i++) {
    //generate random card, no duplicates
    var randomIndex = getRandomInt(0, usedCardIndices.length)
    var randomCard = room.availableCards[usedCardIndices[randomIndex]];
    usedCardIndices.splice(randomIndex, 1);

    room.currentlyShownCards.push(randomCard);
  }

  //emit show cards to host
  room.admin.emit('initialCards', room.currentlyShownCards);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}