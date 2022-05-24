import moment from "moment";

// auth
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

// key

export function addNewKey(keyName) {
  let keys = getAllKeys();
  keys.push({
    id: generateKeyId(),
    keyName,
    lmd: moment(new Date()).format("MMM Do, YYYY"),
    secret: false,
  });
  localStorage.setItem("secret-keys", JSON.stringify(keys));
}

export function getAllKeys() {
  if (localStorage.getItem("secret-keys") == null) {
    localStorage.setItem("secret-keys", JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem("secret-keys"));
}

export function deleteKey(keyId) {
  let keys = getAllKeys();
  keys = keys.filter((key) => key.id !== keyId);
  localStorage.setItem("secret-keys", JSON.stringify(keys));
}

export function generateKeyId() {
  if (localStorage.getItem("lastKeyId") == null)
    localStorage.setItem("lastKeyId", "1729");
  var id = parseInt(localStorage.getItem("lastKeyId"));
  localStorage.setItem("lastKeyId", (++id).toString());
  return id;
}

export function getKeyById(keyId) {
  let keys = getAllKeys();
  return keys.filter((key) => key.id === keyId)[0];
}

export function setKeyAsSecret(keyId) {
  const keys = getAllKeys().map((key) => {
    if (key.id === keyId) {
      return { ...key, secret: true };
    } else {
      return key;
    }
  });
  localStorage.setItem("secret-keys", JSON.stringify(keys));
}

// value

export function addValue(selectedKeyId, value) {
  let values = getValuesForKey(selectedKeyId);
  values.push({
    id: generateValueId(),
    value,
    lmd: moment(new Date()).format("DD/MM/YYYY hh:mm a"),
  });
  localStorage.setItem(selectedKeyId, JSON.stringify(values));
}

export function deleteValue(selectedKeyId, valueId) {
  let values = getValuesForKey(selectedKeyId);
  values = values.filter((val) => val.id !== valueId);
  localStorage.setItem(selectedKeyId, JSON.stringify(values));
}

export function getValuesForKey(selectedKeyId) {
  if (localStorage.getItem(selectedKeyId) == null) {
    localStorage.setItem(selectedKeyId, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(selectedKeyId));
}

export function generateValueId() {
  if (localStorage.getItem("lastValueId") == null)
    localStorage.setItem("lastValueId", "1729");
  var id = parseInt(localStorage.getItem("lastValueId"));
  localStorage.setItem("lastValueId", (++id).toString());
  return id;
}

//user

export function getUserId() {
  return localStorage.getItem("userId");
}

export function setUserId(userId) {
  return localStorage.setItem("userId", userId);
}

//ip

export function getAuthIp() {
  return localStorage.getItem("session-ip");
}

export function setAuthIp(ip) {
  return localStorage.setItem("session-ip", ip);
}

// Validation
export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function validateOtp(otp) {
  return otp && otp.match(/^\d{6}$/);
}

// Utilities
