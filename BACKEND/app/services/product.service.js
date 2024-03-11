const { ObjectId } = require("mongodb");
class ProductService {
  constructor(client) {
    this.Product = client.db().collection("products");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractProductData(payload) {
    const product = {
      name: payload.name,
      author: payload.author,
      nxb: payload.nxb,
      price: payload.price,
      image: payload.image !== undefined ? payload.image : undefined,

      year: payload.year,
      weight: payload.weight,
      size: payload.size,

      pages: payload.pages,
      type: payload.type,
      category: payload.category,

      detail: payload.detail,
      number: payload.number,
    };
    // Remove undefined fields
    Object.keys(product).forEach(
      (key) => product[key] === undefined && delete product[key]
    );
    return product;
  }

  async create(payload) {
    const product = this.extractProductData(payload);
    const result = await this.Product.insertOne(product);
    return result;
  }

  async find(filter) {
    const cursor = await this.Product.find(filter).sort({ _id: -1 });
    return await cursor.toArray();
  }

  async findGroup(filter, id) {
    const cursor = await this.Product.find({
      _id: { $ne: ObjectId.isValid(id) ? new ObjectId(id) : null },
      category: filter,
    }).toArray();
    return await cursor;
  }

  async findPopular(filter) {
    const cursor = await this.Product.find(filter).sort({ "number.value": -1 });
    return await cursor.toArray();
  }


  async findById(id) {
    return await this.Product.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractProductData(payload);
    const result = await this.Product.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result;
  }

  async delete(id) {
    const result = await this.Product.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }


  async getbyId(productId) {
    const product = await this.Product.find({ _id: productId });
    return product;
  }


  async search(searchText) {
    const regex = new RegExp(searchText, 'i');

    const result = await this.Product.find({
      $or: [
        { name: { $regex: regex } },
        { author: { $regex: regex } }
      ]
    }).toArray();

    return result;
  }

}
module.exports = ProductService;
