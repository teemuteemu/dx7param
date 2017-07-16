/* eslint-disable key-spacing */

// param = [ group, #, range ]

const OP_PARAMS_TMPL = {
  EG_RATE_1:  [ 0, 0, [0, 99] ],
  EG_RATE_2:  [ 0, 1, [0, 99] ],
  EG_RATE_3:  [ 0, 2, [0, 99] ],
  EG_RATE_4:  [ 0, 3, [0, 99] ],
  EG_LEVEL_1: [ 0, 4, [0, 99] ],
  EG_LEVEL_2: [ 0, 5, [0, 99] ],
  EG_LEVEL_3: [ 0, 6, [0, 99] ],
  EG_LEVEL_4: [ 0, 7, [0, 99] ],
  KBD_LEV_SCL_BRK_PT:     [ 0, 8, [0, 99] ],
  KBD_LEFT_DEPTH:         [ 0, 9, [0, 99] ],
  KBD_RIGHT_DEPTH:        [ 0, 10, [0, 99] ],
  KBD_LEFT_CURVE:         [ 0, 11, [0, 3] ],
  KBD_RIGHT_CURVE:        [ 0, 12, [0, 3] ],
  KBD_RATE_SCALING:       [ 0, 13, [0, 7] ],
  AMP_MOD_SENSITIVITY:    [ 0, 14, [0, 3] ],
  KEY_VEL_SENSITIVITY:    [ 0, 15, [0, 7] ],
  OPERATOR_OUTPUT_LEVEL:  [ 0, 16, [0, 99] ],
  OSC_MODE:               [ 0, 17, [0, 1] ],
  OSC_FREQ_COARSE:        [ 0, 18, [0, 31] ],
  OSC_FREQ_FINE:          [ 0, 19, [0, 99] ],
  OSC_DETUNE:             [ 0, 20, [0, 14] ]
};

const OPERATORS = Array(6)
  .fill()
  .map((v, i) => i + 1);

const OP_PARAMS = OPERATORS
  .map((_op) => {
    const op = (OPERATORS.length - _op) + 1;
    const params = Object.keys(OP_PARAMS_TMPL)
      .reduce((prev, curr) => {
        const key = `OP_${op}_${curr}`;
        const params = OP_PARAMS_TMPL[curr].slice();

        if (_op >= 2) {
          const oo = _op - 1;
          const add = oo * 20;
          params[1] = params[1] + add + oo;
        }

        prev[key] = params;
        return prev;
      }, {});

    return params;
  })
  .reduce((prev, curr) => Object.assign(prev, curr), {});

const VOICE_PARAMS = {
  PITCH_EG_RATE_1:  [ 0, 126, [0, 99] ],
  PITCH_EG_RATE_2:  [ 0, 127, [0, 99] ],
  PITCH_EG_RATE_3:  [ 1, 0, [0, 99] ],
  PITCH_EG_RATE_4:  [ 1, 1, [0, 99] ],
  PITCH_EG_LEVEL_1: [ 1, 2, [0, 99] ],
  PITCH_EG_LEVEL_2: [ 1, 3, [0, 99] ],
  PITCH_EG_LEVEL_3: [ 1, 4, [0, 99] ],
  PITCH_EG_LEVEL_4: [ 1, 5, [0, 99] ],
  ALGORITHM:              [ 1, 6, [0, 31] ],
  FEEDBACK:               [ 1, 7, [0, 7] ],
  OSCILLATOR_SYNC:        [ 1, 8, [0, 1] ],
  LFO_SPEED:              [ 1, 9, [0, 99] ],
  LFO_DELAY:              [ 1, 10, [0, 99] ],
  LFO_PITCH_MOD_DEPTH:    [ 1, 11, [0, 99] ],
  LFO_AMP_MOD_DEPTH:      [ 1, 12, [0, 99] ],
  LFO_SYNC:               [ 1, 13, [0, 1] ],
  LFO_WAVEFORM:           [ 1, 14, [0, 5] ],
  PITCH_MOD_SENSITIVITY:  [ 1, 15, [0, 7] ],
  TRANSPOSE:              [ 1, 16, [0, 48] ],
  VOICE_NAME_CHAR_1:  [ 1, 17, [0, 99] ],
  VOICE_NAME_CHAR_2:  [ 1, 18, [0, 99] ],
  VOICE_NAME_CHAR_3:  [ 1, 19, [0, 99] ],
  VOICE_NAME_CHAR_4:  [ 1, 20, [0, 99] ],
  VOICE_NAME_CHAR_5:  [ 1, 21, [0, 99] ],
  VOICE_NAME_CHAR_6:  [ 1, 22, [0, 99] ],
  VOICE_NAME_CHAR_7:  [ 1, 23, [0, 99] ],
  VOICE_NAME_CHAR_8:  [ 1, 24, [0, 99] ],
  VOICE_NAME_CHAR_9:  [ 1, 25, [0, 99] ],
  VOICE_NAME_CHAR_10: [ 1, 26, [0, 99] ]
};
const PARAM_OP_ON_OFF = {
  OP_ON_OFF:    [ 1, 27, [0, 99] ]
};

