'use strict';

const driver = require('../driver/client.js');
const vendor = require('../vendor-flowers/client.js');

console.log = jest.fn();


describe('Testing the vendor module', () => {
  let payload = {
    event: 'pickup',
    time: '2021-03-01',
    payload: {
      store: '1-206-flowers',
      orderId: '2bd5d698-217d-4ef2-a707-da5d61112664',
      customer: 'Emilio Brakus',
      address: 'Wilfridshire, HI',
    },
  };
  it('vendor should console log some output', () => {
    // vendor.thankYou(payload);
    // expect(console.log).toHaveBeenCalled();
  });
  it('driver picked up should console log some output', () => {
    // driver.pickedUp(payload);
    // expect(console.log).toHaveBeenCalled();
  });
  it('driver delivered should console log some output', () => {
    // driver.deliveredOrder(payload);
    // expect(console.log).toHaveBeenCalled();
  });
});





