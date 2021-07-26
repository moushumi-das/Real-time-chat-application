const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const textFormat = require('./utils/textMessage');
const {
    getJoinedUser,
    getCurrentUser
} = require('./utils/user');

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
const chatBot = 'ChatCord Bot';
io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = getJoinedUser(socket.id, username, room);

        socket.join(user.room);
        socket.emit('message', textFormat(chatBot, "welcome to chat"));
        socket.broadcast.to(user.room).emit('message', textFormat(chatBot, `${user.username} has joined the chat`));
    })


    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.emit('message', textFormat(user.username, msg))
        console.log(msg)
    })
})



const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));