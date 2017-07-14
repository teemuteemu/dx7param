const midi = require('midi');

const params = require('./param.js');

const STATUS_START_SYSEX = 0xF0;
const STATUS_END_SYSEX = 0xF7;
const STATUS_ID_YAMAHA = 0x43;
const STATUS_SUB_CH = 0x10;

const HEADER = [
  STATUS_START_SYSEX,
  STATUS_ID_YAMAHA,
  STATUS_SUB_CH
];

const FOOTER = [
  STATUS_END_SYSEX
];

const MIDI_DEV_ID = 1; // TODO bad magic #

function createMessage (parameter, value) {
  const param = params.toDxValue(parameter, value);
  const payload = HEADER
    .concat(param)
    .concat(FOOTER);
  /*
  const buffer = new Buffer(HEADER.concat(param).concat(FOOTER));

  return buffer.toString('hex');
  */

  return payload;
}

const output = new midi.output();

const message = createMessage('OP_1_OSC_FREQ_COARSE', 3);
console.log(message);

console.log(`Using "${output.getPortName(MIDI_DEV_ID)}"`);
output.openPort(MIDI_DEV_ID);

output.sendMessage(message);
// console.log(message);

output.closePort();
