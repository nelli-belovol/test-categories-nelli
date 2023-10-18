export function getBgColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness < 128) {
    return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
  }

  return `rgb(${r}, ${g}, ${b})`;
}
