import ApiClient from "./axios";

export interface LoginData {
  username: string;
  password: string;
}
class AuthClient extends ApiClient {
  constructor() {
    super("/auth");
  }

  async login(data: LoginData) {
    try {
      return (await this.api.post("/login", data)).data;
    } catch (error: any) {
      throw new Error(`Đăng nhập thất bại: ${error.response.data.message}`);
    }
  }
}

export default new AuthClient();
