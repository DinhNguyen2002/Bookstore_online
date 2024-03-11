const { ObjectId } = require("mongodb");
class CartService {
  constructor(client) {
    this.Cart = client.db().collection("carts");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractCartData(payload) {
    const cart = {
      userId: payload.userId,
      productId: payload.productId,
      count: payload.count,
    };
    // Remove undefined fields
    Object.keys(cart).forEach(
      (key) => cart[key] === undefined && delete cart[key]
    );
    return cart;
  }

  async create(payload) {
    const cart = this.extractCartData(payload);
    const result = await this.Cart.insertOne(cart);
    return result;
  }

  async find(filter) {
    const cursor = await this.Cart.find(filter);
    return await cursor.toArray();
  }
  async findOne(filter) {
    return await this.Cart.findOne(filter);
  }

  async findById(id) {
    return await this.Cart.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractCartData(payload);
    const result = await this.Cart.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }
  async delete(id) {
    const result = await this.Cart.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Cart.deleteMany();
    return result.deletedCount;
  }  
  async  count(query) {
    try {
      const document = await this.Cart.findOne(query);
      if (!document) {
        return { count: 0 };
      }
      const count = await this.Cart.countDocuments(query);
  
      return {count };
    } catch (error) {
      throw new Error(`Error finding and counting documents: ${error.message}`);
    }
  }

  
  async deleteAll(filter) {
    const result = await this.Cart.deleteMany(filter);
    return result.deletedCount;
  }
}
module.exports = CartService;
