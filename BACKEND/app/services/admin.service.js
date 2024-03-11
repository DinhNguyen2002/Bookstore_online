const { ObjectId } = require("mongodb");
class AdminService {
  constructor(client) {
    this.Admin = client.db().collection("admins");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractAdminData(payload) {
    const admin = {
      name: payload.name,
      username: payload.username,
      password: payload.password,
      address: payload.address,
      phone: payload.phone,

      admin: payload.admin,
    };
    // Remove undefined fields
    Object.keys(admin).forEach(
      (key) => admin[key] === undefined && delete admin[key]
    );
    return admin;
  }

  async create(payload) {
    const admin = this.extractAdminData(payload);
    const result = await this.Admin.insertOne(admin);
    return result;
  }

  async find(filter) {
    const cursor = await this.Admin.find(filter);
    return await cursor.toArray();
  }
  async findOne(filter) {
    return await this.Admin.findOne(filter);
  }

  async findById(id) {
    return await this.Admin.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async delete(id) {
    const result = await this.Admin.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}
module.exports = AdminService;
