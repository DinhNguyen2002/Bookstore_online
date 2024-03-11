const { ObjectId } = require("mongodb");
class EcomeService {
  constructor(client) {
    this.Ecome = client.db().collection("ecomes");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractEcomeData(payload) {
    const ecome = {
      year: payload.year,
      month: payload.month,
      number: payload.number,
      total: payload.total,
    };
    // Remove undefined fields
    Object.keys(ecome).forEach(
      (key) => ecome[key] === undefined && delete ecome[key]
    );
    return ecome;
  }

  async create(payload) {
    const ecome = this.extractEcomeData(payload);
    const result = await this.Ecome.insertOne(ecome);
    return result;
  }

  async find(filter) {
    const cursor = await this.Ecome.find(filter);
    return await cursor.toArray();
  }
  async findOne(filter) {
    return await this.Ecome.findOne(filter);
  }


  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractEcomeData(payload);
    const result = await this.Ecome.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

}
module.exports = EcomeService;
