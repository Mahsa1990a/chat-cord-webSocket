const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');

//Get username and room from URL(using query string library)
const { username, room } = Qs.parse(window.location.search, {
  //using option to not get ? or &
  ignoreQueryPrefix: true
});

// console.log("username & room ===> ", username, room);

const socket = io(); //we have access to io because of script  tag in chat.html

//Join chatroom:
socket.emit('joinRoom', { username, room });

socket.on('message', (message) => {//reciving socket.emit from server.js
  console.log(message); //in browser console we got the message('Welcome to ChatCord!')
  outputMessage(message); //let's create a function to output msg to DOM

  //Automatically scroll down after adding new msg:
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

//Message submit:
chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get message text                 //msg is id for input
  const message = event.target.elements.msg.value;
  // console.log(message); //saw it in browser console
  socket.emit('chatMessage', message); //Emit message to server

  //Clear input after sending message:
  event.target.elements.msg.value = '';
  event.target.elements.msg.focus();
});

//Output message to DOM
function outputMessage(message) {
  const div = document.createElement('div'); //we create a new div
  div.classList.add('message'); //add message class that we already have in chat.html
  div.innerHTML = ` 
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  `; //copy the div from chat html
  document.querySelector('.chat-messages').appendChild(div);//append new div to previous
}