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

    function isNotCurrentlyShown(index, room) {
        for (var i = 0; i < room.currentlyShownCards.length; i++) {
            if (room.currentlyShownCards[i].index == index) return false;
        }
        return true;
    }

    function getRandomShowCard(room) {
        room = rooms[room];
        var index;
        while (true) {
            index = getRandomInt(0, room.availableCards.length - 1);

            if (room.currentlyPlayerCards[index] && isNotCurrentlyShown(index, room)) {
                break;
            }
        }
        return room.availableCards[index];
    }

    function updateScore(room, score) {
        //console.log('update score ' + score);
        rooms[room].admin.emit('updateScore', score);
    }

    function getRandomPlayerCard(room) {
        room = rooms[room];
        var index;
        while (true) {
            index = getRandomInt(0, room.availableCards.length - 1)
            if (room.currentlyPlayerCards[index] == undefined) {
                room.currentlyPlayerCards[index] = true
                break
            }
        }

        return room.availableCards[index];
    }

    io.on('connection', (client) => {

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
                if (room in rooms) {
                    rooms[room].players.push(client);
                    client.emit('setRoomResponse', 'success');
                    rooms[room].admin.emit('updateNumberOfPlayers', rooms[room].players.length);
                } else {
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
            for (var index4 = 0; index4 < rooms[room].currentlyShownCards.length; index4++) {
                //console.log(action + " " + rooms[room].currentlyShownCards[index4].index);
                if (rooms[room].currentlyShownCards[index4].index == action) {
                    rooms[room].score += 10
                    updateScore(room, rooms[room].score)
                    delete rooms[room].currentlyPlayerCards[action]
                    var newPlayerCard = getRandomPlayerCard(room);
                    console.log(newPlayerCard)
                    
                    var newShowCard = getRandomShowCard(room);
                    console.log(newShowCard)
                    rooms[room].currentlyShownCards.forEach((card) => {
                        if (card.index == action) {
                            rooms[room].currentlyShownCards[index4] = newShowCard
                        }
                    });
                    
                    rooms[room].admin.emit('swapCards', action, newShowCard);
                    client.emit('swapCards', action, newPlayerCard);
                    return;
                }
            }
            
            //incorrect press
            rooms[room].score -= 10;
            updateScore(room, rooms[room].score);
        });

        // called by the player leaving the room
        //TODO: check if left user had cards
        client.on('leaveRoom', () => {
            var clientRooms = Object.keys(client.rooms);
            //0 index is socket id
            for (var i = 1; i < clientRooms.length; i++) {
                if (rooms[clientRooms[i]]) {
                    var r = rooms[clientRooms[i]];
                    // check if disconnected user is roomadmin, delete room if true
                    if (r.admin === client) {
                        io.to(r.roomCode).emit('roomDestroyed');
                        delete rooms[clientRooms[r]];
                        return;
                    }
                    //check if disconnected user is player, delete player from array if true
                    for (var index = 0; index < r.players.length; index++) {
                        if (r.players[index] === client) {
                            r.players.splice(index, 1);
                        }
                    }
                }
            }
        });


    });
}