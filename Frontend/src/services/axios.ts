import axios from "axios";
import type { AxiosInstance } from "axios";
const API_URL = "/api";

/* ===== Tạo axios instance theo endpoint ===== */
const createAxiosInstance = (endpoint: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: `${API_URL}${endpoint}`,
  });

  /* ===== Request interceptor: gắn token ===== */
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      /**
       * ⚠️ QUAN TRỌNG
       * - Nếu là FormData → KHÔNG set Content-Type
       *   axios sẽ tự set multipart/form-data + boundary
       */
      if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  return instance;
};

/* ===== Ép kiểu endpoint ===== */
type Endpoint = `/${string}`;

/* ===== Base API Client ===== */
class ApiClient<T = any> {
  private api: AxiosInstance;

  constructor(endpoint: Endpoint) {
    this.api = createAxiosInstance(endpoint);
  }

  async getAll(params?: Record<string, any>): Promise<T[]> {
    try {
      const res = await this.api.get("", { params });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Get all failed");
    }
  }

  async getById(id: number | string): Promise<T> {
    try {
      const res = await this.api.get(`/${id}`);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Get by id failed");
    }
  }

  /**
   * ✅ Create
   * - data có thể là object thường hoặc FormData
   */
  async create(data: any): Promise<T> {
    try {
      const res = await this.api.post("", data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Create failed");
    }
  }

  /**
   * ✅ Update
   * - data có thể là object thường hoặc FormData
   */
  async update(id: number | string, data: any): Promise<T> {
    try {
      const res = await this.api.put(`/${id}`, data);
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Update failed");
    }
  }

  async delete(id: number | string): Promise<void> {
    try {
      await this.api.delete(`/${id}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Delete failed");
    }
  }
}

export default ApiClient;
