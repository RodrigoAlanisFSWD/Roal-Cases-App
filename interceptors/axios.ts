import axios from "axios";
import { refreshToken, setTokens } from "../services/authService";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default api;
