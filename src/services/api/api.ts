import axios from "axios";

const client = axios.create({
  baseURL: process.env.RADIO_CLIENT_URL,
});

export { client };
