const socket = io(); //we have access to io because of script  tag in chat.html

socket.on('message', (message) => {//reciving socket.emit from server.js
  console.log(message); //in browser console we got the message('Welcome to ChatCord!')
});