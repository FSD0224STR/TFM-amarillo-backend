const { Server } = require('socket.io');

function webSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    const connectedUsers = {};

    io.on('connection', (socket) => {
        socket.on('userConnected', ({ userId }) => {
            connectedUsers[userId] = { socketId: socket.id, connected: true };
            console.log(`Usuario ${userId} se ha conectado.`);
            io.emit('connectedUsers', Object.keys(connectedUsers));
            console.log(Object.keys(connectedUsers));
        });

        socket.on('disconnect', () => {
            for (const userId in connectedUsers) {
                if (connectedUsers[userId].socketId === socket.id) {
                    delete connectedUsers[userId];
                    console.log(`Usuario ${userId} se ha desconectado.`);
                    io.emit('connectedUsers', Object.keys(connectedUsers));
                    break;
                }
            }
        });

        socket.on('msg', (msg) => {
            io.emit('msg', msg);
        });

        socket.on('status', (status) => {
            io.emit('status', status);
        });
    });
}

module.exports = webSocket;
