const ProductService = require("../services/product.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");
const CommentService = require("../services/comment.service");

// Create and Save a new Product
exports.create = async (req, res, next) => {
  if (!req.body?.name) {
    return next(new ApiError(400, "Name can not be empty"));
  }
  try {
    const productService = new ProductService(MongoDB.client);
    const document = await productService.create({
      ...req.body,
      image: req.file?.path,
    });
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the product")
    );
  }
};
exports.findALL = async (req, res, next) => {
  let documents = [];
  try {
    const productService = new ProductService(MongoDB.client);

    documents = await productService.find({});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving products")
    );
  }
  return res.send(documents);
};
exports.findGroup = async (req, res, next) => {
  let documents = [];
  try {
    const productService = new ProductService(MongoDB.client);

    documents = await productService.findGroup(
      req.body.category,
      req.params.id
    );
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving products")
    );
  }
  return res.send(documents);
};

exports.findPopular = async (req, res, next) => {
  let documents = [];
  try {
    const productService = new ProductService(MongoDB.client);

    documents = await productService.findPopular({});
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving products")
    );
  }
  return res.send(documents);
};
exports.findOne = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const document = await productService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "product not found"));
    }
    return res.send(document);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving product with id=${req.params.id}`)
    );
  }
};
// Update a product by the id in the request
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const productService = new ProductService(MongoDB.client);
    const document = await productService.update(req.params.id, {
      ...req.body,
      image: req.file?.path,
    });
    if (!document) {
      return next(new ApiError(404, "product not found"));
    }
    return res.send({ message: "product was updated successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Error updating product with id=${req.params.id}`)
    );
  }
};
// Delete a product with the specified id in the request
exports.delete = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const document = await productService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "product not found"));
    }
    return res.send({ message: "product was deleted successfully" });
  } catch (error) {
    return next(
      new ApiError(500, `Could not delete product with id=${req.params.id}`)
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
    return res.json(averageEvalue);
  } catch (error) {
    return next(
      new ApiError(500, `Error retrieving product with id=${req.params.id}`)
    );
  }  
};

exports.search = async (req, res, next) => {
  try {
    const productService = new ProductService(MongoDB.client);
    const documents = await productService.search(req.params.query);
    if (!documents) {
      return next(new ApiError(404, "product not found"));
    }
    return res.send(documents);
  } catch (error) {
    return next(
      new ApiError(500, `Could not find product with id=${req.params.query}`)
    );
  }
};
