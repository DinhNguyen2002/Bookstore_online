import createApiClient from "./api.service";
class OrderService {
  constructor(baseUrl = "/api/orders") {
    this.api = createApiClient(baseUrl);
  }
  async getNew() {
    return (await this.api.get("/new")).data;
  }
  async getCheck() {
    return (await this.api.get("/check")).data;
  }
  async getDone() {
    return (await this.api.get("/done")).data;
  }
  async count(data) {
    return (await this.api.post("/count",data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new OrderService();
