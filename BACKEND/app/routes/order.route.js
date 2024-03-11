const express = require("express");
const order = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .post(order.create);

router.route("/new")
    .get(order.getNew);

router.route("/check")
    .get(order.getCheck);

router.route("/done")
    .get(order.getDone);

router.route("/show")
    .post(order.showAll);

router.route("/:id")
    .put(order.update);

router.route("/:id")
    .delete(order.deleteId);

module.exports = router;
