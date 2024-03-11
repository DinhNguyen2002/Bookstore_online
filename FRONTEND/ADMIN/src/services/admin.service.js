import createApiClient from "./api.service";
class AdminService {
  constructor(baseUrl = "/api/admins") {
    this.api = createApiClient(baseUrl);
  } 
  async create(data) {
    return (await this.api.post("/", data)).data;
  }
  async login(data) {
    return (await this.api.post("/login",data)).data;
  }
  async logout() {
    return (await this.api.get("/logout")).data;
  }

  async sumary(data) {
    return (await this.api.post("/sumary",data)).data;
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getId(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  
}
export default new AdminService();
