const OrderService = require("../services/order.service");
const OrderDetailService = require("../services/orderDetail.service");
const ProductService = require("../services/product.service");
const UserService = require("../services/user.service");
const EcomeService = require("../services/ecome.service");

const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.userId) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const orderService = new OrderService(MongoDB.client);
    const document = await orderService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the order")
    );
  }
};
exports.getNew = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);
    const userService = new UserService(MongoDB.client);

    const orders = await orderService.find({ status: 0 });
    const orderPromises = [];

    for (const order of orders) {
      const user = await userService.findById(order.userId);
      const details = await orderDetailService.find({ orderId: order._id });

      const detailPromises = details.map(async (detail) => {
        const product = await productService.findById(detail.productId);
        return {
          detailId: detail._id,
          count: detail.count,
          cost: detail.cost,
          product,
        };
      });

      orderPromises.push(
        Promise.all(detailPromises).then((orderDetails) => {
          return {
            _id: order._id,
            userId: order.userId,
            time: order.time,
            timeOut: order.timeOut,
            user,
            data: orderDetails,
          };
        })
      );
    }

    const formattedOrders = await Promise.all(orderPromises);

    return res.json(formattedOrders);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving order details")
    );
  }
};

exports.getCheck = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);
    const userService = new UserService(MongoDB.client);

    const orders = await orderService.find({ status: 1 });
    const orderPromises = [];

    for (const order of orders) {
      const user = await userService.findById(order.userId);
      const details = await orderDetailService.find({ orderId: order._id });

      const detailPromises = details.map(async (detail) => {
        const product = await productService.findById(detail.productId);
        return {
          detailId: detail._id,
          count: detail.count,
          cost: detail.cost,
          product,
        };
      });

      orderPromises.push(
        Promise.all(detailPromises).then((orderDetails) => {
          return {
            _id: order._id,
            userId: order.userId,
            time: order.time,
            timeOut: order.timeOut,
            user,
            data: orderDetails,
          };
        })
      );
    }

    const formattedOrders = await Promise.all(orderPromises);

    return res.json(formattedOrders);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving order details")
    );
  }
};

exports.getDone = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);
    const userService = new UserService(MongoDB.client);

    const orders = await orderService.find({ status: 2 });
    const orderPromises = [];

    for (const order of orders) {
      const user = await userService.findById(order.userId);
      const details = await orderDetailService.find({ orderId: order._id });

      const detailPromises = details.map(async (detail) => {
        const product = await productService.findById(detail.productId);
        return {
          detailId: detail._id,
          count: detail.count,
          cost: detail.cost,
          product,
        };
      });

      orderPromises.push(
        Promise.all(detailPromises).then((orderDetails) => {
          return {
            _id: order._id,
            userId: order.userId,
            time: order.time,
            timeOut: order.timeOut,
            user,
            data: orderDetails,
          };
        })
      );
    }

    const formattedOrders = await Promise.all(orderPromises);

    return res.json(formattedOrders);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving order details")
    );
  }
};


exports.showAll = async (req, res, next) => {
  try {
    const userId = req.body.userId; 
    if (!userId) {
      return next(new ApiError(400, "User ID cannot be empty"));
    }

    const productService = new ProductService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);

    const orders = await orderService.find({ userId: userId });
    const orderPromises = [];

    for (const order of orders) {
      const details = await orderDetailService.find({ orderId: order._id });

      const detailPromises = details.map(async (detail) => {
        const product = await productService.findById(detail.productId);
        return {
          detailId: detail._id,
          count: detail.count,
          cost: detail.cost,
          product,
        };
      });

      orderPromises.push(Promise.all(detailPromises));
    }

    const orderDetailsWithProducts = await Promise.all(orderPromises);

    // Transform the orderDetailsWithProducts array to the desired format
    const formattedOrders = orderDetailsWithProducts.map(
      (orderPromise, index) => {
        return {
          _id: orders[index]._id,
          time: orders[index].time,
          status: orders[index].status,
          data: orderPromise,
        };
      }
    );

    return res.json(formattedOrders);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving order details")
    );
  }
};

exports.deleteId = async (req, res, next) => {
  try {
    const orderDetailService = new OrderDetailService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const order = await orderService.findById(req.params.id);
    const document = await orderService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "order not found"));
    }

    const list = await orderDetailService.deleteAll({ orderId: order._id });
    if (list) {
      return res.send({ message: "order was deleted successfully" });
    }
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete order with id=${req.params.id}`)
    );
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 to get the month in the range 1-12
    let num = 0;
    let sum = 0;
    const ecomeService = new EcomeService(MongoDB.client);
    const orderService = new OrderService(MongoDB.client);
    const order = await orderService.findById(req.params.id);

    const orderDetailService = new OrderDetailService(MongoDB.client);
    const productService = new ProductService(MongoDB.client);
    const document = await orderService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "order not found"));
    }

    if(req.body.status == 1){
      const orderDetails = await orderDetailService.find({
        orderId: order._id,
      });
      for (const orderDetail of orderDetails) {
        const product = await productService.findById(orderDetail.productId);
        product.number -= orderDetail.count;
        num += orderDetail.count;
        sum += orderDetail.cost * orderDetail.count;
        const doc = await productService.update(orderDetail.productId, {
          number: product.number,
        });
      }
  
      const check = await ecomeService.findOne({ year: year, month: month });
      if (check) {
        num += check.number;
        sum += check.total;
  
        const ecome = await ecomeService.update(check._id, {
          year: year,
          month: month,
          number: num,
          total: sum,
        });
        // console.log(ecome);
      } else {
        const data = {
          year: year,
          month: month,
          number: num,
          total: sum,
        };
        const ecome = await ecomeService.create(data);
        // console.log(ecome);
      }
  
    }
    
    return res.send({ message: "order was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating order with id=${req.params.id}`)
    );
  }
};
