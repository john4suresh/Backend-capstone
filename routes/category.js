const express = require("express");
const router = express.Router();
const Category = require("../models/category");

const { create, seller } = require("../controllers/category");
const { requireSignin, isAdmin, isAuth } = require("../controllers/auth");
const { userById, home } = require("../controllers/user");

router.post("/category/create/:user", requireSignin, create);
router.param("userId", userById);

router.get("/home", home);

router.post("/seller", seller);

module.exports = router;
