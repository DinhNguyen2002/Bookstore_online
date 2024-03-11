const AdminService = require("../services/admin.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const EcomeService = require("../services/ecome.service")

// Create and Save a new Admin
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const adminService = new AdminService(MongoDB.client);
    const document = await adminService.create(req.body);
    return res.send(document);
  } catch (error) {
    return next(new ApiError(500, "An error occurred while creating the admin"));
  }
};
exports.findALL = async (req, res, next) => {
  let documents = [];
  try {
    const adminService = new AdminService(MongoDB.client);
      documents = await adminService.find({});
  } catch (error) {
    return next(new ApiError(500, "An error occurred while retrieving admins"));
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  try {
    const adminService = new AdminService(MongoDB.client);
    const document = await adminService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "admin not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving admin with id=${req.params.id}`)
    );
  }
};

const jwt = require("jsonwebtoken");
exports.login = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const adminService = new AdminService(MongoDB.client);
    const admin = await adminService.findOne({ username, password });

    if (admin) {
      // Generate a JWT token upon successful login
      const token = jwt.sign({ username: admin.username }, 'your-secret-key', {
        expiresIn: '1h', // Token expiration time
      });

      // Send the token in response (as you prefer)
      res.json({ token, message: `Welcome, ${admin.name}`,admin });
   ;
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving admin with id=${username}`)
    );
  }
};

exports.logout = (req, res) => {
  res.clearCookie('auth-token'); // Change 'auth-token' to the name of your token cookie
  res.status(200).json({ message: 'Logout successful' });
};

exports.sumary = async(req , res, next) => {
  try {
    const ecomeService = new EcomeService(MongoDB.client);
    const documents = await ecomeService.find({year: req.body.year});
    if (!documents) {
      return next(new ApiError(404, "admin not found"));
    }
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving admin with id=${req.body.year}`)
    );
  }
}
