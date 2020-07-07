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
  const category = await Category.find();
  res.json(category);
};

// exports.home = (req, res) => {
//   var name = req.params.name;
//   Category.find({name: `${name}`}).exec((err,data) => {
//     if (err || !data) {
//       return res.status(400).json({
//         error: "Data not Found",
//       });
//     }
//     res.json(data);
//   })
// };
