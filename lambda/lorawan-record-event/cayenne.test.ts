import { decodeCayenne } from './cayenne';
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
    expect(readings.length).toBe(0);
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
  // payload (hex): 0000
  test('missing value', () => {
    expect(() => decodeFrom('missing-value'))
      .toThrowError(/Missing value for chan/);
  })

  // test('single value', () => {
  //
  // })
  //
  // test('10 values', () => {
  //
  // })
  //
  // test('each channel', () => {
  //
  // })
})
