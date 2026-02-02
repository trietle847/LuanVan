import ApiClient from "./axios";

class Statistic extends ApiClient {
  constructor() {
    super("/statistic");
  }
  async getInvoiceStatisticByMonth(month: number, year: number) {
    try {
      const res = await this.api.get("/invoice", {
        params: { month, year },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async getCourtStatisticByMonth(month: number, year: number) {
    try {
      const res = await this.api.get("/court-usage", {
        params: { month, year },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async getProductStatisticByMonth(month: number, year: number) {
    try {
      const res = await this.api.get("/product-usage", {
        params: { month, year },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async getBookingStatisticByDay(month: number, year: number) {
    try {
      const res = await this.api.get("/booking", {
        params: { month, year },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }

  async getTypeCourtStatistic(month: number, year: number) {
    try {
      const res = await this.api.get("/type-usage", {
        params: { month, year },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message);
    }
  }
}

export default new Statistic();
