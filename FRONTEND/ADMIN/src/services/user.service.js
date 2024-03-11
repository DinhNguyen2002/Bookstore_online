import createApiClient from "./api.service";
class UserService {
  constructor(baseUrl = "/api/users") {
    this.api = createApiClient(baseUrl);
  } 
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async login(data) {
    return (await this.api.post("/login",data)).data;
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getId(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  
}
export default new UserService();
