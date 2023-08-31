export function rgb2hex(rgb) {
  return '#' + rgb.map(x => x.toString(16).padStart(2, '0')).join('');
}

export function rgb2rgba(rgb, alpha) {
  return `rgba(${rgb.join(',')},${alpha})`;
}
