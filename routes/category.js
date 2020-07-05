const express = require("express");
const router = express.Router();
const fileupload = require('express-fileupload');
const Category = require("../models/category");

router.use(fileupload({
    useTempFiles : true
}));


const {create,category, admin} = require("../controllers/category");
const {requireSignin,isAdmin,isAuth} = require("../controllers/auth");
const {userById,home} = require("../controllers/user");

router.post("/category/create/:user",requireSignin,create);
router.param('userId',userById);

router.get('/home',home)

router.post("/admin",admin);



module.exports = router;