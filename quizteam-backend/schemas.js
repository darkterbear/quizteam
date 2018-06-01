const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoomSchema = new Schema({
  roomCode: {
    type: Number,
    unique: true
  },
  adminSecret: String,
  quizletSetID: Number,
  cards: [{
    term: String,
    definition: String
  }]
});

module.exports = mongoose.model('Rooms', RoomSchema);
