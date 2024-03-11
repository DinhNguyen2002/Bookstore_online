const { ObjectId } = require("mongodb");
class OrderService {
  constructor(client) {
    this.Order = client.db().collection("orders");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractOrderData(payload) {
    const currentDate = new Date();   
    const order = {
      userId: payload.userId,
      adminId: payload.adminId,
      time: currentDate,
      timeOut: payload.timeOut,      
      status: payload.status
    };
    // Remove undefined fields
    Object.keys(order).forEach(
      (key) => order[key] === undefined && delete order[key]
    );
    return order;
  }

  async create(payload) {
    const order = this.extractOrderData(payload);
    const result = await this.Order.findOneAndUpdate(
        order,
        { $set: { status: order.status = 0 } },
        { returnDocument: "after", upsert: true }
    );
    return result;
  }

  async find(filter) {
    const cursor = await this.Order.find(filter);
    return await cursor.toArray();
  }

  async findOne(filter) {
    return await this.Order.findOne(filter);
  }
  async findById(id) {
    return await this.Order.findOne({
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
}


  async update(id, payload) {
    const filter = {
        _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
     
    const update = this.extractOrderData(payload);
    const result = await this.Order.findOneAndUpdate(
        filter,
        { $set: update },
        { returnDocument: "after" }
    );
    return result;
}

  async delete(id) {
    const result = await this.Order.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }
}
module.exports = OrderService;
