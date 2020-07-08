const User = require("../models/user");
const Seller = require("../models/seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); // To generate signed token
const expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    res.status(422).json({ error: "please add all the fields" });
  }

  if (role == 0) {
    User.findOne({ email: email })
      .then((saveUser) => {
        if (saveUser) {
          return res.json({ error: "User already exits" });
        }
        bcrypt.hash(password, 12).then((hashPassword) => {
          const user = new User({
            email,
            name,
            role,
            password: hashPassword,
          });
          user
            .save()
            .then((user) => {
              res.json({ message: "saved successfully", user: user });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Seller.findOne({ email: email })
      .then((saveSeller) => {
        if (saveSeller) {
          return res.json({ error: "Seller already exits" });
        }
        bcrypt.hash(password, 12).then((hashPassword) => {
          const seller = new Seller({
            email,
            name,
            role,
            password: hashPassword,
          });
          seller
            .save()
            .then((seller) => {
              res.json({
                message: "seller data saved successfully",
                seller: seller,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.signin = (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    res.status(422).json({ Error: "Please add email and password and role" });
  }
  if (role == 0) {
    User.findOne({ email })
      .then((savedUser) => {
        // console.log(savedUser);
        if (!savedUser) {
          return res.status(422).json({ Error: "Invalid Email or Password" });
        }
        bcrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedUser.id },
              process.env.JWT_SECRET
            );

            res.cookie("t", token, { expire: new Date() + 9999 });

            const { _id, name, email } = savedUser;

            return res.json({ token, user: { _id, name, email } });
          } else {
            return res.status(422).json({ Error: "Invalid Email or Password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    Seller.findOne({ email })
      .then((savedSeller) => {
        // console.log(savedSeller);
        if (!savedSeller) {
          return res.status(422).json({ Error: "Invalid Email or Password" });
        }
        bcrypt.compare(password, savedSeller.password).then((doMatch) => {
          if (doMatch) {
            const token = jwt.sign(
              { _id: savedSeller.id },
              process.env.JWT_SECRET
            );

            res.cookie("t", token, { expire: new Date() + 9999 });

            const { _id, name, email, role } = savedSeller;

            return res.json({ token, seller: { _id, name, email, role } });
          } else {
            return res.status(422).json({ Error: "Invalid Email or Password" });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // console.log("Req Profile ", req.profile);
  // console.log(req.auth);
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access Deined",
    });
  }
  next();
};
