const { ObjectId } = require("mongodb");
class OrderDetailService {
  constructor(client) {
    this.OrderDetail = client.db().collection("orderDetails");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractOrderDetailData(payload) {
    const orderDetail = {
      orderId: payload.orderId,
      productId: payload.productId,
      count: payload.count,
      cost: payload.cost,
      sale: payload.sale,
    };
    // Remove undefined fields
    Object.keys(orderDetail).forEach(
      (key) => orderDetail[key] === undefined && delete orderDetail[key]
    );
    return orderDetail;
  }

  async create(payload) {
    const orderDetail = this.extractOrderDetailData(payload);
    const result = await this.OrderDetail.insertOne(orderDetail);
    return result;
  }

  async find(filter) {
    const cursor = await this.OrderDetail.find(filter);
    return await cursor.toArray();
  }
  async findById(filter) {
    const cursor = await this.OrderDetail.find({ orderId: filter });
    return cursor;
  }
  async delete(filter) {
    const result = await this.OrderDetail.findOneAndDelete(filter);
    return result;
  }

  async deleteAll(filter) {
    await this.OrderDetail.deleteMany(filter);
    return result.deletedCount;
  }
}
module.exports = OrderDetailService;
