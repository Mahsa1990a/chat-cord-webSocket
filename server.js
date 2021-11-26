const path = require('path'); //nodejs core module
const http = require('http'); //http module
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set public folder as static folder => we can access html files and frontend
app.use(express.static(path.join(__dirname, 'public'))); //after adding this browser will show index.html

// Run it whenever a client connects:
io.on('connection', (socket) => {
  // console.log('New WebSocket Connection...');

  // Welcome connect user(to single client):
  socket.emit('message', 'Welcome to ChatCord!'); //we'll take it on main.js

  // Broadcast when a user connects: (to all clients, except the client that's connecting)
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Runs when client disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });

  //Listen for chat message
  socket.on('chatMessage', (message) => {
    // console.log(message);//saw it in terminal console
    //Emit it back to the client:
    io.emit('message', message)
  });
});

const PORT = 8080 || process.env.PORT;


// app.listen(PORT, () => {  UPDATE after adding server
server.listen(PORT, () => {
  console.log(`Servel Listening on PORT: ${PORT}`);
});