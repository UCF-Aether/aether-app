import { decodeCayenne, Reading } from './cayenne';
import * as fs from 'fs';

function payloadFrom(filename: string) {
  return fs.readFileSync('./payloads/' + filename).toString('base64');
}

function decodeFrom(filename: string) {
  return decodeCayenne(Buffer.from(payloadFrom(filename), 'base64'));
}

describe('Cayenne packet decode', () => {
  test('empty packet', () => {
    const readings = decodeCayenne(Buffer.from('', 'base64'));

    expect(Array.isArray(readings)).toBeTruthy();
    expect(readings.length).toEqual(0);
  })

  // Single value
  // channel: 255
  // mapping: 0
  // value: 0 (2 bytes)
  // payload (hex): ff00 0000
  test('invalid channel', () => {
    expect(() => decodeFrom('invalid-channel'))
      .toThrowError(/Unknown channel/);
  })

  // Single value
  // channel: 0
  // mapping: 255
  // value: 0 (2 bytes)
  // payload (hex): 00ff 0000
  test('invalid mapping', () => {
    expect(() => decodeFrom('invalid-mapping'))
      .toThrowError(/Unknown mapping/);
  })

  // Single (missing) value
  // channel: 0
  // mapping: 0
  // value: (missing)
  // payload (hex): 0000 0182
  test('missing value', () => {
    expect(() => decodeFrom('missing-value'))
      .toThrowError(/Missing value for chan/);
  })

  // Single value
  // channel: 1
  // mapping: 4
  // value: 386 (2 bytes)
  // payload (hex): 0104 
  test('single value', () => {
    const readings = decodeFrom('single-value');

    expect(Array.isArray(readings)).toBeTruthy();
    expect(readings.length).toEqual(1);
    expect(readings[0].chan).toEqual('ZMOD4510');
    expect(readings[0].type).toEqual('FAST_AQI');
    expect(readings[0].value).toEqual(386);
  })

  // 10 values - tests each channel
  // payload (hex): 0104 
  // TODO: add mappings for pm sensor when driver is added
  test('10 values', () => {
    const expectedReadings: Array<Reading> = [
      {
        chan: 'BME688',
        type: 'TEMPERATURE',
        value: 82.4,
      },
      {
        chan: 'ZMOD4510',
        type: 'AQI',
        value: 423,
      },
      {
        chan: 'SPS30',
        type: 'TEMPERATURE',
        value: 72.9,
      },
      {
        chan: 'BME688',
        type: 'GAS_RES',
        value: 1069420.625,
      },
      {
        chan: 'ZMOD4510',
        type: 'AQI',
        value: 0,
      },
      {
        chan: 'SPS30',
        type: 'O3',
        value: 100.99,
      },
      {
        chan: 'BME688',
        type: 'REL_HUMIDITY',
        value: 23.85,
      },
      {
        chan: 'ZMOD4510',
        type: 'FAST_AQI',
        value: 42,
      },
      {
        chan: 'SPS30',
        type: 'PRESSURE',
        value: 77.7,
      },
      {
        chan: 'BME688',
        type: 'PRESSURE',
        value: 0.0,
      },
    ];

    const readings = decodeFrom('10-values');
    expect(readings.length).toEqual(expectedReadings.length);
    readings.forEach((r, i) => {
      const e = expectedReadings[i];

      expect(r.chan).toEqual(e.chan);
      expect(r.type).toEqual(e.type);
      expect(r.value).toBeCloseTo(e.value);
    });
  })
})
