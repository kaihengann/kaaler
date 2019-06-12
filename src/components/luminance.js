export const partialLuminance = arr => {
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

export const relativeLuminance = arr => {
  return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
};
