import ApiClient from "./axios";

class Product extends ApiClient {
  constructor() {
    super("/products");
  }
}

export default new Product();
