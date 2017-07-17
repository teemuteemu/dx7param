const midi = require('./midi.js');
const initWebSockerServer = require('./ws.js');

function init () {
  try {
    initWebSockerServer(midi);
  } catch (e) {
    console.log(e);
  }
}

init();
