const Category = require("../models/category");

exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.seller = (req, res) => {
  var categoryDetails = new Category();
  categoryDetails.name = req.body.name;
  categoryDetails.price = req.body.price;
  categoryDetails.description = req.body.description;
  categoryDetails.delivery = req.body.delivery;
  categoryDetails.image = req.body.image;

  categoryDetails
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};
