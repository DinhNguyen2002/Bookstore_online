const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(users.findALL)
    .post(users.create);

router.route("/comment")
    .post(users.addComment);
router.route("/comment/:id")
    .get(users.showComment);  
router.route("/comment/:id")
    .delete(users.delComment);  

router.route("/login")
    .post(users.login);
router.route("/logout")
    .get(users.logout);

router.route("/:id")
    .get(users.findById);

router.route("/evalue/:id")
    .get(users.Evalue);  
    
router.route("/:id")
    .put(users.update);  

module.exports = router;
