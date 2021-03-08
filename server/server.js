'use strict';

const socketio = require('socket.io');

//open up server for connections
const io = socketio(3000);

//namespaces
const caps = io.of('/caps');

// order queue
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

    // orderQueue.pickup[payload.order.orderId] = payload;
    orderQueue.pickup[payload.messageId] = payload;

    // console.log('this is order queue', orderQueue);

    capsSocket.broadcast.emit('pickup', payload);
  });

  capsSocket.on('in-transit', (payload) => {
    console.log('EVENT: ', payload);

    delete orderQueue.pickup[payload.messageId];
    orderQueue.intransit[payload.messageId] = payload;
    // delete orderQueue.pickup[payload.order.orderId];
    // orderQueue.intransit[payload.order.orderId] = payload;

    capsSocket.broadcast.emit('in-transit', payload);
  });

  capsSocket.on('delivered', (payload) => {
    console.log('EVENT: ', payload);

    delete orderQueue.intransit[payload.messageId];
    orderQueue.delivered[payload.messageId] = payload;
    // delete orderQueue.intransit[payload.order.orderId];
    // orderQueue.delivered[payload.order.orderId] = payload;

    capsSocket.broadcast.emit('delivered', payload);
    caps.emit('delivered', { mesageId: payload.messageId, payload: payload });
  });

  capsSocket.on('getAll', () => {
    for (let key in orderQueue.pickup){
    
      capsSocket.emit('pickup', orderQueue.pickup[key]);
    }
    for (let key in orderQueue.intransit) {

      capsSocket.emit('intransit', orderQueue.intransit[key]);
    }
    for (let key in orderQueue.delivered) {

      capsSocket.emit('delivered', orderQueue.delivered[key]);
    }
  });

  capsSocket.on('received', payload => {
    // console.log('received message');

    capsSocket.broadcast.emit('received', payload);
  });
});
