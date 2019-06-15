export const partialLuminance = arr => {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("Input is not valid");

  const newArr = arr.map(value => {
    if (value < 0 || value > 255) throw new Error("Input is not a valid color");

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
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("Input is not valid");

  arr.forEach(value => {
    if (value >= 1 || value < 0) throw new Error("Input is not valid");
  });

  return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
};
