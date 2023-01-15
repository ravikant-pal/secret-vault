export function getAuthIp() {
  return localStorage.getItem("session-ip");
}

export function setAuthIp(ip) {
  return localStorage.setItem("session-ip", ip);
}

export function toggleShowSecret() {
  return localStorage.setItem(
    "show-secret",
    !localStorage.getItem("show-secret")
  );
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
