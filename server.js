const path = require('path'); //nodejs core module
const http = require('http'); //http module
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set public folder as static folder => we can access html files and frontend
app.use(express.static(path.join(__dirname, 'public'))); //after adding this browser will show index.html

const botName = 'ChatCord Bot';
// Run it whenever a client connects:
io.on('connection', (socket) => {
  // console.log('New WebSocket Connection...');

  //
  socket.on('joinRoom', ({ username, room }) => {

    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome connect user(to single client):
    // socket.emit('message', 'Welcome to ChatCord!'); //we'll take it on main.js  //UPDATE after adding formatMessage
    socket.emit('message', formatMessage(botName,'Welcome to ChatCord!'));
  
    // Broadcast when a user connects: (to all clients, except the client that's connecting)
    // socket.broadcast.emit('message', 'A user has joined the chat');//UPDATE after adding formatMessage
    socket.broadcast.to(user.room).emit(
      'message', 
      formatMessage(botName, `${user.username} has joined the chat`)
    );

    //Sends users and room info
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });

  });

  //Listen for chat message
  socket.on('chatMessage', (message) => {
    const user = getCurrentUser(socket.id);

    // console.log(message);//saw it in terminal console
    //Emit it back to the client:
    // io.emit('message', message)//UPDATE after adding formatMessage
    io.to(user.room).emit('message', formatMessage(user.username, message))
  });

  // Runs when client disconnects
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    if(user) {
      // io.emit('message', 'A user has left the chat');//UPDATE after adding formatMessage
      io.to(user.room).emit(
        'message', 
        formatMessage(botName, `${user.username} has left the chat`)
      );

      //Sends users and room info
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
  
});

const PORT = 8080 || process.env.PORT;


// app.listen(PORT, () => {  UPDATE after adding server
server.listen(PORT, () => {
  console.log(`Servel Listening on PORT: ${PORT}`);
});