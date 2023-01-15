import jwt from "jwt-decode";
export function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export function validateOtp(otp) {
  return Boolean(otp?.match(/^\d{6}$/));
}

export const getJwtDecodedToken = (token) => {
  return jwt(token);
};

export function setUserId(userId) {
  localStorage.setItem("userId", userId);
}

export function getUserId() {
  return localStorage.getItem("userId");
}
