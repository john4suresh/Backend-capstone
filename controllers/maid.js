const Maid = require("../models/maid");

exports.maids = async (req, res) => {
  const maid = await Maid.find();
  res.json(maid);
};

exports.maid = (req, res) => {
    var maidDetails = new Maid();
    maidDetails.name = req.body.name;
    maidDetails.price = req.body.price;
    maidDetails.description = req.body.description;
    maidDetails.delivery = req.body.delivery;
    maidDetails.image = req.body.image;
  
    maidDetails
      .save()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
};
