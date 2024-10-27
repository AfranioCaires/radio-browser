import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_RADIO_CLIENT_URL,
});

export { client };
