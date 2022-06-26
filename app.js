'use strict';

const port = process.env.PORT || 3000;
const http = require('http');
const express = require('express');
const app = express(),
  { Server } = require('socket.io');

const publicDir = express.static(`${__dirname}/public`);
const httpServer = http.createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
  console.log('User Conectado');
  socket.broadcast.emit('new user', {
    message: 'Ha entrado un usuario al Chat',
  });

  socket.on('new message', (message) => {
    console.log(message);
    io.emit('user says', message);
  });
  socket.on('disconnect', () => {
    console.log('Usuario Desconectado');
    socket.broadcast.emit('bye user', {
      message: 'Ha salido un usuario del Chat',
    });
  });
});

app.use(publicDir);

app.get('/', (req, res) => {
  res.status(200, {
    'Content-Type': 'text/html',
  });
  res.sendFile(`${publicDir}/index.html`);
});

httpServer.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
