'use strict';

const io = require('socket.io-client');
// const hostURL = 'http://localhost:3000';
const capsURL = 'http://localhost:3000/caps';

const capsServer = io.connect(capsURL);


capsServer.on('pickup', (payload) => {
  setTimeout(() => {
    console.log(`pickup ${payload.order.orderId}`);

    payload.event = 'in-transit';
    payload.time = new Date().toISOString();
    capsServer.emit('in-transit', payload);
  }, 1500);

  setTimeout(() => {
    console.log(`delivered ${payload.order.orderId}`);

    payload.event = 'delivered';
    payload.time = new Date().toISOString();
    capsServer.emit('delivered', payload);
  }, 1500);
});

