const chatForm = document.getElementById("chat-form");

const socket = io(); //we have access to io because of script  tag in chat.html

socket.on('message', (message) => {//reciving socket.emit from server.js
  // console.log(message); //in browser console we got the message('Welcome to ChatCord!')
});

//Message submit:
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get message text                 //msg is id for input
  const message = event.target.elements.msg.value;
  // console.log(message); //saw it in browser console
  socket.emit('chatMessage', message); //Emit message to server
})