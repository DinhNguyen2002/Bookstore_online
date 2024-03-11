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
  async logout() {
    return (await this.api.get("/logout")).data;
  }
  async getId(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async update(id,data) {
    return (await this.api.put(`/${id}`,data)).data;
  }
  async getComment(id) {
    return (await this.api.get(`/comment/${id}`)).data;
  }
  async addComment(data) {
    return (await this.api.post("/comment", data)).data;
  }
  async delComment(id) {
    return (await this.api.delete(`/comment/${id}`)).data;
  }
  
}
export default new UserService();
