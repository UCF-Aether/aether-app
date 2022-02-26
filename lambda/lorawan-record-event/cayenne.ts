export interface Reading {
  chan: string;
  type: string;
  value: number;
}

const decodeInt = (buf: Buffer) => buf.readUInt16BE();
const decodeFloat = (buf: Buffer) => buf.readFloatBE();

const cayenneChannels = {
  0: 'BME688',
  1: 'ZMOD4510',
  2: 'SPS30'
};

const cayenneDataMappings = {
  0: {
    name: 'TEMPERATURE',
    bytes: 4,
    decode: decodeFloat
  },
  1: {
    name: 'PRESSURE',
    bytes: 4,
    decode: decodeFloat,
  },
  2: {
    name: 'REL_HUMIDITY',
    bytes: 4,
    decode: decodeFloat,
  },
  3: {
    name: 'GAS_RES',
    bytes: 4,
    decode: decodeFloat,
  },
  4: {
    name: 'FAST_AQI',
    bytes: 2,
    decode: decodeInt,
  },
  5: {
    name: 'AQI',
    bytes: 2,
    decode: decodeInt,
  },
  6: {
    name: 'O3',
    bytes: 4,
    decode: decodeFloat,
  },
};

// Should already be base64 decoded
export function decodeCayenne(payloadBuf: Buffer): Array<Reading> {
  const readings: Array<Reading> = [];
  let chan: string;
  let payloadSize = payloadBuf.byteLength;
  let curByte = 0;

  console.log(`Got cayenna packet: 0x${payloadBuf.toString('hex')}`);

  while (curByte < payloadSize) {
    chan = cayenneChannels[payloadBuf[curByte]];
    if (!chan) throw new Error(`Unknown channel: ${payloadBuf[curByte]}`);
    curByte++;

    let mapping = cayenneDataMappings[payloadBuf[curByte]];
    if (!mapping) throw new Error(`Unknown mapping: ${payloadBuf[curByte]}`)
    let { name, bytes, decode } = mapping;
    curByte++;
    
    let value: number = decode(payloadBuf.slice(curByte));
     
    readings.push({ chan, value, type: name });
    curByte += bytes;

    console.log(`decoded chan=${chan}, type=${name}, value=${value}`);
  }

  return readings;
}


// test
// TODO: remove me
// const buf = Buffer.from('AABD0lhSAQUA8g==', 'base64');
// console.log(decodeCayenne(buf));
