const io = require('socket.io')(1717, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

io.on('connection', (socket) => {
    console.log('a user connected.');

    socket.on('message', (msg) => {
        console.log(msg);
    });
});
