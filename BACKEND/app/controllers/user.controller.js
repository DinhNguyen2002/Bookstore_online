const UserService = require("../services/user.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CommentService = require("../services/comment.service")
const OrderService = require("../services/order.service");
const OrderDetailService = require("../services/orderDetail.service");

exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
};
// Retrieve all users of a user from the database
exports.findALL = async (req, res, next) => {
  let documents = [];
  try {
    const userService = new UserService(MongoDB.client);

    documents = await userService.find({});

    const orderService = new OrderService(MongoDB.client);
    const orderDetailService = new OrderDetailService(MongoDB.client);
    for (const document of documents) {
      let countOrder = 0;
      let UserValue = 0;
      const userId = String(document._id);
      // console.log(userId);
      const orders = await orderService.find({ userId: userId });
      // console.log(orders);

      for (const order of orders) {
        countOrder += 1;
        const details = await orderDetailService.find({ orderId: order._id });
        for (const detail of details) {
          UserValue += detail.count * detail.cost;
        }
      }
      document.count = countOrder;
      document.value = UserValue;
    }
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving users"));
  }
  return res.send(documents);
};
// Find a single user with an id
exports.findOne = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findOne({ _id: req.body.id });
    if (!document) {
      return next(new ApiError(404, "User not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving user with id=${req.params.id}`)
    );
  }
};

exports.findById = async (req, res, next) => {
  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving product with id=${req.params.id}`)
    );
  }
};

const jwt = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findOne({ username, password });

    if (user) {
      // Create a session
      //req.session.user = user;

      // Generate a JWT token upon successful login
      const token = jwt.sign({ username: user.username }, "your-secret-key", {
        expiresIn: "1h", // Token expiration time
      });

      // Send the token in response (as you prefer)
      res.json({ token, message: `Welcome, ${user.name}`, user });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return next(new ApiError(500, `Error retrieving user with id=${username}`));
  }
};

exports.logout = (req, res) => {
  res.clearCookie("auth-token"); // Change 'auth-token' to the name of your token cookie

  res.status(200).json({ message: "Logout successful" });
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const userService = new UserService(MongoDB.client);
    const document = await userService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "user not found"));
    }
    return res.send({ message: "user was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating user with id=${req.params.id}`)
    );
  }
};

exports.addComment =async (req, res, next) => {
  if (!req.body?.content) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const comment = new CommentService(MongoDB.client);
    const document = await comment.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the user"));
  }
};
exports.showComment =async (req, res, next) => {
    try {
      const comment = new CommentService(MongoDB.client);
      const document = await comment.find(req.params.id);
      if (!document) {
        return next(new ApiError(404, "comment not found"));
      }
      return res.send(document);
    } catch (error) {
      return next(
        new ApiError(500, `Error retrieving product with id=${req.params.id}`)
      );
    }
    
};
exports.delComment = async (req, res, next) => {
  try {
    const comment = new CommentService(MongoDB.client);
    const document = await comment.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "comment not found"));
    }
    return res.send({ message: "comment was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete comment with id=${req.params.id}`)
    );
  }
};


exports.Evalue = async (req, res, next) => {
  try {
    const comment = new CommentService(MongoDB.client);
    const documents = await comment.find(req.params.id);
    if (!documents) {
      return next(new ApiError(404, "comment not found"));
    }
    const totalEvalues = documents.reduce((sum, document) => sum + document.evalue, 0);
    const averageEvalue = totalEvalues / documents.length;

    // Return the average evalue
    return res.send({ averageEvalue });
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving product with id=${req.params.id}`)
    );
  }
  
};
