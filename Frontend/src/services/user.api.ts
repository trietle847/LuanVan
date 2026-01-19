import ApiClient from "./axios";

class UserClient extends ApiClient {
  constructor() {
    super("/user");
  }

  async getMe() {
    try {
      return (await this.api.get("/me")).data;
    } catch (error: any) {
      throw new Error(`Đăng nhập thất bại: ${error.response.data.message}`);
    }
  }
}

export default new UserClient();
