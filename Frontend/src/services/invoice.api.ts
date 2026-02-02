import ApiClient from "./axios";

class Invoice extends ApiClient {
  constructor() {
    super("/invoice");
  }
}

export default new Invoice();
