'use strict';

const socketio = require('socket.io');

//open up server for connections
const io = socketio(3000);

//namespaces
const caps = io.of('/caps');


//order queue
const orderQueue = {
  pickup: {},
  intransit: {},
  delivered: {},
};

io.on('connection', (socket) => {

  console.log('new connection created: ' + socket.id);

});

caps.on('connection', (capsSocket) => {

  console.log('new cap connection', capsSocket.id);

  capsSocket.on('pickup', (payload) => {
    console.log('EVENT: ', payload);
    // payload.payload.store === 1-206 {
    //   add to flowershop
    // } else {
    //   add to acme
    // }

    orderQueue.pickup[payload.order.orderId] = payload;
    console.log('this is order queue', orderQueue);

    capsSocket.broadcast.emit('pickup', payload);
  });

  capsSocket.on('in-transit', (payload) => {
    console.log('EVENT: ', payload);

    delete orderQueue.pickup[payload.order.orderId];
    orderQueue.intransit[payload.order.orderId] = payload;

    capsSocket.broadcast.emit('in-transit', payload);
  });

  capsSocket.on('delivered', (payload) => {
    console.log('EVENT: ', payload);

    delete orderQueue.intransit[payload.order.orderId];
    orderQueue.delivered[payload.order.orderId] = payload;

    capsSocket.broadcast.emit('delivered', payload);
  });

  capsSocket.on('getAll', () => {
    for (let key in orderQueue.pickup){
    
      capsSocket.emit('pickup', orderQueue.pickup[key]);
    }
  });
});
