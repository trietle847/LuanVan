import ApiClient from "./axios";

class Court extends ApiClient {
  constructor() {
    super("/court");
  }
}

export default new Court();
