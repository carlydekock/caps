'use strict';

//declare store name
//every 5 seconds, simulate a new customer order - create fake order, emit a 'pickup' event and attach the fake order as payload
//monitor the system for events - whenever delivered, log thank you to the console
require('dotenv').config({ path: '../.env' });
const events = require('../events.js');
const storeName = process.env.STORE_NAME;
const faker = require('faker');
// console.log(storeName);
// const address = `${faker.address.city()}, ${faker.address.stateAbbr()}`;
// const customer = faker.name.findName();
// const orderId = faker.random.uuid();

class Vendor {
  constructor(){
    this.db = [];
  }

  create() {
    let orderEntry = {
      store: storeName,
      orderId: faker.random.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    };

    this.db.push(orderEntry);
    // console.log('this is order entry', orderEntry);
    // console.log('this is db', this.db);
    return orderEntry;
  }
}

function thankYou(payload) {
  payload.event = 'delivered';
  console.log(`VENDOR: Thank you for delivering ${payload.payload.orderId}`);
  console.log('EVENT ', payload);
}


module.exports = {
  Vendor,
  thankYou,
};

