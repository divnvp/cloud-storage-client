export function getItem(from) {
  return JSON.parse(localStorage.getItem(from));
}

export function setItem(to, value) {
  localStorage.setItem(to, JSON.stringify(value));
}

export function removeItem(from) {
  localStorage.removeItem(from);
}
