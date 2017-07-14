const WebSocket = require('ws');

const params = require('./param.js');
const midi = require('./midi.js');

function initWebSockerServer () {
  const wss = new WebSocket.Server({ port: 8080 });
  const output = midi.initMidi();

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
      // midi.sendParam(output, 'OP_1_OSC_FREQ_COARSE', 6);
    });

    const welcomeMessage = JSON.stringify({
      params: params.PARAMS
    });

    ws.send(welcomeMessage);
  });

  console.log('WS listening @ :8080...');
}

module.exports = initWebSockerServer;
