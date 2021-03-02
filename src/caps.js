'use strict';

//main hub application
//manages the state of every package - ready for pickup, in transit, delivered, etc 
//logs every event to the console with a timestamp and the event payload


//creating new events module - every time new event emitted, clients can respond to new event emitter

const events = require('../events.js');
const vendor = require('./vendor.js');
const driver = require('./driver.js');
// console.log('this is time test', new Date().toISOString());

// console.log('this is vendor', new vendor.Vendor());

const orderInterface = new vendor.Vendor();

events.on('pickup', driver.pickedUp);
events.on('in-transit', driver.deliveredOrder);
events.on('delivered', vendor.thankYou);

setInterval(() => {
  events.emit('pickup', { event: 'pickup', time: `${new Date().toISOString()}`, payload: orderInterface.create()});
}, 5000);
