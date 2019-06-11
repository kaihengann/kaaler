const partialLuminance = arr => {
  const newArr = arr.map(value => {
    const colorSRGB = value / 255;
    if (colorSRGB <= 0.03928) {
      return colorSRGB / 12.92;
    } else {
      return ((colorSRGB + 0.055) / 1.055) ** 2.4;
    }
  });
  return newArr;
};
const result = partialLuminance([1, 1, 1])