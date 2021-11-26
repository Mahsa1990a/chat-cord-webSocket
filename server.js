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
  console.log('New WebSocket Connection...');
});

const PORT = 8080 || process.env.PORT;


// app.listen(PORT, () => {  UPDATE after adding server
server.listen(PORT, () => {
  console.log(`Servel Listening on PORT: ${PORT}`);
});