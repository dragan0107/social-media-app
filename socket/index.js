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

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
    console.log('a user connected.');

    //remove the user after their socket server disconnection
    socket.on('disconnect', () => {
        console.log('a user disconnected.');
        removeUser(socket.id);
        io.emit('usersConnected', users);
    });

    //send and get messages

    socket.on('sendMessage', ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);

        if (user) {
            io.to(user.socketId).emit('getMessage', {
                senderId,
                text,
            });
        }
    });

    //add user to the currently connected users array and reemit the updated list
    socket.on('addUser', (userId) => {
        addUser(userId, socket.id);
        io.emit('usersConnected', users);
    });

    socket.on('userTyping', ({userTyping}) => {
        console.log(userTyping)
    })

    socket.emit('usersConnected', users);
});
