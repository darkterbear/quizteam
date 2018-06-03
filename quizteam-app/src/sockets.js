import openSocket from 'socket.io-client';

const socket = openSocket('http://138.197.207.244:3000/');

export default socket;

function emit(event, ...message) {
    socket.emit(event, message);
};

export { emit };