export const rgbToHex = rgb => {
  if (!Array.isArray(rgb) || rgb.length === 0)
    throw new Error("Input is not valid");

  rgb.forEach(value => {
    if (value < 0 || value > 255) throw new Error("Input is not a valid color");
  });

  return (
    "#" +
    ("0" + parseInt(rgb[0]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2]).toString(16)).slice(-2)
  );
};
