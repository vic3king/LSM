/* eslint-disable no-console */

// using Es5 here so I can run this from my terminal
const dotenv = require('dotenv');
const awsIot = require('aws-iot-device-sdk');

dotenv.config();

const {
  AWS_KEY_PATH,
  AWS_CERT_PATH,
  AWS_CA_PATH,
  AWS_HOST,
  AWS_CLIENT_ID,
  AWS_REGION,
} = process.env;

const thingShadows = awsIot.thingShadow({
  keyPath: AWS_KEY_PATH,
  certPath: AWS_CERT_PATH,
  caPath: AWS_CA_PATH,
  host: AWS_HOST,
  clientId: AWS_CLIENT_ID,
  region: AWS_REGION,
});

// Client token value returned from thingShadows.update() operation when successful
let clientTokenUpdate;

thingShadows.on('connect', () => {
  //
  // After connecting to the AWS IoT platform, register interest in the
  // Thing Shadow named 'USER_METER'.
  //
  thingShadows.register('USER_METER', {}, () => {
    // Once registration is complete, update the Thing Shadow named
    // 'USER_METER' with the latest device state and save the clientToken
    // so that we can correlate it with status or timeout events.
    //
    // Thing shadow state
    //
    const userMeterState = {
      state: 'on',
    };

    clientTokenUpdate = thingShadows.update('USER_METER', userMeterState);
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
