// array that holds rooms and socket clients
/*
{
    admin: {Socket},
    players: [Socket]
}
*/
rooms = [];

module.exports = (io) => {
    io.on('connection', (client) => {
        console.log('client connected');

        // called by the room admin to assert as admin
        // creates the room object and stores in the rooms array
        client.on('roomAdmin', (room, adminSecret) => {

        });

        // called by player to join the room
        client.on('setRoom', (room) => {
            client.join(room, () => {

            });
        });

        // called by player to submit an action
        client.on('submitAction', (room, action) => {

        })

        // called by the player leaving the room
        client.on('disconnect', () => {

        });


    });
}