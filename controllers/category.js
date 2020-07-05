const Category = require("../models/category");

var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dgvz93fif",
  api_key: "356152266444813",
  api_secret: "SkAQRw73rE8uwCq2YKY6YwDrdQM",
});

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


exports.admin = (req, res) => {
  let file = req.files.image;
  let image = cloudinary.uploader.upload(file.tempFilePath,(err,result) =>{
    return result;
  });
  image
    .then((result) => {
      var categoryDetails = new Category();
      (categoryDetails.name = req.body.name),
        (categoryDetails.price = req.body.price),
        (categoryDetails.description = req.body.description),
        (categoryDetails.delivery = req.body.delivery),
        (categoryDetails.image = result.url);

      categoryDetails
        .save()
        .then((data) => {
          res.json(data);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