const FUNCTION_PARAMS = {
  MONO_POLY_MODE: [ 2, 64, [0, 1] ], // O=POLY
  PITCH_BEND_RANGE: [ 2, 65, [0, 12] ],
  PITCH_BEND_STEP: [ 2, 66, [0, 12] ],
  PORTAMENTO_MODE: [ 2, 67, [0, 1] ],
  PORTAMENTO_GLISS: [ 2, 68, [0, 1] ],
  PORTAMENTO_TIME: [ 2, 69, [0, 99] ],
  MOD_WHEEL_RANGE: [ 2, 70, [0, 99] ],
  MOD_WHEEL_ASSIGN: [ 2, 71, [0, 7] ],
  FOOT_CONTROL_RANGE: [ 2, 72, [0, 99] ],
  FOOT_CONTROL_ASSIGN: [ 2, 73, [0, 7] ],
  BREATH_CONT_RANGE: [ 2, 74, [0, 99] ],
  BREATH_CONT_ASSIGN: [ 2, 75, [0, 7] ],
  AFTERTOUCH_RANGE: [ 2, 76, [0, 99] ],
  AFTERTOUCH_ASSIGN: [ 2, 77, [0, 7] ]
};

const PARAMS = Object.assign({},
  OP_PARAMS,
  Object.assign({}, VOICE_PARAMS, PARAM_OP_ON_OFF),
  FUNCTION_PARAMS
);

function toDxValue (paramKey, value) {
  const paramArray = PARAMS[paramKey].slice();

  paramArray[2] = (value >= paramArray[2][0] && value <= paramArray[2][1])
    ? value
    : false;

  return paramArray;
}

function randomVoice () {
  const voiceParams = Object.assign({}, OP_PARAMS, VOICE_PARAMS);
  return Object.keys(voiceParams)
    .map(par => {
      const param = voiceParams[par].slice();
      const value = Math.floor(Math.random() * param[2][1]);

      return value;
    });
}

function calculateChecksum (values) {
  const sum = values.reduce((p, c) => p + c);
  const checksum = (~sum + 1) & 0x7F;

  return checksum;
}

module.exports = {
  PARAMS,
  toDxValue,
  randomVoice,
  calculateChecksum
};

/**
 * Parameter
 *
 Number    Parameter                  Value Range
---------  ---------                  -----------
  0        OP6 EG rate 1              0-99
  1         "  "  rate 2               "
  2         "  "  rate 3               "
  3         "  "  rate 4               "
  4         "  " level 1               "
  5         "  " level 2               "
  6         "  " level 3               "
  7         "  " level 4               "
  8        OP6 KBD LEV SCL BRK PT      "        C3= $27
  9         "   "   "   "  LFT DEPTH   "
 10         "   "   "   "  RHT DEPTH   "
 11         "   "   "   "  LFT CURVE  0-3       0=-LIN, -EXP, +EXP, +LIN
 12         "   "   "   "  RHT CURVE   "            "    "    "    "
 13        OP6 KBD RATE SCALING       0-7
 14        OP6 AMP MOD SENSITIVITY    0-3
 15        OP6 KEY VEL SENSITIVITY    0-7
 16        OP6 OPERATOR OUTPUT LEVEL  0-99
 17        OP6 OSC MODE (fixed/ratio) 0-1        0=ratio
 18        OP6 OSC FREQ COARSE        0-31
 19        OP6 OSC FREQ FINE          0-99
 20        OP6 OSC DETUNE             0-14       0: det=-7
 21 \
  |  > repeat above for OSC 5, OSC 4,  ... OSC 1
125 /
126        PITCH EG RATE 1            0-99
127          "    " RATE 2              "
128          "    " RATE 3              "
129          "    " RATE 4              "
130          "    " LEVEL 1             "
131          "    " LEVEL 2             "
132          "    " LEVEL 3             "
133          "    " LEVEL 4             "
134        ALGORITHM #                 0-31
135        FEEDBACK                    0-7
136        OSCILLATOR SYNC             0-1
137        LFO SPEED                   0-99
138         "  DELAY                    "
139         "  PITCH MOD DEPTH          "
140         "  AMP   MOD DEPTH          "
141        LFO SYNC                    0-1
142         "  WAVEFORM                0-5, (data sheet claims 9-4 ?!?)
                                       0:TR, 1:SD, 2:SU, 3:SQ, 4:SI, 5:SH
143        PITCH MOD SENSITIVITY       0-7
144        TRANSPOSE                   0-48   12 = C2
145        VOICE NAME CHAR 1           ASCII
146        VOICE NAME CHAR 2           ASCII
147        VOICE NAME CHAR 3           ASCII
148        VOICE NAME CHAR 4           ASCII
149        VOICE NAME CHAR 5           ASCII
150        VOICE NAME CHAR 6           ASCII
151        VOICE NAME CHAR 7           ASCII
152        VOICE NAME CHAR 8           ASCII
153        VOICE NAME CHAR 9           ASCII
154        VOICE NAME CHAR 10          ASCII
155        OPERATOR ON/OFF
              bit6 = 0 / bit 5: OP1 / ... / bit 0: OP6

Note that there are actually 156 parameters listed here, one more than in
a single voice dump. The OPERATOR ON/OFF parameter is not stored with the
voice, and is only transmitted or received while editing a voice. So it
only shows up in parameter change SYS-EX's.

 *
 */
