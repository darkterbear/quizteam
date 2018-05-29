const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var RoomSchema = new Schema({
  roomCode: Number,
  adminSecret: String,
  quizletSetID: Number
});

module.exports = mongoose.model('Rooms', RoomSchema);
