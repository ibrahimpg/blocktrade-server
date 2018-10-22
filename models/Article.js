const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {type: String, required: true},
  date: {type: Date, default: Date.now},
  state: {type: String, required: true},
  id: {type: String},
  city: {type: String, required: true},
  crypto: {type: []},
  category: {type: String, required: true},
  email: {type: String, required: true},
  postImage: {type: String}
});

module.exports = Article = mongoose.model("article", ArticleSchema);