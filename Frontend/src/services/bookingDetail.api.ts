import ApiClient from "./axios";

class Booking extends ApiClient {
  constructor() {
    super("/booking-detail");
  }

  async getByCourtId(courtId: number) {
    return (
      await this.api.get(`/by-court/${courtId}`)
    ).data;
  }
}

export default new Booking();
