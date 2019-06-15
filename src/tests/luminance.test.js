import { relativeLuminance, partialLuminance } from "../luminance";

describe('partialLuminance: Irregular inputs', () => {
  it('should return an error if input is not an array', () => {
    //If function is called immediately , it will throw the exception before the assertion
    expect(() => { partialLuminance(0) }).toThrow("Input is not valid");
  });
  it('should return an error is input is an empty array', () => {
    expect(() => { partialLuminance([]) }).toThrow("Input is not valid");
  });
  it('should return an error is input is an invalid color', () => {
    expect(() => { partialLuminance([-1, 0, 0]) }).toThrow("Input is not a valid color");
    expect(() => { partialLuminance([0, 0, -1]) }).toThrow("Input is not a valid color");
    expect(() => { partialLuminance([256, 0, 0]) }).toThrow("Input is not a valid color");
    expect(() => { partialLuminance([0, 0, 256]) }).toThrow("Input is not a valid color");
  });
});

describe('partialLuminance: Output format', () => {
  expect(partialLuminance([0, 0, 0])).toHaveLength(3);
});

describe('partialLuminance: Calculation', () => {
  it('should divide colorSRGB by 12.92 if it is <= 0.03928', () => {
    expect(partialLuminance([0, 0, 0])).toEqual([0, 0, 0]);
  });
  it('should not divide colorSRGB by 12.92 if it is > 0.03928', () => {
    const result = (((100 / 255) + 0.055) / 1.055) ** 2.4
    expect(partialLuminance([100, 100, 100])).toEqual([result, result, result]);
  });
  it('should go through both if and else statement for a varied array', () => {
    const result = (((255 / 255) + 0.055) / 1.055) ** 2.4
    expect(partialLuminance([255, 0, 255])).toEqual([result, 0, result]);
  });
});

describe('relativeLuminance: Irregular inputs', () => {
  it('should return an error if input is not an array', () => {
    expect(() => { relativeLuminance(0) }).toThrow();
  });
  it('should return an error is input is an empty array', () => {
    expect(() => { relativeLuminance([]) }).toThrow();
  });
  it('should return an error is input array has an invalid value', () => {
    expect(() => { relativeLuminance([2, 0, 0]) }).toThrow();
    expect(() => { relativeLuminance([-1, 0, 0]) }).toThrow();
    expect(() => { relativeLuminance([0, 0, 2]) }).toThrow();
    expect(() => { relativeLuminance([0, 0, -1]) }).toThrow();
  });
});

describe('relativeLuminance: Output format and calculation', () => {
  it('should return a number', () => {
    const result = 0.2126 * 0.5 + 0.7152 * 0.5 + 0.0722 * 0.5
    expect(relativeLuminance([0.5, 0.5, 0.5])).toBe(result);
  });
  it('should return an accurate result', () => {
    const result = 0.2126 * 0.8 + 0.7152 * 0.3 + 0.0722 * 0.9
    expect(relativeLuminance([0.8, 0.3, 0.9])).toBe(result);
  });

});

