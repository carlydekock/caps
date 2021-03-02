'use strict';

//monitor the system for events
// on pickup event

const events = require('../events.js');

function pickedUp(payload) {
  setTimeout(() => {
    payload.event = 'pickup';
    payload.time = new Date().toISOString();
    console.log('EVENT ', payload);
    console.log(`DRIVER: picked up ${payload.payload.orderId}`);
    events.emit('in-transit', payload);
  }, 1000);
}

function deliveredOrder(payload) {
  setTimeout(() => {
    payload.event = 'in-transit';
    payload.time = new Date().toISOString();
    console.log('EVENT ', payload);
    console.log(`DRIVER: delivered up ${payload.payload.orderId}`);
    events.emit('delivered', payload);
  }, 2000);
}

module.exports = {
  pickedUp,
  deliveredOrder,
};


