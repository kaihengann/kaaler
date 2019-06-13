export const rgbToHex = rgb => {
  return (
    "#" +
    ("0" + parseInt(rgb[0]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[1]).toString(16)).slice(-2) +
    ("0" + parseInt(rgb[2]).toString(16)).slice(-2)
  );
};

export const processRgb = rgb => {
  if (rgb.includes("a")) {
    const arr = rgb.slice(5, -1).split(", ");
    arr.pop();
    return arr;
  }
  return rgb.slice(4, -1).split(", ");
};

export const processRgbArr = rgb => rgb.join(", ");
