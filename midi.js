const midi = require('midi');

const params = require('./param.js');

const STATUS_START_SYSEX = 0xF0;
const STATUS_END_SYSEX = 0xF7;
const STATUS_ID_YAMAHA = 0x43;
const STATUS_SUB_PARAM_CHANGE = 0x10;
const STATUS_SUB_VOICE_CHANGE = 0x00;
const STATUS_VOICE_FORMAT_1 = 0x00;
const STATUS_VOICE_CHANGE_1_MSB = 0x01;
const STATUS_VOICE_CHANGE_1_LSB = 0x1B;

const PARAM_CHANGE_HEADER = [
  STATUS_START_SYSEX,
  STATUS_ID_YAMAHA,
  STATUS_SUB_PARAM_CHANGE
];
const VOICE_CHANGE_HEADER = [
  STATUS_START_SYSEX,
  STATUS_ID_YAMAHA,
  STATUS_SUB_VOICE_CHANGE,
  STATUS_VOICE_FORMAT_1,
  STATUS_VOICE_CHANGE_1_MSB,
  STATUS_VOICE_CHANGE_1_LSB
];
const FOOTER = [
  STATUS_END_SYSEX
];

const MIDI_DEV_ID = 1; // TODO bad magic #

function createParamChangeMessage (parameter, value) {
  const param = params.toDxValue(parameter, value);
  console.log(param);
  const payload = PARAM_CHANGE_HEADER
    .concat(param)
    .concat(FOOTER);

  return payload;
}

function initMidi () {
  const output = new midi.output();

  console.log(`Using "${output.getPortName(MIDI_DEV_ID)}"`);
  output.openPort(MIDI_DEV_ID);

  return output;
}

function sendParam (output, param, value) {
  try {
    const message = createParamChangeMessage(param, value);
    // console.log(`Sending parameter: "${message}"`);
    output.sendMessage(message);
  } catch (e) {
    console.log('Bad param');
  }
}

module.exports = {
  initMidi,
  sendParam
};

// output.closePort();
