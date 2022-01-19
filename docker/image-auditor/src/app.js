const protocol = require('./protocol');
const dgram = require('dgram');

const socket = dgram.createSocket('udp4');

socket.bind(protocol.PORT, function () {
  console.log('Joining multicast group');
  socket.addMembership(protocol.HOST);
});

socket.on('message', function (msg, source) {
  console.log('Data has arrived: ' + msg + '. Source port: ' + source.port);
});
