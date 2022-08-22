import axios from "axios";
import { AuthRepository } from "../repo/authRepository";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export default api;
