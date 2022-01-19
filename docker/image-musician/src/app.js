const protocol = require('./protocol');
const dgram = require('dgram');
const { randomUUID } = require('crypto');

const socket = dgram.createSocket('udp4');
const uuid = randomUUID();
const INTERVAL = 1000;

let message;
const instrumentName = process.argv[2];

if (!protocol.INSTRUMENTS.hasOwnProperty(instrumentName)) {
  console.log(`Invalid instrument "${instrumentName}"`);
  return;
}

const instrument = protocol.INSTRUMENTS[instrumentName];

function update() {
  const payloadData = {
    uuid,
    instrument,
  };
  const payload = JSON.stringify(payloadData);

  message = Buffer.from(payload);
  socket.send(message, 0, message.length, protocol.PORT, protocol.HOST, (err, bytes) => {
    console.log('Sending payload: ' + payload + ' via port ' + socket.address().port);
  });
}

setInterval(update, INTERVAL);
