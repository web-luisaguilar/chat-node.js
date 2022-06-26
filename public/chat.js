const d = document;
const socket = io();
const $input = d.querySelector('#message-text'),
  $ul = d.querySelector('#chat');

d.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('new message', $input.value);
  $input.value = '';
});
socket.on('new user', ({ message }) => {
  alert(message);
});

socket.on('user says', (message) => {
  const $li = d.createElement('li');
  $li.innerHTML = message;
  $ul.appendChild($li);
  console.log(message);
});

socket.on('bye user', ({ message }) => {
  alert(message);
});

//socket.emit('hello', 'User Conencted');
