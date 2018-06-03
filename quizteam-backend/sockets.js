// array that holds rooms and socket clients
/*
{
    roomCode: Number
    admin: {Socket},
    players: [Socket],
    availableCards: [Card]
    currentlyShownCards: [Card],
    score: Number,
    playerCards: {
        socket_id -> [Card]
    },
    currentlyPlayerCards: {
        index of card in currentlyShownCards -> True
    }
}
*/
var rooms = {};
exports.rooms = rooms;

const mongoose = require('mongoose');
const Rooms = mongoose.model('Rooms');

exports.io = (io) => {

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomShowCard(room) {
        room = rooms[room];
        var index;
        while (true) {
            index = getRandomInt(0, room.availableCards.length);

            if (room.currentlyPlayerCards[index]) {
                break;
            }
        }
        return room.currentlyPlayerCards[index];
    }

    function updateScore(namespace, score) {
        io.to(namespace).emit('updateScore', score);
    }

    function getRandomPlayerCard(room) {
        room = rooms[room];
        var index;
        while (true) {
            index = getRandomInt(0, room.availableCards.length)
            if (room.currentlyPlayerCards[index] == undefined) {
                room.currentlyPlayerCards[index] = true
                break
            }
        }

        return room.currentlyShownCards[index];
    }

    io.on('connection', (client) => {
        console.log('client connected');

        // called by the room admin to assert as admin
        // creates the room object and stores in the rooms array
        client.on('roomAdmin', (room, adminSecret) => {
            Rooms.findOne({roomCode: room, adminSecret: adminSecret}, (err, room) => {
                if (err || room == null) {
                    client.emit('roomAdminResponse', 'unauthorized/room not found');
                    return;
                }
                var newRoom = {
                    roomCode: room.roomCode,
                    admin: client,
                    players: [],
                    availableCards: room.cards,
                    currentlyShownCards: [],
                    score: 0,
                    currentlyPlayerCards: {}
                };

                rooms[newRoom.roomCode] = newRoom;
                client.emit('roomAdminResponse', 'success');
            });
        });

        // called by player to join the room
        client.on('setRoom', (room) => {
            client.join(room, () => {
                console.log(rooms)
                console.log('________________________________________________________')
                if (room in rooms) {
                    console.log(room)
                    rooms[room].players.push(client);
                    client.emit('setRoomResponse', 'success');
                    rooms[room].admin.emit('updateNumberOfPlayers', rooms[room].players.length);
                } else {
                    console.log('room doesnt exist!!!!!!')
                    client.emit('setRoomResponse', 'room doesnt exist');
                }
            });
        });

        // called by player to submit an action
        /**
         * @param {Number} room - Room code
         * @param {Number} action - index of the Card pressed
         */
        client.on('submitAction', (room, action) => {
            for (var index = 0; index < rooms[room].currentlyShownCards.length; index++) {
                if (rooms[room].currentlyShownCards[index].index == action) {
                    rooms[room].score += 10
                    updateScore(room, rooms[room].score)
                    delete rooms.currentlyPlayerCards[action]
                    var newPlayerCard = getRandomPlayerCard(room);
                    client.emit('swapCards', action, newPlayerCard);
                    var newShowCard = getRandomShowCard(room);
                    for (var index in rooms[room].currentlyShownCards) {
                        if (rooms[room].currentlyShownCards[index].index == action) {
                            rooms[room].currentlyShownCards[index] = newShowCard
                            break;
                        }
                    }
                    rooms[room].admin.emit('swapCards', action, newShowCard);
                    return;
                }
            }
            //incorrect press
            rooms[room].score -= 10;
            updateScore(room, rooms[room].score);
        });

        // called by the player leaving the room
        //TODO: check if left user had cards
        client.on('disconnect', () => {
            var clientRooms = Object.keys(client.rooms);
            //0 index is socket id
            for (var i = 1; i < clientRooms.length; i++) {
                if (rooms[clientRooms[r]]) {
                    //check if disconnected user is roomadmin, delete room if true
                    if (r.admin === client) {
                        delete rooms[clientRooms[r]];
                        continue;
                    }
                    //check if disconnected user is player, delete player from array if true
                    for (var index = 0; index < rooms[r].players.length; i++) {
                        if (rooms[clientRooms[r]].players[index] === client) {
                            rooms[clientRooms[r]].players.splice(index, 1);
                        }
                    }
                }
            }
        });


    });
}