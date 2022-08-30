import { AuthRepository } from "./authRepository";
import api from "../plugins/axios";
import { User } from "../models/user";

export class UserRepository {
  async getProfile(): Promise<User> {
    const { data } = await api.get<User>("/auth/profile/");

    return data;
  }
}
