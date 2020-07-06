const express = require("express");
const router = express.Router();
const Category = require("../models/category");

const { create, seller } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById, home } = require("../controllers/user");

router.post("/category/create/:user", requireSignin, create);
router.param("userId", userById);

router.get("/home", home);

router.get("/home/:name",(req,res) => {
    console.log(req.params.name);
    Category.find({name:req.params.name})
    .then(data => res.json(data))
    .catch(err => res.status(400).send(err));
})


router.post("/seller", seller);

module.exports = router;
