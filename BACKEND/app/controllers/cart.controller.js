const CartService = require("../services/cart.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const ProductService = require("../services/product.service");

const OrderService = require("../services/order.service");
const OrderDetailService = require("../services/orderDetail.service");

exports.create = async (req, res, next) => {
  if (!req.body?.userId) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const cartService = new CartService(MongoDB.client);
    const cart = await cartService.findOne({
      userId: req.body.userId,
      productId: req.body.productId,
    });

    if (cart) {
      const newcount = cart.count + 1;
      console.log(cart._id);

      if (req.body.count) {
        const updatedCart = await cartService.update(cart._id, {
          count: req.body.count,
        });
        return res.send(updatedCart);
      } else {
        const updatedCart = await cartService.update(cart._id, {
          count: newcount,
        });
        return res.send(updatedCart);
      }
    } else {

      if(req.body.count){
        const newCart = await cartService.create(req.body);
      return res.send(newCart);
      }
      req.body.count =1;
      const newCart = await cartService.create(req.body);
      return res.send(newCart);
    }
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating or updating the Cart")
    );
  }
};

exports.showAll = async (req, res, next) => {
  try {
    if (!req.body) {
      return next(new ApiError(400, "User ID cannot be empty"));
    }
    const Product = new ProductService(MongoDB.client);
    const cartService = new CartService(MongoDB.client);
    const documents = await cartService.find({ userId: req.body.userId });

    const cartPromises = documents.map(async (element) => {
      const product = await Product.findById(element.productId);
      return { _id: element._id, count: element.count, product };
    });

    const carts = await Promise.all(cartPromises);
    return res.send(carts);
    //res.json({carts});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving products")
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "cart not found"));
    }
    return res.send({ message: "Contact was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
};

exports.deleteId = async (req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const document = await cartService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "cart not found"));
    }
    return res.send({ message: "cart was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete cart with id=${req.params.id}`)
    );
  }
};
exports.deleteAll = async (_req, res, next) => {
  try {
    const cartService = new CartService(MongoDB.client);
    const deletedCount = await cartService.deleteAll();
    return res.send({
      message: `${deletedCount} carts were deleted successfully`,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while removing all carts")
    );
  }
};

exports.count = async (req, res, next) => {
  try {
    if (!req.body?.userId) {
      return next(new ApiError(400, "User ID cannot be empty"));
    }
    const cartService = new CartService(MongoDB.client);
    const count = await cartService.count({ userId: req.body.userId });
    return res.send(count);
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while processing the request")
    );
  }
};

exports.checkOut = async (req, res, next) => {
  try {
    if (!req.body?.userId) {
      return next(new ApiError(400, "User ID cannot be empty"));
    }
    const cartService = new CartService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);
    const productService = new ProductService(MongoDB.client);
    const documents = await cartService.find({ userId: req.body.userId });

    const order = await orderService.create({
      userId: req.body.userId,
    });

    const orderDetails = [];
    for (const cartItem of documents) {
      const product = await productService.findById(cartItem.productId); // Replace with your product retrieval logic
      const orderDetail = await orderDetailService.create({
        orderId: order._id,
        productId: cartItem.productId,
        count: cartItem.count,
        cost: product.price,
      });
      orderDetails.push(orderDetail);
    }
    const count = await cartService.deleteAll({ userId: req.body.userId });
    res
      .status(200)
      .json({ message: "Checkout successful", order, orderDetails, count });
  } catch (error) {
    console.error(error);
    return next(
      new ApiError(500, "An error occurred while processing the request")
    );
  }
};
