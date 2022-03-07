export function addNewKey(key) {
  let keys = getAllKeys();
  keys.push(key);
  localStorage.setItem("secret-keys", JSON.stringify(keys));
}

export function getAllKeys() {
  if (localStorage.getItem("secret-keys") == null) {
    localStorage.setItem("secret-keys", JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem("secret-keys"));
}

export function addValue(key, value) {
  let values = getValuesForKey(key);
  values.push(value);
  localStorage.setItem(key, JSON.stringify(values));
}

export function getValuesForKey(key) {
  if (localStorage.getItem(key) == null) {
    localStorage.setItem(key, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(key));
}

export function addSecret(secret) {
  localStorage.setItem("secret", secret);
}

export function getSecret() {
  return localStorage.getItem("secret");
}

export function setAuthenticated(value) {
  localStorage.setItem("authenticated", value);
}

export function isAuthenticated() {
  return localStorage.getItem("authenticated");
}
