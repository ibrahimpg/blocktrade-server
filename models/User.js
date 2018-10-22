const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  email: {
    type: String,
    unique: true,
    required: true
    },
  password: {type: String, required: true},
  tokens: []
});

module.exports = User = mongoose.model("user", UserSchema);