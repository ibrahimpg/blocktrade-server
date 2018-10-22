const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const protect = require("../../protect");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
});

const Article = require("../../models/Article");

//GET ALL POSTS
router.get("/", (req, res) => {
  Article.find()
    .sort({ date: -1 })
    .then(articles => res.json(articles))
});

//GET MY POSTS
router.get("/myposts", protect, (req, res) => {
  Article.find({id: req.userData.id})
    .sort({ date: -1 })
    .then(articles => res.json(articles))
});

//POST AD
router.post("/", upload.single('postImage'), (req, res) => {
    const newArticle = new Article({
      _id: mongoose.Types.ObjectId(),
      content: req.body.content,
      state: req.body.state,
      city: req.body.city,
      crypto: req.body.crypto,
      email: req.body.email,
      category: req.body.category,
      id: req.body.id,
      postImage: `${req.file ? `${req.file.path}` : ``}`
    });
    newArticle
    .save()
    .then(result => {
      console.log(result);
      res.redirect("https://blocktrade.ibrahimpg.com/");
      //res.status(201).json({ message: "Created product successfully" });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//DELETE AD
router.delete("/:id", protect, (req, res) => {
  Article.findOneAndDelete({ _id: req.params.id, id: req.userData.id })
    .then(() => res.json({ message: "Post Deleted!" }));
});

module.exports = router;