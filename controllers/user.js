const User = require("../models/user");
const Category = require("../models/category");

exports.userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }
    req.profile = user;
    next();
  });
};

exports.home = async (req, res) => {
  const category = await Category.find({});
  console.log(typeof category);
  res.json(category);
};
