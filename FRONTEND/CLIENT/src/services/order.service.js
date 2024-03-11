import createApiClient from "./api.service";
class OrderService {
  constructor(baseUrl = "/api/orders") {
    this.api = createApiClient(baseUrl);
  }
  async getAll(data) {
    return (await this.api.post("/show",data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
}
export default new OrderService();
