import { io } from '/socket.io/socket.io.js';
const socket = io();
console.log(socket);

socket.emit('hello', 'world', (response) => {
  console.log(response); // "got it"
});
