const WebSocket = require('ws');

const config = require('./config.js');
const params = require('./param.js');

const actions = {
  PARAM_CHANGE: 'PARAM_CHANGE',
  VOICE_CHANGE: 'VOICE_CHANGE'
};

function initWebSockerServer (midi) {
  const output = midi.initMidi();
  const wss = new WebSocket.Server({ port: config.WS_PORT });

  wss.on('connection', function connection (ws) {
    ws.on('message', function incoming (message) {
      console.log('received: %s', message);

      try {
        const data = JSON.parse(message);
        const { param, value } = data.data;

        switch (data.type) {
          case actions.PARAM_CHANGE:
            midi.sendParam(output, param, value);
            break;
          case actions.VOICE_CHANGE:
            midi.sendVoice(output);
            break;
          default:
            console.log(`Unknown cmd: ${data.type}`);
            break;
        }
      } catch (e) {
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
