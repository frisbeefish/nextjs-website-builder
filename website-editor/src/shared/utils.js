export function chakraColorIsDark(color) {
  if (!color || color.indexOf("white") >= 0) {
    return false;
  }
  const [colorName, colorVariant] = color.split(".");

  const isDark =
    (colorName === "red" && colorVariant >= 300) ||
    (colorName === "gray" && colorVariant >= 400) ||
    (colorName === "green" && colorVariant >= 400) ||
    (colorName === "blue" && colorVariant >= 300) ||
    (colorName === "yellow" && colorVariant >= 400) ||
    (colorName === "orange" && colorVariant >= 300) ||
    (colorName === "purple" && colorVariant >= 300) ||
    (colorName === "pink" && colorVariant >= 300);

  return isDark;
}
