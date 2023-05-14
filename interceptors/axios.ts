import axios from "axios";
import { refreshToken, setTokens } from "../services/authService";

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
});

export default api;
