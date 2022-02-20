const io = require('socket.io')(1717, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((el) => el.socketId !== socketId);
};

io.on('connection', (socket) => {
    console.log('a user connected.');

    socket.on('message', (msg) => {
        console.log(msg);
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected.');
        removeUser(socket.id);
    });

    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
    });

    socket.emit('usersConnected', users);
});
