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

const param = params.toDxValue('ALGORITHM', 2);
const buffer = new Buffer(HEADER.concat(param).concat(FOOTER));

console.log(buffer.toString('hex'));
