const { ObjectId } = require("mongodb");
class CommentService {
  constructor(client) {
    this.Comment = client.db().collection("comments");
  }
  // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
  extractComment(payload) {
    const currentDate = new Date();
    const comment = {
      userId: payload.userId,
      name: payload.name,
      productId: payload.productId,
      content: payload.content,
      time: currentDate,
      evalue: payload.evalue,
    };
    // Remove undefined fields
    Object.keys(comment).forEach(
      (key) => comment[key] === undefined && delete comment[key]
    );
    return comment;
  }

  async create(payload) {
    const comment = this.extractComment(payload);
    const result = await this.Comment.insertOne(comment);
    return result;
  }

  async find(filter) {
    
    const cursor = await this.Comment.find({ productId: filter });
    return await cursor.toArray();
  }
  async delete(id) {
    const result = await this.Comment.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result;
  }

  async deleteAll() {
    const result = await this.Comment.deleteMany();
    return result.deletedCount;
  }
  async count(id) {
    try {
      const document = await this.Comment.find({productId: id});
      if (!document) {
        return { count: 0 };
      }
      const count = await this.Comment.countDocuments(document);

      return { count };
    } catch (error) {
      throw new Error(`Error finding and counting documents: ${error.message}`);
    }
  }

  async AvgEvalue(productId) {
    try {
      const comments = await this.Comment.find({
        productId: productId,
      }).toArray();

      if (comments.length === 0) {
        return null;
      }

      const totalEvalues = comments.reduce(
        (sum, comment) => sum + comment.evalue,
        0
      );
      const averageEvalue = totalEvalues / comments.length;

      return averageEvalue;
    } catch (error) {
      throw new Error(`Error calculating average evalue: ${error.message}`);
    }
  }

}
module.exports = CommentService;
