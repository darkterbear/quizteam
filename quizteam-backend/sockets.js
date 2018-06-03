// array that holds rooms and socket clients
/*
{
    roomCode: Number
    admin: {Socket},
    players: [Socket],
    availableCards: [Card]
    currentlyShownCards: [Card]
}
*/
var rooms = [];

const mongoose = require('mongoose');
const Rooms = mongoose.model('Rooms');

module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('client connected');

        // called by the room admin to assert as admin
        // creates the room object and stores in the rooms array
        client.on('roomAdmin', (room, adminSecret) => {
            Rooms.findOne({roomCode: room, adminSecret: adminSecret}, (err, room) => {
                if (err || room == null) {
                    client.emit('roomAdminResp', 'unauthorized/room not found');
                    return;
                }
                var newRoom = {
                    roomCode: room.roomCode,
                    admin: client,
                    players: [],
                    availableCards: room.cards,
                    currentlyShownCards: []
                };

                rooms.push(room);
                client.emit('roomAdminResponse', 'success');
            });
        });

        // called by player to join the room
        client.on('setRoom', (room) => {
            client.join(room, () => {
                var room = rooms.find((testRoom, i, rooms) => {
                    if (testRoom.roomCode == room.roomCode) return true;
                    return false;
                });

                if (room == null) {
                    client.emit('setRoomResponse', 'room doesnt exist');
                } else {
                    room.players.push(client);
                    client.emit('setRoomResponse', 'success');
                }
            });
        });

        // called by player to submit an action
        client.on('submitAction', (room, action) => {

        });

        // called by the player leaving the room
        client.on('disconnect', () => {

        });


    });
}