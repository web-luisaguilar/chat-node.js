'use strict';

const http = require('http'),
  express = require('express'),
  app = express(),
  { Server } = require('socket.io'),
  port = process.env.PORT || 3000,
  publicDir = express.static(`${__dirname}/public`);

http.createServer(app);
const io = new Server(http);

io.on('connection', (socket) => {
  console.log('User Connected');
  socket.on('hello', (arg, callback) => {
    console.log(arg); // "world"
    callback('got it');
  });
});

app.use(publicDir);

app.get('/', (req, res) => {
  res.sendFile(`${publicDir}/index.html`);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
