import axios from "axios";
import { refreshToken, setTokens } from "../services/authService";

const api = axios.create({
  baseURL: "https://roal-cases-server.onrender.com/api",
});

export default api;
