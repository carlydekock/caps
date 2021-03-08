'use strict';

require('dotenv').config();
const store = 'acme-widgets';
const faker = require('faker');
const io = require('socket.io-client');

const capsURL = 'http://localhost:3000/caps';

const capsServer = io.connect(capsURL);


setInterval(() => {
  let order = {
    store: store,
    orderId: faker.random.uuid(),
    name: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  capsServer.emit('pickup', {
    event: 'pickup', 
    time: new Date().toISOString(),
    vendorId: store,
    messageId: faker.random.uuid(),
    order: order,
  });

}, 5000);


// capsServer.on('delivered', (payload) => {
  
//   console.log(`VENDOR: Thank you for delivering ${payload.order.orderId}`);
// });

capsServer.on('delivered', (payload) => {
  if(payload.vendorId === store){
    console.log(`Widgets were delivered ${payload.order.orderId}`);
    capsServer.emit('received', payload);
  }
});
