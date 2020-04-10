/* eslint-disable no-console */
/* eslint-disable func-names */
const awsIot = require('aws-iot-device-sdk');

const thingShadows = awsIot.thingShadow({
  keyPath: '../../Downloads/156026429a-private.pem.key',
  certPath: '../../Downloads/156026429a-certificate.pem.crt',
  caPath: '../../Downloads/AmazonRootCA1.pem',
  host: 'a1xfh88u91agm5-ats.iot.us-east-2.amazonaws.com',
  clientId: 'Meter1',
  region: 'us-east-2',
});

//
// Client token value returned from thingShadows.update() operation
//
let clientTokenUpdate;

thingShadows.on('connect', function() {
  //
  // After connecting to the AWS IoT platform, register interest in the
  // Thing Shadow named 'RGBLedLamp'.
  //
  thingShadows.register('RGBLedLamp', {}, function() {
    // Once registration is complete, update the Thing Shadow named
    // 'RGBLedLamp' with the latest device state and save the clientToken
    // so that we can correlate it with status or timeout events.
    //
    // Thing shadow state
    //
    const rgbLedLampState = {
      state: 'on',
    };

    clientTokenUpdate = thingShadows.update('RGBLedLamp', rgbLedLampState);
    //
    // The update method returns a clientToken; if non-null, this value will
    // be sent in a 'status' event when the operation completes, allowing you
    // to know whether or not the update was successful.  If the update method
    // returns null, it's because another operation is currently in progress and
    // you'll need to wait until it completes (or times out) before updating the
    // shadow.
    //
    console.log(clientTokenUpdate);
    if (clientTokenUpdate === null) {
      console.log('update shadow failed, operation still in progress');
    }
  });
});
