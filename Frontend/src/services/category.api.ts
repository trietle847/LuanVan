import ApiClient from "./axios";

class Booking extends ApiClient {
  constructor() {
    super("/category");
  }
}

export default new Booking();
