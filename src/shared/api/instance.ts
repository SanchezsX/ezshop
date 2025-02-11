import axios from "axios";
import { AUTHORIZATION_DATA } from "../constants/typeAuthorizationData";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_SERVER_URL}:${import.meta.env.VITE_APP_SERVER_PORT}`,
  headers: {
    "authorization-data": AUTHORIZATION_DATA as string,
  },
});
