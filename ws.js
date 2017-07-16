const WebSocket = require('ws');

const config = require('./config.js');
const params = require('./param.js');

function initWebSockerServer (output) {
  const wss = new WebSocket.Server({ port: config.WS_PORT });

  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);

      try {
        const data = JSON.parse(message)
        const { param, value } = data;
        midi.sendParam(output, param, value);
      } catch(e) {
        console.log('Bad parameter cmd');
      }
    });

    const welcomeMessage = JSON.stringify({
      params: params.PARAMS
    });

    ws.send(welcomeMessage);
  });

  console.log(`WS listening @ :${config.WS_PORT}...`);
}

module.exports = initWebSockerServer;
