import openSocket from 'socket.io-client';

const socket = openSocket('http://138.197.207.244/');

module.exports = {
    emit: function(event, message) {
        socket.emit(event, message);
    },
    socket: socket
}