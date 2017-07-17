const midi = require('midi');

const config = require('./config.js');
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

function createParamChangeMessage (parameter, value) {
  const param = params.toDxValue(parameter, value);
  const payload = PARAM_CHANGE_HEADER
    .concat(param)
    .concat(FOOTER);

  return payload;
}

function createRandomVoiceMessage (voice) {
  const checkSum = params.calculateChecksum(voice);
  const payload = VOICE_CHANGE_HEADER
    .concat(voice)
    .concat(checkSum)
    .concat(FOOTER);

  return payload;
}

function initMidi () {
  const output = new midi.output();
  const allOuputs = Array(output.getPortCount())
    .fill(0)
    .map((v, i) => output.getPortName(i));

  console.log('Available Midi devices:');
  allOuputs.forEach((v, i) => console.log(`- ${i}: ${v}`));

  console.log(`Using "${output.getPortName(config.MIDI_DEV_ID)}"`);
  output.openPort(config.MIDI_DEV_ID);

  return output;
}

function midiSend (output, message) {
  console.log(`Sending parameter: "${message}"`);
  output.sendMessage(message);
}

function sendParam (output, param, value) {
  try {
    const message = createParamChangeMessage(param, value);
    midiSend(output, message);
  } catch (e) {
    console.log('Bad param');
  }
}

function sendVoice (output) {
  try {
    const voice = params.randomVoice();
    const message = createRandomVoiceMessage(voice);
    midiSend(output, message);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  initMidi,
  sendParam,
  sendVoice
};

// output.closePort();
