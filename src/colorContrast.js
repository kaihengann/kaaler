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
    if (value > 1 || value < 0) throw new Error("Input is not valid");
  });

  return 0.2126 * arr[0] + 0.7152 * arr[1] + 0.0722 * arr[2];
};

export const contrastOnWhite = colorRgbString => {
  const colorArr = colorRgbString
    .split(", ")
    .map(colorString => Number(colorString));

  const lum = relativeLuminance(partialLuminance(colorArr));
  // Luminance of white is 1
  const contrastRatio = (1 + 0.05) / (lum + 0.05);
  return contrastRatio;
};

// Determine most contrasting text color against background
export const textColor = colorRgb => {
  // Input must be in form of "num, num, num"
  if (typeof colorRgb !== "string") throw new Error("Input must be a string");
  const contrast = contrastOnWhite(colorRgb);
  return { color: contrast > 3 ? "white" : "black" };
};
