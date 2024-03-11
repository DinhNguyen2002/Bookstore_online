const express = require("express");
const admin = require("../controllers/admin.controller");

const router = express.Router();

router.route("/")
    .get(admin.findALL)
    .post(admin.create);

router.route("/sumary").post(admin.sumary);

router.route("/login")
    .post(admin.login);
router.route("/logout")
    .get(admin.logout);

router.route("/:id")
    .get(admin.findOne);   

module.exports = router;
