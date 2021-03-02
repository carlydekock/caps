'use strict';

//global event pool (shared by all modules)


const Events = require('events');
const eventEmitter = new Events();


module.exports = eventEmitter;
