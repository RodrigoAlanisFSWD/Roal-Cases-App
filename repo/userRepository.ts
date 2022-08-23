import { AuthRepository } from "./authRepository";
import api from "../plugins/axios";
import { User } from "../models/user";

export class UserRepository {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async getProfile() {
    console.log(this.authRepository.getTokens());
    const { data } = await api.get<User>("/auth/profile", {
      headers: {
        Authorization: `Bearer ${this.authRepository.getTokens().access_token}`,
      },
    });

    return data;
  }
}
