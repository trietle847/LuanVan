import ApiClient from "./axios";

class Court extends ApiClient {
  constructor() {
    super("/product");
  }
}

export default new Court();
