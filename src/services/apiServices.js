import axios from "axios";
import { BASE_URL } from "../constants";

export const refreshToken = () => {
  return axios.get(`${BASE_URL}/users/refresh-token`, {
    withCredentials: true,
  });
};
