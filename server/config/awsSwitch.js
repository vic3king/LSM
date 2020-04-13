/* eslint-disable no-console */
// using Es5 here so I can run this from the terminal
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

thingShadows.on('status', (thingName, stat, clientToken, stateObject) => {
  console.log(JSON.stringify(stateObject.state));
});

export default { thingShadows };
