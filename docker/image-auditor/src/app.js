const protocol = require('./protocol');
const dgram = require('dgram');
const net = require('net');

// Max interval for musicians to stay active
const INTERVAL = 5000;
const TCP_PORT = 2205;

const socket = dgram.createSocket('udp4');
const server = net.createServer();

const instruments = protocol.INSTRUMENTS;
const musicians = new Map();

socket.bind(protocol.PORT, () => {
  console.log('Joining multicast group');
  socket.addMembership(protocol.HOST);
});

function onMessage(msg, source) {
  const data = {
    ...JSON.parse(msg),
    lastActive: Date.now(),
  };
  data.instrument = Object.keys(instruments).find((k) => instruments[k] === data.instrument);

  musicians.set(data.uuid, data);

  console.log(musicians);

  console.log('Data has arrived: ' + msg + '. Source port: ' + source.port);
}

function onConnect(socket) {
  const now = Date.now();
  const message = musicians.entries().map((key, value) => {
    // TODO
  });
  socket.write(`${message}\n`);
  socket.end();
}

socket.on('message', onMessage);

server.listen(TCP_PORT);

server.on('connection', onConnect);
