import createApiClient from "./api.service";
class ContactService {
  constructor(baseUrl = "/api/products") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getPopular() {
    return (await this.api.get("/popular")).data;
  }
  async create(data) {
    return (
      await this.api.post("/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id, data) {
    return (
      await this.api.patch(`/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    ).data;
  }
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async evalue(id) {
    return (await this.api.get(`/evalue/${id}`)).data;
  }
}
export default new ContactService();
