const express = require("express");
const cart = require("../controllers/cart.controller");
const order = require("../controllers/order.controller");


const router = express.Router();

router.route("/")
    .post(cart.create);

router.route("/count")
    .post(cart.count);

router.route("/show")
    .post(cart.showAll);

router.route("/:id")
    .put(cart.update)

router.route("/:id")
    .delete(cart.deleteId);

router.route("/")
    .delete(cart.deleteAll);

router.route("/checkout")
    .post(cart.checkOut);

module.exports = router;
