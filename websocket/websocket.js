const { Server } = require('socket.io');

function webSocket(server) {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    const connectedUsers = {};
    let isHRonline = false

    const updateHRStatus = () => {
        const wasHRonline = isHRonline;
        isHRonline = Object.values(connectedUsers).some(user => user.isHR === "HR");
        console.log(isHRonline)
        if (isHRonline !== wasHRonline) {
            io.emit('isHRconnected', isHRonline);
            console.log(`HR online status changed: ${isHRonline}`);
        }
    };

    io.on('connection', (socket) => {
        socket.on('userConnected', ({ userId, isHR }) => {
            connectedUsers[userId] = { socketId: socket.id, connected: true, isHR }
            console.log(`Usuario ${userId} se ha conectado. Es ${isHR} `)

            updateHRStatus()
            io.emit('isHRconnected', isHRonline);

            io.emit('connectedUsers', Object.keys(connectedUsers))
            console.log(Object.keys(connectedUsers))
        });

        socket.on('disconnect', () => {
            for (const userId in connectedUsers) {
                if (connectedUsers[userId].socketId === socket.id) {
                    delete connectedUsers[userId]
                    console.log(`Usuario ${userId} se ha desconectado.`)

                    updateHRStatus()

                    io.emit('connectedUsers', Object.keys(connectedUsers))
                    break;
                }
            }
        });

        socket.on('chatMessage', (msg) => {
            io.emit('chatMessage', msg);
            console.log(msg)
        });

        socket.on('status', (status) => {
            io.emit('status', status);
        });
    });
}

module.exports = webSocket;
