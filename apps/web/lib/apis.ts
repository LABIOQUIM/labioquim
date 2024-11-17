import axios from "axios";

export const api = axios.create({
  baseURL: "http://visualdynamics:3000/v1",
});
