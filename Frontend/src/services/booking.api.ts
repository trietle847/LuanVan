import ApiClient from "./axios";

class Booking extends ApiClient {
  constructor() {
    super("/booking");
  }
}

export default new Booking();
