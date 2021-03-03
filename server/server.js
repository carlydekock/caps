'use strict';

const socketio = require('socket.io');

//open up server for connections
const io = socketio(3000);

//namespaces
const caps = io.of('/caps');

io.on('connection', (socket) => {

  console.log('new connection created: ' + socket.id);

});


caps.on('connection', (capsSocket) => {

  console.log('new cap connection', capsSocket.id);

  capsSocket.on('pickup', (payload) => {
    console.log('EVENT: ', payload);

    capsSocket.broadcast.emit('pickup', payload);
  });

  capsSocket.on('in-transit', (payload) => {
    console.log('EVENT: ', payload);

    capsSocket.broadcast.emit('in-transit', payload);
  });

  capsSocket.on('delivered', (payload) => {
    console.log('EVENT: ', payload);

    capsSocket.broadcast.emit('delivered', payload);
  });

});

