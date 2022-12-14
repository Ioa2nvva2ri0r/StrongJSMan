export function convertInString(...lines) {
  return lines.filter((el) => typeof el === 'string').join(' ');
}

export function capitalizedString(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function searchParam(path, parameter, initial) {
  const value = new URLSearchParams(decodeURI(path)).get(parameter);
  return value !== null ? value : initial;
}
