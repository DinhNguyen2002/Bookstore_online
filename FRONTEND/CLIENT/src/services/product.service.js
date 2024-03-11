import createApiClient from "./api.service";
class ProductService {
  constructor(baseUrl = "/api/products") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
 
  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async getGroup(id,data) {
    return (await this.api.post(`/${id}`,data)).data;
  }
  async search(query) {
    return (await this.api.get(`/search/${query}`)).data;
  }
}
export default new ProductService();
