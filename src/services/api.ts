import axios from "axios";

export const api = axios.create({
  baseURL: "https://682e16aa746f8ca4a47bd925.mockapi.io/api/v1",
});