const express = require("express");
const products = require("../controllers/product.controller");
const multer = require("multer");

const router = express.Router();

const storeage = multer.diskStorage({
    destination: function(req, file, cb) { 
        cb(null, "uploads/"); 
    },
    filename: function (req, file, cb) { 
        cb(null, file.originalname);  
    },
})
const upload = multer({storage: storeage});

router.route("/")
    .get(products.findALL)    
    .post(upload.single("image"),products.create);

router.route("/search/:query")
    .get(products.search) 
router.route("/:id")
    .post(products.findGroup);

router.route("/popular")
    .get(products.findPopular);

router.route("/evalue/:id")
    .get(products.Evalue);  

router.route("/:id")
    .get(products.findOne)
    .patch(upload.single("image"),products.update)
    .delete(products.delete);

module.exports = router;
