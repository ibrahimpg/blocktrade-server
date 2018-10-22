const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const protect = require("../../protect");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Article = require("../../models/Article");

//register
router.post("/register", [
  check('regEmail').isLength({ min: 6, max: 20 }),
  check('regPW').isLength({ min: 6, max: 20 })
],
(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
  return res.json({ message: "Username and password should be between 6 and 20 characters." });
  } else {

  User
    .find({email: req.body.regEmail})
    .exec()
    .then(user => {
      if (user.length >= 1) { return res.json({ message: "User already exists." }); 
      } else {
        bcrypt.hash(req.body.regPW, 10, (err, hash) => {
          if (err) {
            return res.json({ message: "Registration Failed" });
          } else {
              const user = new User({
                _id: mongoose.Types.ObjectId(),
                email: req.body.regEmail,
                password: hash
              });
              user
                .save()
                .then(result => {
                  res.json({ message: "User Created" }); 
                })
                .catch(err => {
                  res.json({ message: "Registration Failed" }); 
                });
          }
        })
      }
    })
  }
});

//login
router.post("/login", (req, res) => {
  User.find({ email: req.body.loginEmail })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.json({ message: "Login Failed" });
      }
      bcrypt.compare(req.body.loginPW, user[0].password, (err, result) => {
        if (err) { return res.json({ message: "Login Failed" });
      }
        if (result) {
          const token = jwt.sign({ email: user[0].email, id: user[0]._id },
          process.env.JWT_PW, { expiresIn: "9h" });
          return res.status(200).json({ message: "Login Successful", token: token, id: user[0]._id });
        }
        res.status(401).json({ message: "Login Failed" });
      });
    })
    .catch(err => { res.status(500).json({ error: err }); });
});

//delete user and all user posts
router.delete("/", protect, (req, res) => {
  Article.find({id: req.userData.id}).remove().exec();
  User.findOneAndDelete({ _id: req.userData.id })
  .then(() => res.json({ message: "User Deleted!" }));
});

module.exports = router;