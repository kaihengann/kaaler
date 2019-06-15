import { rgbToHex } from "../rgbToHex"

// Assuming all inputs are arrays
describe('Irregular inputs', () => {
  it('should return an error if input is not an array', () => {
    //If function is called immediately , it will throw the exception before the assertion
    expect(() => { rgbToHex(0) }).toThrow("Input is not valid");
  });
  it('should return an error is input is an empty array', () => {
    expect(() => { rgbToHex([]) }).toThrow("Input is not valid");
  });
  it('should return an error is input is an invalid color', () => {
    expect(() => { rgbToHex([-1, 0, 0]) }).toThrow("Input is not a valid color");
    expect(() => { rgbToHex([0, 0, -1]) }).toThrow("Input is not a valid color");
    expect(() => { rgbToHex([256, 0, 0]) }).toThrow("Input is not a valid color");
    expect(() => { rgbToHex([0, 0, 256]) }).toThrow("Input is not a valid color");
  });
});

describe('Output format', () => {
  it('should return a string', () => {
    expect(typeof rgbToHex([1,1,1])).toEqual('string');
  });
  it('should return a string of length 6', () => {
    expect(rgbToHex([1,1,1]).length).toEqual(7);
    expect(rgbToHex([20,50,150]).length).toEqual(7);
  });
  it('should return a string with # as first char', () => {
    expect(rgbToHex([1,1,1])[0]).toEqual('#');
    expect(rgbToHex([20,50,150])[0]).toEqual('#');
  });
});

describe('Conversion validity', () => {
  it('should return the correct hex code', () => {
    expect(rgbToHex([0, 0, 0])).toEqual('#000000');
    expect(rgbToHex([255, 255, 255])).toEqual('#ffffff');
    expect(rgbToHex([128, 128, 128])).toEqual('#808080');
    expect(rgbToHex([0, 255, 255])).toEqual('#00ffff');
  });
});
