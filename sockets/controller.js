const { Socket } = require('socket.io');
const { verifyJwt } = require('../helpers/vaerify-jwt');

const socketController = async (socket = new Socket()) => {
    const token = socket.handshake.headers['authorization'];

    const user = await verifyJwt(token);

    if (!user) {
        return socket.disconnect();
    }

    console.log(`${user.name} is connected`);

    socket.on('disconnect', () => {
        console.log(`${user.name} is disconnected`);
    });
};

module.exports = {
    socketController,
};
