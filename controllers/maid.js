const Maid = require("../models/maid");


exports.maid = async (req,res) => {
const maid = await Maid.find();
res.json(maid);
}