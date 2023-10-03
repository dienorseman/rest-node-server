const { Socket } = require('socket.io');

const { Chat } = require('../models');
const { verifyJwt } = require('../helpers');

const chat = new Chat();

const socketController = async ( socket = new Socket(), io ) => {
    const token = socket.handshake.headers['authorization'];

    const user = await verifyJwt( token );

    if ( !user ) {
        return socket.disconnect();
    }

    chat.connectUser( user );
    socket.emit( 'receive-messages', chat.last10 );

    socket.join( user.id );

    io.emit( 'active-users', chat.usersArr );

    socket.on( 'disconnect', () => {
        chat.disconnectUser( user.id );
        io.emit( 'active-users', chat.usersArr );
    });

    socket.on('send-message', ({message, uid}) => {
        if ( uid ) {
            // Private message
            socket.to( uid ).emit( 'private-message', { from: user.name, message } );
        } else {
            chat.sendMessage( user.id, user.name, message );
            console.log( chat.last10 );
            io.emit( 'receive-messages', chat.last10 );
        }
    });
};

module.exports = {
    socketController,
};
