const midi = require('./midi.js');
const initWebSockerServer = require('./ws.js');

function init () {
  try {
    const output = midi.initMidi();

    initWebSockerServer(output);
  } catch (e) {
    console.log(e);
  }
}

init();
