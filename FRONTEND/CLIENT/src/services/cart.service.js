import createApiClient from "./api.service";
class CartService {
  constructor(baseUrl = "/api/carts") {
    this.api = createApiClient(baseUrl);
  }
  async getAll(data) {
    return (await this.api.post("/show", data)).data;
  }
  async count(data) {
    return (await this.api.post("/count", data)).data;
  }

  async checkOut(data) {
    return (await this.api.post("/checkout", data)).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
}
export default new CartService();
